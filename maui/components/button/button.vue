<template>
  <component
    :is="href ? 'a' : 'button'"
    class="maui-button"
    :class="[
      {
        'maui-button--hollow': hollow,
        'maui-button--pill': pill,
        'maui-button--squared': squared,
        'maui-button--disabled': disabled,
        'maui-button--pressed': pressed,
        'maui-button--dashed': dashed,
        'maui-button--block': block,
        'maui-button--has-icon': icon || loading,
        'maui-button--icon-only': (icon || loading) && !$slots.default,
        'maui-button--loading': loading,
        'maui-button--closeable': closeable
      },
      `maui-button--${variant}`,
      `maui-button--${size}`
    ]"
    :href="href"
    :disabled="disabled"
    @click="clickHandler"
  >
    <div
      v-if="icon || loading"
      class="maui-button__icon"
      :class="[
        `maui-button__icon--${surfixIcon ? 'surfix' : 'prefix'}`
      ]"
    >
      <mu-icon
        :name="loading ? 'loading' : icon"
        size="1x"
      />
    </div>
    <div
      v-if="$slots.default"
      class="maui-button__content"
    >
      <slot />
    </div>
    <div
      v-if="closeable"
      class="maui-button__close"
      @click="closeHandler"
    >
      <mu-icon name="x" />
    </div>
  </component>
</template>

<script>
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

import MuIcon from '../icon/icon.js'

export default {
  name: 'MuButton',
  components: {
    MuIcon
  },
  mixins: [MauiMixin],
  props: {
    variant: makeProp(String, 'default'),
    size: makeProp(String, 'normal', false, ['huge', 'normal', 'tiny', 'tiniest']),
    hollow: makeProp(Boolean, false),
    pill: makeProp(Boolean, false),
    dashed: makeProp(Boolean, false),
    block: makeProp(Boolean, false),
    loading: makeProp(Boolean, false),
    icon: makeProp(String, null),
    surfixIcon: makeProp(Boolean, false),
    squared: makeProp(Boolean, false),
    disabled: makeProp(Boolean, false),
    pressed: makeProp(Boolean, false),
    toggle: makeProp(Boolean, false),
    closeable: makeProp(Boolean, false),
    href: makeProp(String)
  },
  methods: {
    clickHandler (event) {
      if (this.disabled) {
        event.preventDefault()
      } else if (this.toggle) {
        this.$emit('update:pressed', !this.pressed)
      }

      this.$emit('click', event)
    },
    closeHandler () {
      if (!this.disabled) {
        return
      }

      this.$emit('close')
    },
    $close () {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>
