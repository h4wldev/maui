<template>
  <ul class="maui-breadcrumb">
    <slot />
  </ul>
</template>

<script>
import { makeProp } from '../../utils/props'

export default {
  name: 'MuBreadcrumb',
  props: {
    separator: makeProp(String, '/')
  }
}
</script>

<style lang="scss">
@import 'breadcrumb';
</style>
