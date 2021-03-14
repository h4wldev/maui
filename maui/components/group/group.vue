<template>
  <div
    class="maui-group"
    :class="[
      `maui-group--${ vertical ? 'vertical' : 'horizontal' }`
    ]"
  >
    <slot />
  </div>
</template>

<script>
import { makeProp } from '../../utils/props'

export default {
  name: 'MuGroup',
  props: {
    vertical: makeProp(Boolean, false)
  }
}
</script>

<style lang="scss">
@import './group';
</style>
