import React, { useCallback, useEffect, useState } from 'react'
import getAllOptions, { IOptionResults } from './api'
import './InputWithSearch.scss'

interface IInputWithSearch {
  type: 'workout' | 'exercise'
}

export default function InputWithSearch(props: IInputWithSearch) {
  const { type } = props
  const results = getAllOptions(type)
  const [value, setValue] = useState('')
  const [filteredResults, setFilteredResults] = useState<IOptionResults[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const newResults = results.filter((result) =>
      result.name.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredResults(newResults)
    setSelectedIndex(-1)
  }, [value, results])

  const onKeyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const keyPressed = e.key
      if (keyPressed === 'ArrowUp') {
        setSelectedIndex((prevIndex) =>
          prevIndex !== -1 ? prevIndex - 1 : prevIndex
        )
      } else if (keyPressed === 'ArrowDown') {
        setSelectedIndex((prevIndex) =>
          prevIndex !== filteredResults.length - 1 ? prevIndex + 1 : prevIndex
        )
      } else if (keyPressed === 'Enter' && selectedIndex !== -1) {
        setValue(filteredResults[selectedIndex].name)
        setSelectedIndex(-1)
        setShowMenu(false)
      } else {
        setShowMenu(true)
      }
    },
    [filteredResults, selectedIndex]
  )

  const onClickHandler = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement
    setValue(target.innerText)
    setSelectedIndex(-1)
    setShowMenu(false)
  }, [])

  return (
    <div
      className="input-with-search"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <input
        type="text"
        value={value}
        onKeyDown={onKeyDownHandler}
        onChange={(e) => setValue((e.target as HTMLInputElement).value)}
        onFocus={() => setShowMenu(true)}
        // onBlur={() => setShowMenu(false)}
      />
      {showMenu && filteredResults.length > 0 && (
        <ul className="input-results">
          {filteredResults.map((result, index) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
            <li
              key={result.id}
              className={index === selectedIndex ? 'selected-result' : ''}
              onClick={(e) => onClickHandler(e)}
            >
              {result.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
