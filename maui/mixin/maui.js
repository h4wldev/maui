export default {
  computed: {
    $name () {
      return this.$options.name
    },
    $mauiComponent () {
      return true
    }
  },
  methods: {
    $is (component) {
      return this.$name === (component.name || component)
    }
  }
}
