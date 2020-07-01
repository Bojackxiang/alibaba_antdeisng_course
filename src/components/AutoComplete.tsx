import React, { useState, ChangeEvent, ReactElement, useEffect, useRef } from "react";
import Form, { IForm } from "./Form";
import useDebounce from "./hooks/useDebounce";
import useClickOutSide from "./hooks/useClickOutSide";



export interface DataSource {
  value: string;
}
export type DataSourceType<T> = T & DataSource;

export interface IAutoComplete extends Omit<IForm, "onSelect"> {
  // fetchSuggestion?: (snippet: string) => string[];
  fetchSuggestion?: (query: string) => Promise<any>;
  onSelect?: (item: string) => void;
  renderOptions?: (item: string) => ReactElement;
}
const AutoComplete: React.FC<IAutoComplete> = (props) => {
  // props
  const {
    fetchSuggestion,
    onSelect,
    value,
    onChange,
    renderOptions,
    ...restProps
  } = props;

  // holder for suggestions
  const [inputValue, setInputValue] = useState(value);
  const [suggestion, setSuggestion] = useState<{ value: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null)

  const debounceValue = useDebounce(inputValue, 500)
  useClickOutSide(componentRef, () => {
    // setSuggestion([])
    console.log('object')
  })

  // -> use effect : debounce 
  useEffect(() => {
    if(debounceValue && fetchSuggestion){
      console.log('triggered ...')
      fetchSuggestion(debounceValue).then((resp) => {
        setSuggestion(resp);
        
      });
    }
    setLoading(false);
  }, [debounceValue])


  // -> handling  input change
  const handlerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // get the string
    setLoading(true)

    const inputValue = e.target.value.trim();
    setInputValue(inputValue);

    if(onChange) {
      onChange(e)
    }
  };

  // -> handing item selected
  const itemSelectHandler = (item: string) => {
    setSuggestion([]);
    if (onSelect) onSelect(item);
  };

  // -> RENDER COMPONENTS: 
  const renderTemplate = (item: string) => {
    if (!renderOptions) return item;
    return renderOptions(item) ?? item;
  };

  // -> RENDER COMPONENTS: generate a drop down component
  const generateDropDown = () => {
    return (   
      <ul>
        {suggestion.map((item: { value: string }) => (
          <li key={item.value} onClick={() => itemSelectHandler(item.value)}>
            {renderTemplate(item.value)}
          </li>
        ))}
      </ul>
    );
  };

  // returned component
  return (
    <div className="viking-auto-conplete" ref={componentRef}>
      <Form value={value} onChange={handlerInputChange} {...restProps} />
      {loading === true ? <h1>loading</h1> : null}
      {generateDropDown()}
    </div>
  );
};

export default AutoComplete;
