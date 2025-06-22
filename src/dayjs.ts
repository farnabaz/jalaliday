import dayjs from 'dayjs'
import plugin from './plugin'

dayjs.extend(plugin)
dayjs.calendar('jalali')

export default dayjs
