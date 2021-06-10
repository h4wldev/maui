<template>
  <ul
    class="maui-pagination"
    :class="[
      `maui-pagination--${size}`
    ]"
  >
    <li
      v-if="setHandler"
      class="maui-pagination__item maui-pagination__action-set-prev"
      :class="{
        'maui-pagination__item--disabled': set <= 0
      }"
    >
      <mu-button
        icon="chevron-double-left"
        :disabled="set <= 0"
        :size="size"
        @click="set -= 1"
      />
    </li>
    <li
      v-if="pageHandler"
      class="maui-pagination__item maui-pagination__action-prev"
      :class="{
        'maui-pagination__item--disabled': current_ <= 1
      }"
    >
      <mu-button
        icon="chevron-left"
        :disabled="current_ <= 1"
        :size="size"
        @click="current_ -= 1"
      />
    </li>
    <template v-for="i in perSet">
      <li
        v-if="getPage(i) <= maxPage"
        :key="`page-${i}`"
        class="maui-pagination__item"
        :class="{
          'maui-pagination__item--active': current_ === getPage(i)
        }"
      >
      <mu-button
        :size="size"
        @click="clickPage(getPage(i))"
      >
        {{ getPage(i) }}
      </mu-button>
      </li>
    </template>
    <li
      v-if="pageHandler"
      class="maui-pagination__item maui-pagination__action-next"
      :class="{
        'maui-pagination__item--disabled': current_ >= maxPage
      }"
    >
      <mu-button
        icon="chevron-right"
        :disabled="current_ >= maxPage"
        :size="size"
        @click="current_ += 1"
      />
    </li>
    <li
      v-if="setHandler"
      class="maui-pagination__item maui-pagination__action-set-next"
      :class="{
        'maui-pagination__item--disabled': set >= maxSet - 1
      }"
    >
      <mu-button
        icon="chevron-double-right"
        :disabled="set >= maxSet - 1"
        :size="size"
        @click="set += 1"
      />
    </li>
  </ul>
</template>

<script>
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

import MuButton from '../button/button'

export default {
  name: 'MuPagination',
  components: {
    MuButton
  },
  mixins: [MauiMixin],
  props: {
    current: makeProp(Number, 1, false),
    total: makeProp(Number, 0, true),
    perPage: makeProp(Number, 10),
    perSet: makeProp(Number, 10),
    setHandler: makeProp(Boolean, false),
    pageHandler: makeProp(Boolean, false),
    size: makeProp(String, 'normal', false, ['huge', 'normal', 'tiny'])
  },
  data () {
    const maxPage = Math.ceil(this.total / this.perPage)
    const set = Math.ceil(this.current / this.perSet) - 1

    return {
      set,
      maxPage,
      maxSet: Math.ceil(maxPage / this.perSet),
      current_: this.current
    }
  },
  watch: {
    current_ () {
      this.set = Math.ceil(this.current_ / this.perSet) - 1
    }
  },
  methods: {
    getPage (i) {
      return (this.set * this.perSet) + i
    },
    clickPage (page) {
      this.current_ = page

      this.$emit('page-change', page)
      this.$emit('update:current', page)
    }
  }
}
</script>
