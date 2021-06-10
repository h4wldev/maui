<template>
  <span class="mu-countdown">
    <slot
      :days="days"
      :hours="hours"
      :minutes="minutes"
      :seconds="seconds"
      :milliseconds="milliseconds"
      :totalDays="totalDays"
      :totalHours="totalHours"
      :totalMinutes="totalMinutes"
      :totalSeconds="totalSeconds"
      :totalMilliseconds="totalMilliseconds"
    >
      {{ days }}:{{ hours }}:{{ minutes }}:{{ seconds }}.{{ milliseconds }}
    </slot>
  </span>
</template>

<script>
import dayjs from 'dayjs'

import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

const MILLISECONDS_SECOND = 1000
const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND
const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE
const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR

export default {
  name: 'MuCountdown',
  mixins: [MauiMixin],
  props: {
    to: makeProp([Date, Number, String], null, true),
    from: makeProp([Date, Number, String], null)
  },
  data () {
    return {
      totalMilliseconds: 0,
      counter: null
    }
  },
  computed: {
    to_ () {
      return dayjs(this.to)
    },
    days () {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_DAY)
    },
    hours () {
      return Math.floor((this.totalMilliseconds % MILLISECONDS_DAY) / MILLISECONDS_HOUR)
    },
    minutes () {
      return Math.floor((this.totalMilliseconds % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE)
    },
    seconds () {
      return Math.floor((this.totalMilliseconds % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND)
    },
    milliseconds () {
      return Math.floor(this.totalMilliseconds % MILLISECONDS_SECOND)
    },
    totalDays () {
      return this.days
    },
    totalHours () {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_HOUR)
    },
    totalMinutes () {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_MINUTE)
    },
    totalSeconds () {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_SECOND)
    }
  },
  mounted () {
    this.counter = setInterval(() => {
      this.update()
    }, 100)
  },
  beforeDestroy () {
    clearInterval(this.counter)
  },
  methods: {
    update () {
      const from = this.from ? dayjs(this.from) : dayjs()
      this.totalMilliseconds = this.to_ - from
    }
  }
}
</script>
