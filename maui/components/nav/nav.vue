<template>
  <nav
    class="maui-nav"
    :class="{
      'maui-nav--vertical': vertical,
      'maui-nav--scrollable': scroll || !vertical,
      'maui-nav--has-extra': $slots.extra
    }"
  >
    <template v-if="enableScroll">
      <div
        class="maui-nav__scroll-action maui-nav__scroll-action--prev"
        :class="{
          'maui-nav__scroll-action--disabled': !scrollOffset
        }"
        @click="scrolling('prev')"
      >
        <mu-icon name="chevron-left" size="0.8x" />
      </div>
      <div
        class="maui-nav__scroll-action maui-nav__scroll-action--next"
        :class="{
          'maui-nav__scroll-action--disabled': wrapWidth + scrollOffset >= listWidth
        }"
        @click="scrolling('next')"
      >
        <mu-icon name="chevron-right" size="0.8x" />
      </div>
    </template>

    <div
      ref="wrap"
      class="maui-nav__wrap"
      :class="{
        'maui-nav__wrap--scroll': enableScroll
      }"
    >
      <ul
        ref="list"
        class="maui-nav__list"
        :style="{
          transform: enableScroll ? `translate(${scrollOffset * -1}px, 0)` : null
        }"
      >
        <slot />
      </ul>
    </div>
    <div
      v-if="$slots.extra"
      class="maui-nav__extra"
    >
      <slot name="extra" />
    </div>
  </nav>
</template>

<script>
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

import MuIcon from '../icon/icon'

export default {
  name: 'MuNav',
  components: {
    MuIcon
  },
  mixins: [MauiMixin],
  props: {
    vertical: makeProp(Boolean, false),
    scroll: makeProp(Boolean, false),
    noAnimation: makeProp(Boolean, false)
  },
  data () {
    return {
      enableScroll: false,
      scrollOffset: 0,
      maxScrollOffset: 0,
      wrapWidth: 0,
      listWidth: 0
    }
  },
  mounted () {
    if (!this.scroll || this.vertical) {
      return
    }

    window.addEventListener('resize', this.updateScroll, false)
    this.updateScroll()

    this.$nextTick(() => {
      this.setScrollOffset(this.getActiveItemOffset())
    })
  },
  updated () {
    this.updateScroll()
  },
  methods: {
    getActiveItemOffset () {
      const activeItem = this.$el.querySelector('.maui-nav__item--active')

      if (!activeItem) {
        return 0
      }

      const { left } = activeItem.getBoundingClientRect()
      return left - this.$refs.wrap.getBoundingClientRect().left
    },
    scrolling (direction) {
      let deltaOffset = this.wrapWidth

      if (direction === 'prev') {
        deltaOffset *= -1
      }

      this.setScrollOffset(this.scrollOffset + deltaOffset)
    },
    updateScroll () {
      const { wrap, list } = this.$refs

      if (!this.scroll || this.vertical || !wrap || !list) {
        return
      }

      this.enableScroll = wrap.offsetWidth < list.offsetWidth

      this.$nextTick(() => {
        this.wrapWidth = wrap.offsetWidth
        this.listWidth = list.offsetWidth

        this.maxScrollOffset = this.listWidth - this.wrapWidth
      })
    },
    setScrollOffset (offset) {
      if (!this.scroll || this.vertical) {
        return
      }

      this.scrollOffset = offset < 0 ? 0 : Math.abs(offset)

      if (this.scrollOffset >= this.maxScrollOffset) {
        this.scrollOffset = this.maxScrollOffset
      }
    }
  }
}
</script>
