<template>
  <mu-group class="maui-collapse" vertical>
    <slot />
  </mu-group>
</template>

<script>
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

import MuGroup from '../group/group'
import MuCollapseItem from './collapse-item'

export default {
  name: 'MuCollapse',
  components: {
    MuGroup
  },
  mixins: [MauiMixin],
  props: {
    active: makeProp([Number, Array], []),
    noAnimation: makeProp(Boolean, false),
    accordion: makeProp(Boolean, false)
  },
  data () {
    const active = Array.isArray(this.active)
      ? this.active
      : [this.active]

    return {
      active_: new Set(active)
    }
  },
  computed: {
    collapseChilds () {
      return this.$slots.default.reduce((r, c) => {
        const component = c.componentInstance || {}

        if (component.$mauiComponent && component.$is(MuCollapseItem)) {
          r.push(c.componentInstance)
        }

        return r
      }, [])
    }
  },
  mounted () {
    this.setIndexOnChild()
    this.setShowOnChild()

    this.$on('item-toggle', this.toggle)
  },
  methods: {
    setIndexOnChild () {
      this.collapseChilds.forEach((c, i) => {
        c.index = i
      })
    },
    setShowOnChild () {
      this.collapseChilds.forEach((c) => {
        c.show = this.active_.has(c.index)
      })
    },
    toggle (item) {
      const { index, show } = item

      if (!show) {
        if (this.accordion) {
          this.active_ = new Set([index])
        } else {
          this.active_.add(index)
        }
      } else {
        this.active_.delete(index)
      }

      this.setShowOnChild()

      this.$emit('update:active', this.active_.values())
      this.$emit('change', this.active_)
    }
  }
}
</script>
