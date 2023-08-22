import { ref } from 'vue'

export default function useJumpToEle() {
  const element = ref()
  const elementOffsetTop = ref(0)

  /**
   * Literate to gather all the offset parents' offsetTop values
   * Because if the "relative" parent will affect the value of offsetTop
   */
  const getOffsetTop = (targetEle: HTMLElement | null) => {
    let offsetTop = 0
    while (targetEle) {
      offsetTop += targetEle.offsetTop
      targetEle = targetEle.offsetParent as HTMLElement
    }
    return offsetTop
  }

  // -31 for top padding of the app container
  // -81 for fixed header
  const jumpToEle = (id: string) => {
    element.value = document.getElementById(id)
    if (element.value) {
      elementOffsetTop.value =
        element.value && element.value instanceof HTMLElement
          ? getOffsetTop(element.value) - 30 - 81
          : 0
    }
    window.scrollTo({
      top: elementOffsetTop.value,
      behavior: 'smooth'
    })
  }

  return { jumpToEle }
}
