<template>
  <div
    class="maui-container"
    :class="{
      'maui-container--fluid': fluid
    }"
  >
    <slot />
  </div>
</template>

<script>
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

export default {
  name: 'MuContainer',
  mixins: [MauiMixin],
  props: {
    fluid: makeProp(Boolean, false)
  }
}
</script>
