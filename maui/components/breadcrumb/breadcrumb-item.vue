<template>
  <li class="maui-breadcrumb__item">
    <div class="breadcrumb-item__content">
      <slot />
    </div>
    <div class="breadcrumb-item__separator">
      {{ separator_ }}
    </div>
  </li>
</template>

<script>
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

export default {
  name: 'MuBreadcrumbItem',
  mixins: [MauiMixin],
  props: {
    separator: makeProp(String, null)
  },
  data () {
    return {
      separator_: this.separator || '/'
    }
  },
  created () {
    if (!this.separator) {
      this.separator_ = this.$parent.separator
    }
  }
}
</script>
