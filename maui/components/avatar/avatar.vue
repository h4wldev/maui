<template>
  <span
    ref="avatar"
    class="maui-avatar"
    :class="[
      {
        'maui-avatar--text': $slots.default,
        'maui-avatar--image': !$slots.default && image && !icon,
        'maui-avatar--icon': !$slots.default && !image && icon,
        'maui-avatar--rounded': rounded,
        'maui-avatar--squared': squared
      },
      `maui-avatar--${size}`
    ]"
  >
    <div class="maui-avatar__content">
      <span
        v-if="$slots.default"
        ref="text"
        class="maui-avatar__text"
        :style="{
          transform: `scale(${scale})`
        }"
      >
        <slot />
      </span>
      <div
        v-else-if="image"
        class="maui-avatar__image"
        :style="{
          backgroundImage: `url(${image})`
        }"
      />
      <mu-icon
        v-else-if="icon"
        :name="icon"
        size="1x"
        class="maui-avatar__icon"
      />
    </div>
  </span>
</template>

<script>
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

import MuIcon from '../icon/icon.js'

export default {
  name: 'MuAvatar',
  components: {
    MuIcon
  },
  mixins: [MauiMixin],
  props: {
    image: makeProp(String, null),
    icon: makeProp(String, null),
    rounded: makeProp(Boolean, false),
    squared: makeProp(Boolean, false),
    size: makeProp(String, 'normal', false, ['huge', 'normal', 'tiny'])
  },
  data () {
    return {
      scale: 1
    }
  },
  watch: {
    image () {
      this.scale = 1
    }
  },
  mounted () {
    this.setScale()
  },
  methods: {
    setScale () {
      if ((this.image || this.icon) || (!this.$refs.avatar || !this.$refs.text)) {
        return
      }

      const avatarWidth = this.$refs.avatar.offsetWidth
      const textWidth = this.$refs.text.offsetWidth

      if (avatarWidth === 0 || textWidth === 0) {
        return
      }

      this.scale = avatarWidth - 8 < textWidth ? (avatarWidth - 8) / textWidth : 1
    }
  }
}
</script>
