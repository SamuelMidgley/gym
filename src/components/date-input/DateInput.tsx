import React, { Dispatch, SetStateAction, useCallback } from 'react'
import styles from './DateInput.module.scss'

interface IDateInput {
  datetime: [string, string]
  setDatetime: Dispatch<SetStateAction<[string, string]>>
}

export default function DateInput(props: IDateInput) {
  const { datetime, setDatetime } = props
  const [date, time] = datetime

  const dateChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newDate = e.target.value
      setDatetime((prevDatetime) => [newDate, prevDatetime[1]])
    },
    [setDatetime]
  )

  const timeChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTime = e.target.value
      setDatetime((prevDatetime) => [prevDatetime[0], newTime])
    },
    [setDatetime]
  )

  return (
    <div className="flex gap-1">
      <input
        className={`p-2 rounded bg-brand-600 border-2 border-brand-400 ${styles.invert}`}
        type="date"
        value={date}
        onChange={dateChangeHandler}
      />
      <input
        className={`p-2 rounded bg-brand-600 border-2 border-brand-400 ${styles.invert}`}
        type="time"
        value={time}
        onChange={timeChangeHandler}
      />
    </div>
  )
}
