import { computed, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
  const formatTime = computed(() => {
    // dayjs.unix(秒)
    return dayjs.unix(time.value).format('mm分ss秒')
  })
  const time = ref(0)
  let timer: any = null

  const start = (currentTime: number) => {
    console.log(currentTime)
    time.value = currentTime

    timer = setInterval(function () {
      console.log('inter')

      if (time.value > 0) {
        console.log('value')

        time.value--
      } else {
        clearTimer()
      }
    }, 1000)

    return () => {
      clearTimer()
    }
  }
  const clearTimer = () => {
    timer && clearInterval(timer)
  }
  onUnmounted(() => {
    clearTimer()
  })
  return {
    formatTime,
    start
  }
}
