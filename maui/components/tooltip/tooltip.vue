<template>
  <div
    ref="wrapper"
    class="maui-tooltip"
    :class="[
      `maui-tooltip--placement-${placement}`
    ]"
  >
    <div
      ref="trigger"
      class="maui-tooltip__trigger"
    >
      <slot />
    </div>
    <transition :name="transition">
      <div
        v-show="show"
        ref="popover"
        class="maui-tooltip__popover"
        :class="[
          `tooltip-tooltip--${show ? 'show' : 'hide'}`
        ]"
      >
        <div class="maui-tooltip__inner">
          <div class="tooltip-inner__arrow" :style="arrowStyles" />
          <div class="tooltip-inner__content">
            {{ title }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { makeProp } from '../../utils/props'

import MuPopover from '../popover/popover'

export default {
  name: 'MuTooltip',
  extends: MuPopover,
  props: {
    title: makeProp(String, null),
    placement: makeProp(String, 'bottom', false, ['bottom', 'top', 'left', 'right'])
  }
}
</script>
