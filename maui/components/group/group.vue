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
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

export default {
  name: 'MuGroup',
  mixins: [MauiMixin],
  props: {
    vertical: makeProp(Boolean, false)
  }
}
</script>
