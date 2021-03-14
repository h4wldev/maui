import { RefreshIcon } from '@vue-hero-icons/outline'

import { makeProp } from '../../../utils/props'

export const sizePropValidator = (s) => {
  return RefreshIcon.props.size.validator(s)
}

export default (name, svg) => {
  return {
    name,
    functional: true,
    props: {
      size: makeProp(String, '1x', false, sizePropValidator)
    },
    render (h, ctx) {
      let { size } = ctx.props
      size = size.endsWith('x') ? `${size.slice(0, size.length - 1)}em` : `${size}px`

      const content = svg.replace(/<svg([^>]+)>/, `<svg$1 width="${size}" height="${size}">`)

      return h(
        'i',
        {
          staticClass: `maui-icon icon--${name}`,
          domProps: { innerHTML: content }
        }
      )
    }
  }
}
