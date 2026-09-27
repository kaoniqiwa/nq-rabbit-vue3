import type { App } from 'vue'
import XtxImageView from './ImageView/index.vue'
import XtxSku from './XtxSku/index.vue'

export const componentPlugin = {
  install(app: App<Element>) {
    app.component('ImageView', XtxImageView)
    app.component('Sku', XtxSku)
  }
}
