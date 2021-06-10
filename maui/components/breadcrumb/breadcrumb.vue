<template>
  <ul class="maui-breadcrumb">
    <slot />
  </ul>
</template>

<script>
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

export default {
  name: 'MuBreadcrumb',
  mixins: [MauiMixin],
  props: {
    separator: makeProp(String, '/')
  }
}
</script>
