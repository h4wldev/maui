<template>
  <li
    class="maui-nav__item"
    :class="{
      'maui-nav__item--active': active,
      'maui-nav__item--disabled': disabled,
      'maui-nav__item--dropdown': isDropdown
    }"
    @click="clickHandler"
  >
    <div class="nav-item__content">
      <slot />
    </div>
    <div v-if="isDropdown && dropdownDisabled" class="nav-item__arrow">
      <mu-icon name="chevron-down" size="0.8x" />
    </div>
  </li>
</template>

<script>
import MauiMixin from '../../mixin/maui'
import { parentLoop } from '../../mixin/emitter'

import { makeProp } from '../../utils/props'

import MuDropdown from '../dropdown/dropdown'
import MuIcon from '../icon/icon'
import MuNav from './nav'

export default {
  name: 'MuNavItem',
  components: {
    MuIcon
  },
  mixins: [MauiMixin],
  props: {
    active: makeProp(Boolean, false),
    disabled: makeProp(Boolean, false)
  },
  computed: {
    isDropdown () {
      return this.$parent.$is(MuDropdown)
    },
    dropdownDisabled () {
      return this.isDropdown && !this.$parent.disabled_
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.dropdownDisableBinder()
    })
  },
  methods: {
    clickHandler (e) {
      if (this.disabled) {
        return
      }

      this.$emit('click', e)
    },
    dropdownDisableBinder () {
      if (!this.isDropdown) {
        return
      }

      parentLoop(this, ($parent) => {
        if (!$parent.$mauiComponent || !$parent.$is(MuNav)) {
          return
        }

        this.$parent.setDisabled($parent.scroll)
        return true
      })
    }
  }
}
</script>
