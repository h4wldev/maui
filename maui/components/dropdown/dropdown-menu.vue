<template>
  <mu-group class="maui-dropdown-menu" vertical>
    <slot />
  </mu-group>
</template>

<script>
import MauiMixin from '../../mixin/maui'

import MuGroup from '../group/group'

export default {
  name: 'MuDropdownMenu',
  components: {
    MuGroup
  },
  mixins: [MauiMixin]
}
</script>
