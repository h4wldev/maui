<template>
  <div
    class="maui-collapse-item"
    :class="{
      'maui-collapse-item--disabled': disabled,
      'maui-collapse-item--active': show
    }"
  >
    <div
      class="collapse-item__title"
      @click="clickHandler"
    >
      <div class="collapse-item-title__arrow">
        <mu-icon name="chevron-right" size="0.8x" />
      </div>
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <template v-if="noAnimation">
      <div
        v-show="show"
        class="collapse-item__body"
      >
        <div class="collapse-item__content">
          <slot />
        </div>
      </div>
    </template>
    <collapse-transition v-else>
      <div
        v-show="show"
        class="collapse-item__body"
      >
        <div class="collapse-item__content">
          <slot />
        </div>
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import EmitterMixin from '../../mixin/emitter'
import MauiMixin from '../../mixin/maui'
import { parentLoop } from '../../mixin/emitter'

import { makeProp } from '../../utils/props'
import CollapseTransition from '../../utils/collapse-transition'

import MuIcon from '../icon/icon'
import MuCollapse from './collapse'

export default {
  name: 'MuCollapseItem',
  components: {
    MuIcon,
    CollapseTransition
  },
  mixins: [EmitterMixin, MauiMixin],
  props: {
    title: makeProp(String, null),
    disabled: makeProp(Boolean, null, false)
  },
  data () {
    return {
      show: false,
      index: -1,
      noAnimation: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.noAnimationBinder()
    })
  },
  methods: {
    clickHandler (e) {
      if (this.disabled) {
        return
      }

      this.$emit('click', e)
      this.$dispatch(MuCollapse, 'item-toggle', this)
    },
    noAnimationBinder () {
      parentLoop(this, ($parent) => {
        if (!$parent.$mauiComponent || !$parent.$is(MuCollapse)) {
          return
        }

        this.noAnimation = $parent.noAnimation
        return true
      })
    }
  }
}
</script>
