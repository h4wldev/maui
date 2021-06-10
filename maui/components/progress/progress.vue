<template>
  <div
    class="maui-progress"
    :class="[
      `maui-progress--${size}`
    ]"
  >
    <slot />
  </div>
</template>

<script>
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

export default {
  name: 'MuProgress',
  mixins: [MauiMixin],
  props: {
    size: makeProp(String, 'normal', false, ['huge', 'normal', 'tiny', 'tiniest']),
    min: makeProp(Number, 0),
    max: makeProp(Number, 100)
  }
}
</script>
