import language from './language.json'
import { HotGoodType } from '@/types'

export default abstract class Language {
  static json = language

  static HotGoodType(type: HotGoodType) {
    switch (type) {
      case HotGoodType.day:
        return Language.json.HotGoodType.day
      case HotGoodType.week:
        return Language.json.HotGoodType.week
      case HotGoodType.total:
        return Language.json.HotGoodType.total
      default:
        return ''
    }
  }
}
