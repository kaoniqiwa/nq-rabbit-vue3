import type { App, DirectiveBinding } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
export const lazyLoadPlugin = {
  install(app: App<Element>) {
    app.directive<HTMLImageElement, string>('img-lazy', {
      mounted(el: HTMLImageElement, binding: DirectiveBinding<string>) {
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            el.setAttribute('src', binding.value)
            // 防止重复监听
            stop()
          }
        })
      }
    })
  }
}
