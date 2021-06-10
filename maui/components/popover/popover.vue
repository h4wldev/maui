<template>
  <div
    ref="wrapper"
    class="maui-popover"
    :class="[
      `maui-popover--placement-${placement}`
    ]"
  >
    <div
      ref="trigger"
      class="maui-popover__trigger"
    >
      <slot />
    </div>
    <transition :name="transition">
      <div
        v-show="show"
        ref="popover"
        class="maui-popover__popover"
        :class="[
          `popover-popover--${show ? 'show' : 'hide'}`
        ]"
      >
        <div class="maui-popover__inner">
          <div class="popover-inner__arrow" :style="arrowStyles" />
          <div
            v-if="title"
            class="popover-inner__header"
          >
            {{ title }}
          </div>
          <div class="popover-inner__content">
            <slot
              name="content"
              :close="() => show = false"
            >
              {{ content }}
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import MauiMixin from '../../mixin/maui'
import PopoverMixin from '../../mixin/popover'

import { makeProp } from '../../utils/props'

export default {
  name: 'MuPopover',
  mixins: [MauiMixin, PopoverMixin],
  props: {
    title: makeProp(String, null),
    content: makeProp(String, null),
    placement: makeProp(String, 'bottom', false, [
      'bottom', 'bottom-left', 'bottom-right',
      'top', 'top-left', 'top-right',
      'left', 'left-top', 'left-bottom',
      'right', 'right-top', 'right-bottom'
    ])
  },
  computed: {
    arrowStyles () {
      const [firstPlacement, secondPlacement] = this.placement.split('-')
      const styles = {}

      switch (firstPlacement) {
        case 'top': case 'bottom':
          styles[firstPlacement === 'top' ? 'bottom' : 'top'] = '-5px'
          styles.left = '50%'
          styles.transform = 'translateX(-50%) rotate(45deg)'
          break
        case 'left': case 'right':
          styles[firstPlacement === 'left' ? 'right' : 'left'] = '-5px'
          styles.top = '50%'
          styles.transform = 'translateY(-50%) rotate(45deg)'
          break
      }

      switch (secondPlacement) {
        case 'right': styles.left = null; styles.right = '10px'; break
        case 'left': styles.left = '25px'; break
        case 'top': styles.top = '10px'; break
        case 'bottom': styles.top = null; styles.bottom = '5px'; break
      }

      return styles
    }
  }
}
</script>
