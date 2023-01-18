import { addSeconds, format } from 'date-fns'
import React, { useCallback, useState } from 'react'
import Button from '../../../components/button/Button'
import DateInput from '../../../components/date-input/DateInput'
import InputWithSearch from '../../../components/input-with-search/InputWithSearch'

interface IAddSet {
  setNumber: string
  updateSetHandler: (id: string, newVal: string) => void
  deleteSetHandler: (id: string) => void
  set: ISet
}

function AddSet(props: IAddSet) {
  const { setNumber, set, updateSetHandler, deleteSetHandler } = props
  const { id, name } = set

  // updateSetHandler(set.id, exercise)
  const updateHandler = useCallback(
    (s: string) => {
      updateSetHandler(id, s)
    },
    [updateSetHandler, id]
  )

  return (
    <label
      htmlFor={`set ${setNumber}`}
      className="my-2 flex items-center gap-4"
    >
      <span>Exercise {setNumber} :</span>
      <InputWithSearch
        type="exercise"
        label={`set ${setNumber}`}
        value={name ?? ''}
        setValue={updateHandler}
      />
      <button type="button" onClick={() => deleteSetHandler(set.id)}>
        X
      </button>
    </label>
  )
}

interface ISet {
  id: string
  name: string
}

interface IAddWorkoutSets {
  sets: ISet[]
  setSets: React.Dispatch<React.SetStateAction<ISet[]>>
}

function AddWorkoutSets(props: IAddWorkoutSets) {
  const { sets, setSets } = props

  function addSetHandler() {
    const newSet = {
      id: crypto.randomUUID(),
      name: '',
    }
    setSets((prevSets) => prevSets.concat(newSet))
  }

  const updateSetHandler = useCallback(
    (id: string, newVal: string) => {
      setSets((prevSets) =>
        prevSets.map((s) => {
          if (s.id === id) {
            return {
              id: s.id,
              name: newVal,
            }
          }
          return s
        })
      )
    },
    [setSets]
  )

  const deleteSetHandler = useCallback(
    (id: string) => {
      setSets((prevSets) => prevSets.filter((s) => s.id !== id))
    },
    [setSets]
  )

  return (
    <section>
      <h2 className="mb-2 text-2xl">Plan</h2>
      {/* MAKE SECONDARY BUTTON */}
      {sets.map((set, index) => (
        <AddSet
          key={set.id}
          setNumber={`${index + 1}`}
          set={set}
          updateSetHandler={updateSetHandler}
          deleteSetHandler={deleteSetHandler}
        />
      ))}
      <Button
        type="button"
        onClickHandler={() => addSetHandler()}
        primary={false}
      >
        Add Set
      </Button>
    </section>
  )
}

export default function AddWorkout() {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [sets, setSets] = useState<ISet[]>([])

  // Just datetime stuff, this will be
  const currentDate = new Date()
  const [datetime, setDatetime] = useState<[string, string]>([
    format(currentDate, 'yyyy-MM-dd'),
    format(currentDate, 'HH:mm'),
  ])
  const hoursSeconds = datetime[1].split(':')
  const totalSeconds = +hoursSeconds[0] * 60 + +hoursSeconds[1]
  const datetimeObj = addSeconds(new Date(datetime[0]), totalSeconds)
  const isWorkoutInFuture = datetimeObj > new Date()

  const addWorkoutHandler = useCallback(() => {
    const mappedSets = sets.map((set, index) => {
      return {
        exercise: index + 1,
        name: set.name,
      }
    })
    const payload = {
      name,
      type,
      sets: mappedSets,
    }
    console.log(payload)
  }, [name, type, sets])

  return (
    <main className="mx-4 mt-2 w-full max-w-4xl">
      <h1 className="mt-10 ml-4 text-3xl">Add Workout</h1>
      <div className=" my-4 gap-8 rounded-2xl bg-brand-600 p-5">
        <section className="mb-4">
          <h2 className="text-2xl">Basic Details</h2>
          <div className="my-2">
            <label htmlFor="workout-name">
              <span>Workout Name*</span>
              <InputWithSearch
                type="workout"
                value={name}
                setValue={setName}
                label="workout-name"
              />
            </label>
          </div>
          <div className="my-2">
            <label htmlFor="workout-type">
              <span>Type of Workout*</span>
              <InputWithSearch
                type="workout"
                value={type}
                setValue={setType}
                label="workout-type"
              />
            </label>
          </div>
          <div className="my-2">
            <label htmlFor="workout-type">
              {/* NEED TO MAKE CUSTOM DATE INPUT COMPONENT USING CALENDAR */}
              <span>Time*</span>
              <DateInput datetime={datetime} setDatetime={setDatetime} />
            </label>
          </div>
        </section>
        {isWorkoutInFuture && <AddWorkoutSets sets={sets} setSets={setSets} />}
      </div>
      <div className="flex w-full justify-center align-middle">
        <Button type="button" onClickHandler={addWorkoutHandler} primary>
          Add Workout
        </Button>
      </div>
    </main>
  )
}
