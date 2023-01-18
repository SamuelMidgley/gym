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
    <label htmlFor={label} className="flex items-center">
      <input
        id={label}
        name={label}
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="w-4 h-4 mr-2	accent-green"
      />
      {label}
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
    <section className="filter-options">
      <h2 className="text-2xl">Filter options</h2>
      <div>
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
