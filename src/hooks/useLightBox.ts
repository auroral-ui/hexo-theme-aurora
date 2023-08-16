import { useLightBoxStore } from '@/stores/lightbox'

export default function useLightBox() {
  const lightBoxStore = useLightBoxStore()

  const showImage = (ele: HTMLImageElement) => {
    lightBoxStore.openImage(ele)
  }

  const initializeLightBox = () => {
    const postHtmlEle = document.querySelector('.post-html')

    if (!postHtmlEle) return

    let imageNodes = postHtmlEle.querySelectorAll('img')
    for (let i = 0; i < imageNodes.length; i++) {
      lightBoxStore.addImage(imageNodes[i].src)
      imageNodes[i].addEventListener('click', function () {
        showImage(this)
      })
    }
  }

  return { initializeLightBox }
}
