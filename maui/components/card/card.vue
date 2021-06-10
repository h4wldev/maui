<template>
  <div
    class="maui-card"
    :class="{
      'maui-card--has-image': image,
      'maui-card--bordered': bordered,
      'maui-card--squared': squared
    }"
  >
    <div
      v-if="image"
      class="maui-card__image"
      :class="{
        'maui-card__image--no-animation': noImageAnimation
      }"
      :style="{
        paddingBottom: imageHeight
      }"
    >
      <div
        v-if="$slots.image"
        class="card-image__content"
      >
        <slot name="image" />
      </div>
      <div
        class="card-image__image"
        :style="{
          backgroundImage: `url(${image})`
        }"
      />
    </div>
    <div
      v-if="$slots.header"
      class="maui-card__header"
    >
      <slot name="header" />
    </div>

    <div class="maui-card__body">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="maui-card__footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import MauiMixin from '../../mixin/maui'

import { makeProp } from '../../utils/props'

export default {
  name: 'MuCard',
  mixins: [MauiMixin],
  props: {
    image: makeProp(String, null),
    imageRatio: makeProp(String, '1.85:1'),
    noImageAnimation: makeProp(Boolean, false),
    bordered: makeProp(Boolean, false),
    squared: makeProp(Boolean, false)
  },
  computed: {
    imageHeight () {
      const [heightRatio, widthRatio] = this.imageRatio.split(':')
      const height = ((widthRatio / heightRatio) * 100).toFixed(4)

      return `${height}%`
    }
  }
}
</script>
