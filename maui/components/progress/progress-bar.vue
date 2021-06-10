<template>
  <div
    class="maui-progress-bar"
    :class="[
      `maui-progress-bar--${variant}`
    ]"
    :style="{
      width: `${percent}%`
    }"
  >
    <div
      v-if="showValue"
      class="maui-progress-bar__value"
    >
      <slot
        name="value"
        :percent="percent"
      >
        {{ Number.parseInt(percent) }}
      </slot>
    </div>
  </div>
</template>

<script>
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

export default {
  name: 'MuProgressBar',
  mixins: [MauiMixin],
  props: {
    value: makeProp(Number, 0, true),
    variant: makeProp(String, 'default'),
    showValue: makeProp(Boolean, false)
  },
  computed: {
    percent () {
      let parent = this.$parent

      while (true) {
        if (!parent) {
          return 0
        } else if (parent._name && parent._name.includes('MuProgress')) {
          break
        }

        parent = parent.$parent
      }

      const { max, min } = parent
      const percent = ((this.value - min) * 100) / (max - min)

      return percent || 0
    }
  }
}
</script>
