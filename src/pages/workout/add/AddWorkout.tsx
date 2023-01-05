import { useState } from 'react'
import InputWithSearch from '../../../components/input-with-search/InputWithSearch'
import './AddWorkout.scss'

interface ISet {
  setNumber: number
  exercise: string
}

export default function AddWorkout() {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [time, setTime] = useState()
  const [plan, setPlan] = useState<ISet[]>([{ setNumber: 1, exercise: '' }])

  function addSetHandler() {
    setPlan((prevPlan) =>
      prevPlan.concat({ setNumber: prevPlan.length + 1, exercise: '' })
    )
  }

  // function setChangeHandler(e: React.KeyboardEvent<HTMLInputElement>, id: number) {
  //   setPlan((prevPlan) => prevPlan.map((prevPlan) => prevPlan.setNumber === id ? ))
  // }

  return (
    <main>
      <h1>Add Workout</h1>
      <section>
        <h2>Details</h2>
        <div>
          <label htmlFor="workout-name">Workout Name</label>
          <InputWithSearch
            type="workout"
            value={name}
            setValue={setName}
            label="workout-name"
          />
        </div>
        <div>
          <label htmlFor="workout-type">Type of workout</label>
          <InputWithSearch
            type="workout"
            value={type}
            setValue={setType}
            label="workout-type"
          />
        </div>
        <div>
          <label htmlFor="workout-type">Time</label>
          {/* NEED TO MAKE CUSTOM DATE INPUT COMPONENT USING CALENDAR */}
        </div>
      </section>
      <section>
        <h2>Plan</h2>
        <button type="button" onClick={addSetHandler}>
          Add Set
        </button>
        {plan.map((singlePlan) => {
          return (
            <div key={singlePlan.setNumber}>
              <label htmlFor={`set ${singlePlan.setNumber}`}>
                Set {singlePlan.setNumber}
              </label>
              {/* NEED TO GET VALUE FROM CHANGE SO CAN USE MAP TO CHANGE OBJECT */}
              {/* <InputWithSearch
                type="workout"
                value={singlePlan.exercise}
                setValue={(e) => setChangeHandler(e, singlePlan.setNumber)}
                label={`set ${singlePlan.setNumber}`}
              /> */}
            </div>
          )
        })}
      </section>
    </main>
  )
}
