import {
  endOfMonth,
  getDay,
  startOfMonth,
  getDate,
  getYear,
  getMonth,
} from 'date-fns'

export default function getDayArray() {
  const year = 2022
  const month = 12
  const date = new Date(year, month - 1)

  const start = startOfMonth(date)
  const end = endOfMonth(date)

  console.log(getDay(start))
  console.log(getDate(start))
  console.log(getDay(end))
  console.log(getDate(end))
}
