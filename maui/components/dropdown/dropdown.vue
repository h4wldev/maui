<template>
  <div
    ref="wrapper"
    class="maui-dropdown"
    :class="[
      `maui-dropdown--placement-${placement.split('-')[0]}`
    ]"
  >
    <div
      ref="trigger"
      class="maui-dropdown__trigger"
    >
      <slot />
    </div>
    <transition :name="transition">
      <div
        v-show="show"
        ref="popover"
        class="maui-dropdown__popover"
        :class="[
          `dropdown-popover--${show ? 'show' : 'hide'}`
        ]"
      >
        <slot name="menu" />
      </div>
    </transition>
  </div>
</template>

<script>
import MauiMixin from '../../mixin/maui'
import PopoverMixin from '../../mixin/popover'

const placement = { ...PopoverMixin.placement, default: 'bottom' }

export default {
  name: 'MuDropdown',
  mixins: [MauiMixin, PopoverMixin],
  props: {
    placement
  },
  created () {
    this.$on('click-item', () => {
      this.show = false
    })
  }
}
</script>
