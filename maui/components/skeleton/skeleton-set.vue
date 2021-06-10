<template>
  <mu-grid
    class="maui-skeleton-set"
    :gutter="gutter"
  >
    <mu-column
      v-for="(size, index) in width_"
      :key="index"
      :size="size"
    >
      <mu-skeleton
        :no-animation="noAnimation"
        :rounded="rounded"
      />
    </mu-column>
    <mu-column
      :size="24 - width_.reduce((r, c) => r + c, 0)"
    >
      <mu-skeleton
        :no-animation="noAnimation"
        :rounded="rounded"
      />
    </mu-column>
  </mu-grid>
</template>

<script>
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

import MuColumn from '../layout/column'
import MuGrid from '../layout/grid'
import MuSkeleton from './skeleton'

export default {
  name: 'MuSkeletonSet',
  components: {
    MuColumn,
    MuGrid,
    MuSkeleton
  },
  mixins: [MauiMixin],
  props: {
    width: makeProp(Array, () => [24], false, v => v.every(v => Number.isInteger(v))),
    height: makeProp([String, Number], '1rem'),
    gutter: makeProp(Number, 2, false, v => v >= 0 && v <= 20),
    noAnimation: makeProp(Boolean, false),
    rounded: makeProp(Boolean, false),
    random: makeProp(Boolean, false),
    randomMin: makeProp(Number, 3),
    randomMax: makeProp(Number, 10)
  },
  data () {
    return {
      width_: []
    }
  },
  mounted () {
    this.width_ = this.random ? this.getRandomWidth() : this.width
  },
  methods: {
    getRandomWidth () {
      let sum = 0
      const width = []

      while (true) {
        const random = Math.floor(
          Math.random() * (this.randomMax - this.randomMin) + this.randomMin
        )

        if (sum + random >= 24) {
          break
        }

        width.push(random)
        sum += random
      }

      return width
    }
  }
}
</script>
