import { Link } from 'react-router-dom'
import React, { useCallback, useEffect, useState } from 'react'
import { format, getMonth, getYear } from 'date-fns'
import classNames from 'classnames'

import getMonthArray, { IDay } from './utils'

import './Calendar.scss'
import DoubleLeftIcon from '../../components/icons/DoubleLeftIcon'
import LeftIcon from '../../components/icons/LeftIcon'
import RightIcon from '../../components/icons/RightIcon'
import DoubleRightIcon from '../../components/icons/DoubleRight'
import {
  getWorkoutDatesFromMonth,
  CalendarWorkoutDay,
  getWorkoutsFromDate,
} from './api'
import Button from '../../components/button/Button'

interface ITableCell extends IDay {
  selectedDate: number
  workoutDates: IDay[]
  currentMonth: number
  onClickHandler: (e: React.MouseEvent<HTMLTableCellElement>) => void
}

function TableCell(props: ITableCell) {
  const {
    date,
    month,
    currentMonth,
    selectedDate,
    workoutDates,
    onClickHandler,
  } = props

  const isSelected = selectedDate === date && currentMonth === month
  const diffMonth = currentMonth !== month
  const hasWorkout =
    workoutDates.filter((w) => w.date === date && w.month === month).length > 0

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <td onClick={onClickHandler}>
      <div
        className={classNames({
          'prev-month': diffMonth,
          'selected-date': isSelected,
          'has-workout': hasWorkout,
        })}
      >
        {date}
      </div>
    </td>
  )
}

interface IDateRow {
  selectedDate: number
  workoutDates: IDay[]
  dayList: IDay[]
  currentMonth: number
  onClickHandler: (e: React.MouseEvent<HTMLTableCellElement>) => void
}

function DateRow(props: IDateRow) {
  const { dayList, currentMonth, workoutDates, selectedDate, onClickHandler } =
    props

  return (
    <tr>
      {dayList.map((day) => {
        const { date, month } = day

        return (
          <TableCell
            key={`${date}_${month}`}
            selectedDate={selectedDate}
            date={date}
            month={month}
            workoutDates={workoutDates}
            onClickHandler={onClickHandler}
            currentMonth={currentMonth}
          />
        )
      })}
    </tr>
  )
}

export default function Calendar() {
  const currentDate = new Date()
  const [month, setMonth] = useState(getMonth(currentDate))
  const [year, setYear] = useState(getYear(currentDate))
  const [monthArray, setMonthArray] = useState<IDay[][]>([])
  const [selectedDate, setSelectedDate] = useState<number>(-1)
  const [workouts, setWorkouts] = useState<IDay[]>([])
  const [workoutDay, setWorkoutDay] = useState<CalendarWorkoutDay[]>([])

  useEffect(() => {
    const array = getMonthArray(month, year)
    setMonthArray(array)

    const workoutsForMonth = getWorkoutDatesFromMonth(month, year)
    setWorkouts(workoutsForMonth)
  }, [month, year])

  useEffect(() => {
    const results = getWorkoutsFromDate(selectedDate, month, year)
    setWorkoutDay(results)
  }, [selectedDate, month, year])

  const onClickHandler = useCallback(
    (e: React.MouseEvent<HTMLTableCellElement>) => {
      const target = e.target as HTMLElement
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

      const selectedMonth = monthArray[weekIndex][dayIndex].month
      const selectedDay = monthArray[weekIndex][dayIndex].date

      if (selectedMonth !== month) {
        if (selectedDay < 15) {
          setMonth((prevMonth) => prevMonth + 1)
          setSelectedDate(selectedDay)
        } else {
          setMonth((prevMonth) => prevMonth - 1)
          setSelectedDate(selectedDay)
        }
      } else {
        const newSelectedDate = selectedDate === selectedDay ? -1 : selectedDay
        setSelectedDate(newSelectedDate)
      }
    },
    [monthArray, selectedDate, month]
  )

  function calendarChangeHandler(period: 'month' | 'year', change: number) {
    setSelectedDate(-1)
    if (period === 'month') {
      let newMonth
      if (month === 11 && change === 1) {
        setYear((prevYear) => prevYear + 1)
        newMonth = 0
      } else if (month === 0 && change === -1) {
        setYear((prevYear) => prevYear - 1)
        newMonth = 11
      } else {
        newMonth = month + change
      }
      setMonth(newMonth)
    } else {
      setYear((prevYear) => prevYear + change)
    }
  }

  return (
    <>
      <header>
        <h1 className="text-3xl mt-4 font-bold">Calendar</h1>
      </header>
      <main className="calendar-main">
        <section className="calendar-month">
          <div className="calendar-main-header">
            <button
              type="button"
              onClick={() => calendarChangeHandler('year', -1)}
            >
              <DoubleLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => calendarChangeHandler('month', -1)}
            >
              <LeftIcon />
            </button>
            <h2 className="text-2xl">
              {format(new Date(year, month, 1), 'LLLL yyyy')}
            </h2>
            <button
              type="button"
              onClick={() => calendarChangeHandler('month', 1)}
            >
              <RightIcon />
            </button>
            <button
              type="button"
              onClick={() => calendarChangeHandler('year', 1)}
            >
              <DoubleRightIcon />
            </button>
          </div>
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
                  workoutDates={workouts}
                  dayList={week}
                  selectedDate={selectedDate}
                  currentMonth={month}
                  onClickHandler={onClickHandler}
                />
              ))}
            </tbody>
          </table>
        </section>
        {selectedDate > -1 && (
          <section className="calendar-day">
            <h2>
              {format(new Date(year, month, selectedDate), 'EEEE do MMMM y')}
            </h2>
            <ul>
              {workoutDay.map((workout) => (
                <li key={workout.workoutId}>
                  <Link to={`/gym/workout/${workout.workoutId}`}>
                    <div />
                    <p>{`${format(workout.date, 'HH:mm')} : ${workout.name} - ${
                      workout.location
                    }`}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="add-button">
              <Button
                type="button"
                onClickHandler={() => console.log('clicked')}
              >
                Add Workout
              </Button>
            </div>
          </section>
        )}
      </main>
    </>
  )
}
