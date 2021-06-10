<template>
  <div
    class="maui-badge"
    :class="[
      {
        'maui-badge--dot': dot,
        'maui-badge--hide': hide && $slots.default,
        'maui-badge--only-badge': !$slots.default
      },
      `maui-badge--${variant}`,
      `maui-badge--placement-${placement}`
    ]"
  >
    <div
      v-if="$slots.default"
      class="maui-badge__content"
    >
      <slot />
    </div>
    <sup
      v-if="!dot"
      class="maui-badge__value"
    >
      <mu-tag
        :variant="variant"
        pill
      >
        {{ value_ }}
      </mu-tag>
    </sup>
  </div>
</template>

<script>
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

export default {
  name: 'MuBadge',
  mixins: [MauiMixin],
  props: {
    variant: makeProp(String, 'default'),
    value: makeProp([String, Number], 0),
    dot: makeProp(Boolean, false),
    hide: makeProp(Boolean, false),
    maxValue: makeProp(Number, null),
    placement: makeProp(String, 'top-right', false, [
      'bottom', 'bottom-left', 'bottom-right',
      'top', 'top-left', 'top-right',
      'left', 'left-top', 'left-bottom',
      'right', 'right-top', 'right-bottom'
    ])
  },
  computed: {
    value_ () {
      if (this.maxValue && typeof this.value === 'number') {
        return this.value > this.maxValue ? `${this.maxValue}+` : this.value
      }

      return this.value
    }
  }
}
</script>
