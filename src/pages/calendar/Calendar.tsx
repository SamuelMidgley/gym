import React, { useCallback, useEffect, useState } from 'react'
import { format } from 'date-fns'
import classNames from 'classnames'

import getMonthArray, { IDay } from './utils'

import './Calendar.scss'
import DoubleLeftIcon from '../../components/icons/DoubleLeftIcon'
import LeftIcon from '../../components/icons/LeftIcon'
import RightIcon from '../../components/icons/RightIcon'
import DoubleRightIcon from '../../components/icons/DoubleRight'

interface ITableCell extends IDay {
  dayIndex: number[]
  selectedDate: number[]
  onClickHandler: (e: React.MouseEvent<HTMLTableCellElement>) => void
}

function TableCell(props: ITableCell) {
  const { date, thisMonth, dayIndex, selectedDate, onClickHandler } = props

  const isSelected = dayIndex.toString() === selectedDate.toString()

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <td onClick={onClickHandler}>
      <div
        className={classNames({
          'prev-month': !thisMonth,
          'selected-date': isSelected,
        })}
      >
        {date}
      </div>
    </td>
  )
}

interface IDateRow {
  weekIndex: number
  selectedDate: number[]
  dayList: IDay[]
  onClickHandler: (e: React.MouseEvent<HTMLTableCellElement>) => void
}

function DateRow(props: IDateRow) {
  const { dayList, weekIndex, selectedDate, onClickHandler } = props

  return (
    <tr>
      {dayList.map((day, index) => {
        const { date, thisMonth } = day
        return (
          <TableCell
            key={`${date}_${thisMonth}`}
            dayIndex={[weekIndex, index]}
            selectedDate={selectedDate}
            date={date}
            thisMonth={thisMonth}
            onClickHandler={onClickHandler}
          />
        )
      })}
    </tr>
  )
}

export default function Calendar() {
  const [month, setMonth] = useState(11)
  const [year, setYear] = useState(2022)
  const [monthArray, setMonthArray] = useState<IDay[][]>([])
  const [selectedDate, setSelectedDate] = useState<number[]>([])

  useEffect(() => {
    const array = getMonthArray(month, year)
    setMonthArray(array)
  }, [month, year])

  getMonthArray(month, year)

  const onClickHandler = useCallback(
    (e: React.MouseEvent<HTMLTableCellElement>) => {
      const target: HTMLElement = e.target as HTMLElement
      let cellTarget: HTMLTableCellElement
      if (target.nodeName === 'DIV') {
        cellTarget = (e.target as HTMLTableCellElement)
          .parentElement as HTMLTableCellElement
      } else {
        cellTarget = e.target as HTMLTableCellElement
      }

      const dayIndex = cellTarget.cellIndex
      const weekIndex =
        (cellTarget.parentElement as HTMLTableRowElement).rowIndex - 1

      setSelectedDate([weekIndex, dayIndex])
    },
    []
  )

  return (
    <>
      <header>
        <h1>Calendar</h1>
      </header>
      <main className="calendar-main">
        <section className="calendar-main-header">
          <button
            type="button"
            onClick={() => setYear((prevYear) => prevYear - 1)}
          >
            <DoubleLeftIcon />
          </button>
          <button
            type="button"
            onClick={() => setMonth((prevMonth) => prevMonth - 1)}
          >
            <LeftIcon />
          </button>
          <h2>{format(new Date(year, month, 1), 'LLLL yyyy')}</h2>
          <button
            type="button"
            onClick={() => setMonth((prevMonth) => prevMonth + 1)}
          >
            <RightIcon />
          </button>
          <button
            type="button"
            onClick={() => setYear((prevYear) => prevYear + 1)}
          >
            <DoubleRightIcon />
          </button>
        </section>
        <table>
          <thead>
            <tr>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
            </tr>
          </thead>
          <tbody>
            {monthArray.map((week, index) => (
              <DateRow
                // Hacky key value
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                weekIndex={index}
                dayList={week}
                selectedDate={selectedDate}
                onClickHandler={onClickHandler}
              />
            ))}
          </tbody>
        </table>
      </main>
    </>
  )
}
