<template>
  <span
    class="maui-skeleton"
    :class="{
      'maui-skeleton--circle': circle,
      'maui-skeleton--rounded': rounded,
      'maui-skeleton--no-animation': noAnimation
    }"
    :style="{
      width: typeof width === 'number' ? `${width}%` : width,
      height: typeof height === 'number' ? `${height}%` : height
    }"
  />
</template>

<script>
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

export default {
  name: 'MuSkeleton',
  mixins: [MauiMixin],
  props: {
    width: makeProp([String, Number], '100%'),
    height: makeProp([String, Number], '1rem'),
    noAnimation: makeProp(Boolean, false),
    circle: makeProp(Boolean, false),
    rounded: makeProp(Boolean, false)
  }
}
</script>
