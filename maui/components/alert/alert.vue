<template>
  <transition
    name="fade"
    :duration="noAnimation ? 0 : 500"
    @after-leave="removeElement"
  >
    <div
      v-if="!closed"
      class="maui-alert"
      :class="[
        {
          'maui-alert--has-icon': icon,
          'maui-alert--closeable': closeable,
          'maui-alert--closed': closed
        },
        `maui-alert--${variant}`
      ]"
    >
      <div
        v-if="icon"
        class="maui-alert__icon"
      >
        <mu-icon :name="icon" />
      </div>
      <div class="maui-alert__content">
        <slot />
      </div>
      <div
        v-if="closeable"
        class="maui-alert__close"
        @click="$emit('close')"
      >
        <mu-icon name="x" />
      </div>
    </div>
  </transition>
</template>

<script>
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

import MuIcon from '../icon/icon'

const DELAY_UNIT = 1000

export default {
  name: 'MuAlert',
  components: {
    MuIcon
  },
  mixins: [MauiMixin],
  props: {
    variant: makeProp(String, 'default'),
    icon: makeProp(String, null),
    closeable: makeProp(Boolean, false),
    noAnimation: makeProp(Boolean, false),
    autoClose: makeProp(Boolean, false),
    closeDelay: makeProp(Number, 0)
  },
  data () {
    return {
      closed: false,
      closeDelay_: this.closeDelay,
      closeTimer: null
    }
  },
  mounted () {
    if (this.autoClose) {
      this.$delayClose()
    }
  },
  methods: {
    setCloseDelay (delay) {
      delay = Number.parseFloat(delay.toFixed(1))

      this.$emit('update:closeDelay', delay)
      this.closeDelay_ = delay
    },
    $close () {
      this.closed = true

      if (this.closeTimer) {
        this.$cancelClose()
      }
    },
    $delayClose (delay) {
      if (delay) {
        this.setCloseDelay(delay)
      }

      if (this.closeDelay_ <= 0) {
        this.$close()
        return
      }

      this.closeTimer = setInterval(() => {
        this.setCloseDelay(this.closeDelay_ - 0.1)

        if (this.closeDelay_ <= 0) {
          this.$close()
        }
      }, DELAY_UNIT / 10)
    },
    $cancelClose () {
      clearInterval(this.closeTimer)
    },
    removeElement () {
      this.$destroy(true)

      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  }
}
</script>
