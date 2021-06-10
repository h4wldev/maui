<template>
  <div class="maui-tabs">
    <div class="maui-tabs__nav">
      <mu-nav :scroll="scroll">
        <mu-nav-item
          v-for="(pane, i) in panes"
          :key="`pane-${i}`"
          :active="active === i"
          :disabled="pane.disabled"
          @click="activeChange(i)"
        >
          {{ pane.label }}
        </mu-nav-item>
        <template v-slot:extra>
          <slot name="nav-extra" />
        </template>
      </mu-nav>
    </div>
    <div
      ref="content"
      class="maui-tabs__content"
        :style="{
          transform: `translate(${(active * contentWidth) * -1}px, 0)`
        }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

import MuNav from '../nav/nav'
import MuNavItem from '../nav/nav-item'
import MuTabPane from './tab-pane'

export default {
  name: 'MuTabs',
  components: {
    MuNav,
    MuNavItem
  },
  mixins: [MauiMixin],
  props: {
    scroll: makeProp(Boolean, false),
    defaultActive: makeProp(Number, 0)
  },
  data () {
    return {
      active: this.defaultActive,
      panes: [],
      contentWidth: 0
    }
  },
  watch: {
    active () {
      this.setActiveOnPane()
    }
  },
  mounted () {
    window.addEventListener('resize', this.setContentWidth, false)

    this.panes = this.getPanes()
    this.$nextTick(() => {
      this.setActiveOnPane()
      this.setContentWidth()
    })
  },
  methods: {
    getPanes () {
      return this.$children.filter(n => n.$mauiComponent && n.$is(MuTabPane))
    },
    setActiveOnPane () {
      this.panes.forEach((p, i) => {
        p.active = (this.active === i)
      })
    },
    setContentWidth () {
      this.contentWidth = this.$el.offsetWidth
    },
    activeChange (i) {
      this.active = i
      this.$emit('change', this.active)
    }
  }
}
</script>
