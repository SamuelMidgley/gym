import { useState } from 'react'
import './FilterOptions.scss'

interface ICheckBox {
  label: string
  value: boolean
  onChange: () => void
}
const Checkbox = (props: ICheckBox) => {
  const { label, value, onChange } = props

  return (
    <label htmlFor={label} className="flex items-center first-letter:uppercase">
      <input
        id={label}
        name={label}
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="mr-2 h-4 w-4	accent-green"
      />
      <p className="first-letter:uppercase">{label}</p>
    </label>
  )
}

export default function FilterOptions() {
  const [typeFilters, setTypeFilters] = useState<string[]>([])

  function onChangeHandler(label: string) {
    if (typeFilters.includes(label)) {
      setTypeFilters((prevFilters) =>
        prevFilters.filter((val) => val !== label)
      )
    } else {
      setTypeFilters((prevFilters) => prevFilters.concat(label))
    }
  }

  return (
    <section>
      <h2 className="mb-2 text-2xl">Filter options</h2>
      <div className="w-full rounded-2xl bg-brand-600 px-5 py-3">
        <h3 className="text-xl">Type</h3>
        <Checkbox
          label="exercise"
          value={typeFilters.includes('exercise')}
          onChange={() => onChangeHandler('exercise')}
        />
        <Checkbox
          label="workout"
          value={typeFilters.includes('workout')}
          onChange={() => onChangeHandler('workout')}
        />
      </div>
    </section>
  )
}
