export default ($target, listener = () => {}) => {
  if (!document) {
    return
  }

  document.addEventListener('click', (e) => {
    let $el = e.target

    do {
      $el = $el.parentElement

      if ($el === $target) {
        return
      }
    } while ($el)

    listener(e)
  })
}
