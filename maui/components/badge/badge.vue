<template>
  <div
    class="maui-badge"
    :class="[
      {
        'maui-badge--dot': dot,
        'maui-badge--hide': hide && $slots.default,
        'maui-badge--only-badge': !$slots.default
      },
      `maui-badge--${variant}`
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
import { makeProp } from '../../utils/props'

export default {
  name: 'MuBadge',
  props: {
    variant: makeProp(String, 'default'),
    value: makeProp([String, Number], 0),
    dot: makeProp(Boolean, false),
    hide: makeProp(Boolean, false),
    maxValue: makeProp(Number, null)
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

<style lang="scss">
@import './badge';
</style>
