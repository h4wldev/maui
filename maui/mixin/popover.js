import { makeProp } from '../utils/props'
import outsideClickEventListner from '../utils/click-outside'

export default {
  props: {
    disabled: makeProp(Boolean, false),
    trigger: makeProp(String, 'hover', false, ['hover', 'click', 'right-click']),
    placement: makeProp(String, 'bottom-left', false, [
      'bottom', 'bottom-left', 'bottom-right',
      'top', 'top-left', 'top-right',
      'left', 'left-top', 'left-bottom',
      'right', 'right-top', 'right-bottom'
    ])
  },
  data () {
    return {
      show: false,
      position: {
        top: 0,
        left: 0
      },
      disabled_: this.disabled
    }
  },
  computed: {
    transition () {
      const [placement] = this.placement.split('-')

      switch (placement) {
        case 'top': return 'slide-down'
        case 'bottom': return 'slide-up'
        case 'left': return 'slide-right'
        case 'right': return 'slide-left'
      }
    }
  },
  watch: {
    show () {
      this.$emit('toggle', this.show)

      if (this.show) {
        this.$nextTick(() => {
          this.setPopoverPosition()
        })
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.bindEventOnTrigger()
      this.setPopoverPosition()
    })
  },
  methods: {
    setDisabled (disabled) {
      this.disabled_ = disabled
    },
    setPopoverPosition () {
      const { trigger, popover } = this.$refs
      const [firstPlacement, secondPlacement] = this.placement.split('-')

      switch (firstPlacement) {
        case 'top': case 'bottom':
          this.position.left = trigger.offsetLeft - (popover.offsetWidth / 2) + (trigger.offsetWidth / 2)
          this.position.top = (firstPlacement === 'top')
            ? trigger.offsetTop - popover.offsetHeight
            : trigger.offsetTop + trigger.offsetHeight

          if (secondPlacement === 'left') {
            this.position.left = trigger.offsetLeft
          } else if (secondPlacement === 'right') {
            this.position.left = trigger.offsetLeft + trigger.offsetWidth - popover.offsetWidth
          }
          break
        case 'left': case 'right':
          this.position.top = trigger.offsetTop + (trigger.offsetHeight / 2) - (popover.offsetHeight / 2)
          this.position.left = (firstPlacement === 'left')
            ? trigger.offsetLeft - popover.offsetWidth
            : trigger.offsetLeft + trigger.offsetWidth

          if (secondPlacement === 'top') {
            this.position.top = trigger.offsetTop
          } else if (secondPlacement === 'bottom') {
            this.position.top = trigger.offsetTop + trigger.offsetHeight - popover.offsetHeight
          }
          break
      }

      popover.style.top = `${this.position.top}px`
      popover.style.left = `${this.position.left}px`
    },
    bindEventOnTrigger () {
      if (this.disabled_) {
        return
      }

      const { trigger, wrapper } = this.$refs

      switch (this.trigger) {
        case 'hover':
          trigger.addEventListener('mouseenter', () => {
            this.show = true
          })
          wrapper.addEventListener('mouseleave', () => {
            this.show = false
          })
          break
        case 'click':
          trigger.addEventListener('click', () => {
            this.show = !this.show
          })
          break
        case 'right-click':
          trigger.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            this.show = true
          })
          break
      }

      outsideClickEventListner(wrapper, () => {
        this.show = false
      })
    }
  }
}
