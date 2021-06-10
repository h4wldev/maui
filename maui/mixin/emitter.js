export const parentLoop = (self, handler = () => {}) => {
  let $parent = self.$parent || self.$root

  do {
    if (handler($parent)) {
      return
    }

    $parent = $parent.$parent
  } while ($parent)
}

export default {
  methods: {
    $dispatch (component, event, params) {
      parentLoop(this, ($parent) => {
        if ($parent.$mauiComponent && $parent.$is(component)) {
          $parent.$emit(event, params)
          return true
        }
      })
    },
    $broadcast (event, params) {
      parentLoop(this, ($parent) => {
        $parent.$emit(event, params)
      })
    }
  }
}
