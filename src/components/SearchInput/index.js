import React, { useState } from 'react'
import './styles.scss'

const SearchInput = ({
  items, isInvalid, setFieldValue, name,
  getItemString, getItemValue
}) => {
  const [foundItems, setItems] = useState()
  const [inputFocused, setFocused] = useState(false)
  const [inputState, setInputState] = useState('')

  const handleChange = (({ target }) => {
    setInputState(target.value)
    setFieldValue(name, null)
    if (target.value.length < 1) return setItems(null)
    setItems(
      items?.filter(item =>
        JSON.stringify(
          Object.values(item)
        )
          .toLowerCase()
          .indexOf(target.value?.toLowerCase()) !== -1
      )
    )
  })

  const handleItemClick = (item) => {
    setInputState(getItemString(item))
    setFieldValue(name, getItemValue(item))
  }

  return (
    <div className="search-input">
      <input
        className={`form-control ${isInvalid ? 'is-invalid' : ''}`}
        type="text"
        value={inputState}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 80)}
      />
      {(inputFocused && foundItems?.length ?
        (<div className="search-list">
          <table className="table table-striped">
            <tbody>
              {foundItems.map((item, index) => (
                <tr
                  key={`search-input-value-${index}`}
                  onMouseDown={() => handleItemClick(item)}
                >
                  <td>
                    {getItemString(item)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>) : '')}
    </div>
  )
}

export default SearchInput
