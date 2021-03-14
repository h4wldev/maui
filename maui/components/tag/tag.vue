<template>
  <span
    class="maui-tag"
    :class="[
      {
        'maui-tag--hollow': hollow,
        'maui-tag--pill': pill,
        'maui-tag--squared': squared,
        'maui-tag--dashed': dashed,
        'maui-tag--closable': closable
      },
      `maui-tag--${variant}`
    ]"
  >
    <div class="maui-tag__content">
      <slot />
    </div>
    <div
      v-if="closable"
      class="maui-tag__close"
      @click="close"
    >
      <mu-icon name="x" />
    </div>
  </span>
</template>

<script>
import { makeProp } from '../../utils/props'

export default {
  name: 'MuTag',
  props: {
    variant: makeProp(String, 'default'),
    pill: makeProp(Boolean, false),
    hollow: makeProp(Boolean, false),
    dashed: makeProp(Boolean, false),
    squared: makeProp(Boolean, false),
    closable: makeProp(Boolean, false)
  },
  methods: {
    close (e) {
      this.$emit('close', e)
    }
  }
}
</script>

<style lang="scss">
@import './tag';
</style>
