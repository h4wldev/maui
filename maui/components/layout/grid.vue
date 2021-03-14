<template>
  <div
    class="maui-grid"
    :class="[
      `maui-grid--gutter-${gutter}`,
      {
        'maui-grid--reverse': reverse
      }
    ]"
  >
    <slot />
  </div>
</template>

<script>
import { makeProp } from '../../utils/props'

export default {
  name: 'MuGrid',
  props: {
    gutter: makeProp(Number, 2, false, v => v >= 0 && v <= 20),
    reverse: makeProp(Boolean, false)
  }
}
</script>

<style lang="scss">
@import './grid';
</style>
