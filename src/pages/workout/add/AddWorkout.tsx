import { addSeconds, format } from 'date-fns'
import { useState } from 'react'
import Button from '../../../components/button/Button'
import DateInput from '../../../components/date-input/DateInput'
import InputWithSearch from '../../../components/input-with-search/InputWithSearch'
import './AddWorkout.scss'

interface IAddSet {
  setNumber: number
}

function AddSet(props: IAddSet) {
  const { setNumber } = props
  const [exercise, setExercise] = useState<string>('')

  return (
    <label
      htmlFor={`set ${setNumber}`}
      className="flex items-center gap-4 my-2"
    >
      <span>Set {setNumber} :</span>
      <InputWithSearch
        type="exercise"
        label={`set ${setNumber}`}
        value={exercise}
        setValue={setExercise}
      />
      <button type="button">X</button>
    </label>
  )
}

function AddWorkoutSets() {
  return (
    <section>
      <h2 className="text-2xl">Plan</h2>
      {/* MAKE SECONDARY BUTTON */}
      <AddSet setNumber={1} />
      <Button type="button" onClickHandler={() => console.log('hello')}>
        Add Set
      </Button>
    </section>
  )
}

export default function AddWorkout() {
  const [name, setName] = useState('')
  const [type, setType] = useState('')

  // Just datetime stuff, this will be
  const currentDate = new Date()
  const [datetime, setDatetime] = useState<[string, string]>([
    format(currentDate, 'dd-MM-yyyy'),
    format(currentDate, 'HH:mm'),
  ])
  const hoursSeconds = datetime[1].split(':')
  const totalSeconds = +hoursSeconds[0] * 60 + +hoursSeconds[1]
  const datetimeObj = addSeconds(new Date(datetime[0]), totalSeconds)
  const isWorkoutInFuture = datetimeObj > new Date()

  return (
    <main className="max-w-4xl mt-2 mx-4 w-full">
      <h1 className="text-3xl mt-10">Add Workout</h1>
      <div className=" gap-8 bg-brand-600 rounded-2xl p-5 my-4">
        <section className="mb-4">
          <h2 className="text-2xl">Basic Details</h2>
          <label htmlFor="workout-name">
            <span>Workout Name*</span>
          </label>
          <InputWithSearch
            type="workout"
            value={name}
            setValue={setName}
            label="workout-name"
          />
          <label htmlFor="workout-type">
            <span>Type of Workout*</span>
            <InputWithSearch
              type="workout"
              value={type}
              setValue={setType}
              label="workout-type"
            />
          </label>
          <label htmlFor="workout-type">
            {/* NEED TO MAKE CUSTOM DATE INPUT COMPONENT USING CALENDAR */}
            <span>Time*</span>
            <DateInput datetime={datetime} setDatetime={setDatetime} />
          </label>
        </section>
        {isWorkoutInFuture && <AddWorkoutSets />}
      </div>
      <div className="flex align-middle w-full justify-center">
        <Button type="button" onClickHandler={() => console.log('hello')}>
          Add Workout
        </Button>
      </div>
    </main>
  )
}
