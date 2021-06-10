<template>
  <span
    class="maui-tag"
    :class="[
      {
        'maui-tag--hollow': hollow,
        'maui-tag--pill': pill,
        'maui-tag--squared': squared,
        'maui-tag--dashed': dashed,
        'maui-tag--closeable': closeable
      },
      `maui-tag--${variant}`
    ]"
  >
    <div class="maui-tag__content">
      <slot />
    </div>
    <div
      v-if="closeable"
      class="maui-tag__close"
      @click="$emit('close')"
    >
      <mu-icon name="x" />
    </div>
  </span>
</template>

<script>
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

export default {
  name: 'MuTag',
  mixins: [MauiMixin],
  props: {
    variant: makeProp(String, 'default'),
    pill: makeProp(Boolean, false),
    hollow: makeProp(Boolean, false),
    dashed: makeProp(Boolean, false),
    squared: makeProp(Boolean, false),
    closeable: makeProp(Boolean, false)
  },
  methods: {
    $close () {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>
