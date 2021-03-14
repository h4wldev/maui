<template>
  <div
    class="maui-container"
    :class="[
      {
        'maui-container--fluid': fluid
      }
    ]"
  >
    <slot />
  </div>
</template>

<script>
import { makeProp } from '../../utils/props'

export default {
  name: 'MuContainer',
  props: {
    fluid: makeProp(Boolean, false)
  }
}
</script>

<style lang="scss">
@import './container';
</style>
