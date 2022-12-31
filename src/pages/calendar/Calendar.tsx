import React, { useCallback, useEffect, useState } from 'react'
import { format } from 'date-fns'

import getMonthArray, { IDay } from './utils'

import './Calendar.scss'
import DoubleLeftIcon from '../../components/icons/DoubleLeftIcon'
import LeftIcon from '../../components/icons/LeftIcon'
import RightIcon from '../../components/icons/RightIcon'
import DoubleRightIcon from '../../components/icons/DoubleRight'

interface ITableCell extends IDay {
  onClickHandler: (e: React.MouseEvent<HTMLTableCellElement>) => void
}

function TableCell(props: ITableCell) {
  const { date, thisMonth, onClickHandler } = props

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <td onClick={onClickHandler}>
      <div className={!thisMonth ? 'prev-month' : ''}>{date}</div>
    </td>
  )
}

interface IDateRow {
  dayList: IDay[]
  onClickHandler: (e: React.MouseEvent<HTMLTableCellElement>) => void
}

function DateRow(props: IDateRow) {
  const { dayList, onClickHandler } = props

  return (
    <tr>
      {dayList.map((day) => {
        const { date, thisMonth } = day
        return (
          <TableCell
            key={`${date}_${thisMonth}`}
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
      const weekIndex = (cellTarget.parentElement as HTMLTableRowElement)
        .rowIndex

      return [dayIndex, weekIndex]
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
                key={index}
                dayList={week}
                onClickHandler={onClickHandler}
              />
            ))}
            {/* <tr>
              <TableCell value={1} onClickHandler={onClickHandler} />
              <TableCell value={1} onClickHandler={onClickHandler} />
              <TableCell value={1} onClickHandler={onClickHandler} />
              <TableCell value={1} onClickHandler={onClickHandler} />
              <TableCell value={1} onClickHandler={onClickHandler} />
              <TableCell value={1} onClickHandler={onClickHandler} />
              <TableCell value={1} onClickHandler={onClickHandler} />
            </tr>
            <tr>
              <td>2</td>
              <td>2</td>
              <td className="highlighted h-start">
                <div>2</div>
              </td>
              <td className="highlighted">
                <div>2</div>
              </td>
              <td className="highlighted">
                <div>2</div>
              </td>
              <td className="highlighted h-end">
                <div>2</div>
              </td>
              <td>2</td>
            </tr>
            <tr>
              {[3, 3, 3, 3, 3, 3, 3].map((num, index) => (
                <TableCell
                  value={num}
                  key={index}
                  onClickHandler={onClickHandler}
                />
              ))}
            </tr>
            <tr>
              {[4, 4, 4, 4, 4, 4, 4].map((num, index) => (
                <TableCell
                  value={num}
                  key={index}
                  onClickHandler={onClickHandler}
                />
              ))}
            </tr>
            <tr>
              {[5, 5, 5, 5, 5, 5, 5].map((num, index) => (
                <TableCell
                  value={num}
                  key={index}
                  onClickHandler={onClickHandler}
                />
              ))}
            </tr> */}
          </tbody>
        </table>
      </main>
    </>
  )
}
