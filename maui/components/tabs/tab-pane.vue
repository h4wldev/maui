<template>
  <div
    class="maui-tab-pane"
    :class="{
      'maui-tab-pane--active': active
    }"
  >
    <slot />
  </div>
</template>

<script>
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

export default {
  name: 'MuTabPane',
  mixins: [MauiMixin],
  props: {
    label: makeProp(String, null, true),
    disabled: makeProp(Boolean, false)
  },
  data () {
    return {
      active: false
    }
  }
}
</script>
