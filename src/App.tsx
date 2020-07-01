import React, { ChangeEvent, useState } from "react";
import Form from "./components/Form";
import AutoComplete from "./components/AutoComplete";

export const App = () => {
  const [inputValue, setinputValue] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setinputValue(value);
  };

  const onSelect = (item: string) => {
    setinputValue(item);
  };

  const example = ["apple", "banana", "orange"];
  const fetchFilter = (query: string) => {
    
    // if the query is an "", then reove a new promise
    console.log('query', query)
    if(!query) return new Promise((resolve) => {resolve([])});

    
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((resp) => resp.json())
      .then(({ items }) => {     
        if(!items) return new Promise((resolve) => {resolve([])})
        const formatedData = items.slice(0, 10).map((item: any) => {
          return { value: item.login };
        });
        console.log('formatedData: ', formatedData);
        return formatedData
      });
  };

  const renderOption = (itemName: string) => {
    return <h2>{itemName}</h2>;
  };

  return (
    // <Form onChange={onChange} defaultValue='my default value'/>
    <AutoComplete
      onChange={onChange}
      fetchSuggestion={fetchFilter}
      value={inputValue}
      onSelect={onSelect}
      renderOptions={renderOption}
    />
  );
};
