import Vue from 'vue'

import * as OutlineIcon from '@vue-hero-icons/outline'
import * as SolidIcon from '@vue-hero-icons/solid'

import { makeProp } from '../../utils/props'
import createIcon, { sizePropValidator } from './icons/base'

import LoadingIcon from './icons/loading-icon.js'

export const Icons = {
  outline: {
    LoadingIcon,
    ...OutlineIcon
  },
  solid: SolidIcon
}

export default Vue.component('MuIcon', {
  props: {
    name: makeProp(String, null, true),
    solid: makeProp(Boolean, false),
    size: makeProp(String, '1x', false, sizePropValidator)
  },
  computed: {
    IconComponent () {
      const icons = this.solid ? Icons.solid : Icons.outline
      const tokens = this.name.split('-')
        .map(n => `${n[0].toUpperCase()}${n.substr(1).toLowerCase()}`)

      const componentName = `${tokens.join('')}Icon`

      if (componentName in icons) {
        return icons[componentName]
      }

      return null
    }
  },
  render (h) {
    const ctx = {
      data: {},
      props: { size: this.size }
    }
    let { IconComponent } = this

    if (!IconComponent) {
      IconComponent = createIcon(this.name, '<svg viewBox="0 0 24 24" />')
    }

    const element = IconComponent.render(h, ctx)

    return element.tag === 'i' ? element : h(
      'i',
      {
        staticClass: 'maui-icon',
        class: [
          {
            [`icon--${this.name}`]: IconComponent !== null
          }
        ]
      },
      [element]
    )
  }
})
