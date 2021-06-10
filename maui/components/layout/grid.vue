<template>
  <div
    class="maui-grid"
    :class="[
      {
        'maui-grid--reverse': reverse
      },
      `maui-grid--gutter-${gutter}`
    ]"
  >
    <slot />
  </div>
</template>

<script>
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

export default {
  name: 'MuGrid',
  mixins: [MauiMixin],
  props: {
    gutter: makeProp(Number, 2, false, v => v >= 0 && v <= 20),
    reverse: makeProp(Boolean, false)
  }
}
</script>
