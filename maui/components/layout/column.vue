<template>
  <div
    class="maui-column"
    :class="{
      [`maui-column--${size}`]: size,
      [`maui-column--offset-${offset}`]: offset,
      ...sizeClasses
    }"
  >
    <slot />
  </div>
</template>

<script>
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

const COLUMN_PROP = makeProp(Number, null, false, v => v > 0 && v <= 24)

export default {
  name: 'MuColumn',
  mixins: [MauiMixin],
  props: {
    size: COLUMN_PROP,
    offset: COLUMN_PROP,
    ...['xs', 'sm', 'md', 'lg'].reduce((r, c) => {
      return {
        [`${c}`]: COLUMN_PROP,
        [`${c}Offset`]: COLUMN_PROP,
        ...r
      }
    }, {})
  },
  computed: {
    sizeClasses () {
      return ['xs', 'sm', 'md', 'lg'].reduce((r, c) => {
        const size = this[c]
        const offset = this[`${c}Offset`]

        return {
          [`maui-column--${c}-${size}`]: size,
          [`maui-column--${c}-offset-${offset}`]: offset,
          ...r
        }
      }, {})
    }
  }
}
</script>
