import { endOfMonth, getDay, startOfMonth, getDate } from 'date-fns'

export interface IDay {
  date: number
  month: number
}

function sliceIntoChunks(arr: IDay[], chunkSize: number) {
  const res = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize)
    res.push(chunk)
  }
  return res
}

export default function getMonthArray(month: number, year: number) {
  const monthArray: IDay[] = []
  const date = new Date(year, month)

  const start = startOfMonth(date)
  const startDay = getDay(start)
  let startDayValue: number = startDay
  startDayValue = startDay === 0 ? 7 : startDay

  if (startDayValue !== 1) {
    const prevMonth = new Date(year, month - 1)
    const prevMonthEnd = endOfMonth(prevMonth)
    let prevMonthEndDate = getDate(prevMonthEnd)

    for (let index = 0; index < startDayValue - 1; index += 1) {
      const dayObject: IDay = {
        date: prevMonthEndDate,
        month: month === 0 ? 11 : month - 1,
      }
      monthArray.unshift(dayObject)
      prevMonthEndDate -= 1
    }
  }

  const end = endOfMonth(date)
  const endDay = getDay(end)
  const endDate = getDate(end)

  for (let index = 1; index < endDate + 1; index += 1) {
    const dayObject: IDay = {
      date: index,
      month,
    }
    monthArray.push(dayObject)
  }

  let remainingDays = 7 - endDay
  const { length } = monthArray

  if (length < 35) {
    remainingDays += 7
  }

  if (remainingDays !== 0) {
    for (let index = 1; index < remainingDays + 1; index += 1) {
      const dayObject: IDay = {
        date: index,
        month: month + 1,
      }
      monthArray.push(dayObject)
    }
  }

  const processedMonthArray = sliceIntoChunks(monthArray, 7)

  return processedMonthArray
}
