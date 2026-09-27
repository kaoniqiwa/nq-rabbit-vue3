import type { App, ComponentOptions } from 'vue'
import XtxImageView from './ImageView/index.vue'
import XtxSku from './XtxSku/index.vue'

export const componentPlugin = {
  install(app: App<Element>, options?: ComponentOptions) {
    app.component('ImageView', XtxImageView)
    app.component('Sku', XtxSku)
  }
}
