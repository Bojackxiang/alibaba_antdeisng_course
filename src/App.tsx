import React, {ChangeEvent, useState}from 'react'
import Form from './components/Form'
import AutoComplete from './components/AutoComplete'

export const App = () => {
  const [inputValue, setinputValue] = useState('')

  const onChange= (e: ChangeEvent<HTMLInputElement> ) => {
    const value = e.target.value;
    setinputValue(value)
  }

  const onSelect = (item: string) => {
    setinputValue(item)
  }

  const example = ['apple', 'banana', 'orange']
  const fetchFilter = (query: string) => {
    return example.filter(item => item.includes(query))
  }

  const renderOption = (itemName: string) => {
    return  <h2>{itemName}</h2>
  }

  return (
    // <Form onChange={onChange} defaultValue='my default value'/>
    <AutoComplete 
      onChange={onChange} 
      fetchSuggestion={fetchFilter}
      value={inputValue}
      onSelect={onSelect}
      renderOptions={renderOption}
    />
  )
}
