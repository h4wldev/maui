<template>
  <div
    class="maui-dropdown-item"
    :class="{
      'maui-dropdown-item--disabled': disabled,
      'maui-dropdown-item--divided': divided,
      'maui-dropdown-item--title': title && !divided
    }"
    @click="clickHandler"
  >
    <template v-if="!divided">
      <div v-if="title" class="maui-dropdown-item__title">
        {{ title }}
      </div>
      <slot v-else>
        {{ value }}
      </slot>
    </template>
  </div>
</template>

<script>
import EmitterMixin from '../../mixin/emitter'
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

import MuDropdown from './dropdown'

export default {
  name: 'MuDropdownItem',
  mixins: [EmitterMixin, MauiMixin],
  props: {
    value: makeProp(null, null),
    title: makeProp(String, null),
    disabled: makeProp(Boolean, null),
    divided: makeProp(Boolean, null)
  },
  methods: {
    clickHandler (e) {
      if (this.disabled) {
        return
      }

      this.$emit('click', e)

      if (!this.divided && !this.title && this.value) {
        this.$dispatch(MuDropdown, 'click-item', this.value)
      }
    }
  }
}
</script>
