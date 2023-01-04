import classNames from 'classnames'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ExpandIcon from '../icons/ExpandIcon'
import getAllOptions, { IOptionResults } from './api'
import './InputWithSearch.scss'

interface IInputWithSearch {
  type: 'workout' | 'exercise'
}

const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => {
    if (htmlElRef.current) {
      htmlElRef.current.focus()
    }
  }

  return [htmlElRef, setFocus]
}

export default function InputWithSearch(props: IInputWithSearch) {
  const { type } = props
  const results = getAllOptions(type)
  const [value, setValue] = useState('')
  const [filteredResults, setFilteredResults] = useState<IOptionResults[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [showMenu, setShowMenu] = useState(false)
  const [inputRef, setInputFocus] = useFocus()
  const ref = useRef(null)

  useEffect(() => {
    let newResults

    if (results.map((r) => r.name).includes(value)) {
      newResults = results
      setShowMenu(false)
    } else {
      newResults = results.filter((result) =>
        result.name.toLowerCase().includes(value.toLowerCase())
      )
    }
    setFilteredResults(newResults)
    setSelectedIndex(-1)
  }, [value, results])

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

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
      ref={ref}
      className={classNames('input-with-search', { 'active-input': showMenu })}
      onClick={() => {
        setShowMenu((prevState) => !prevState)
        setInputFocus()
      }}
    >
      <div className="input-box">
        <input
          type="text"
          value={value}
          onKeyDown={onKeyDownHandler}
          onChange={(e) => setValue((e.target as HTMLInputElement).value)}
          ref={inputRef}
        />
        <ExpandIcon />
      </div>
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
