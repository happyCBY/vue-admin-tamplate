import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default function parseTime(time, cFormat) {
  const format = cFormat || 'YYYY-MM-DD HH:mm:ss'
  return moment(time).format(format)
}
