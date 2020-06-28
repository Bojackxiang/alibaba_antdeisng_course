import React, { useState, ChangeEvent, ReactElement, } from "react";
import Form, { IForm } from "./Form";

export interface DataSource {
  value: string; 
}
export type DataSourceType<T> = T & DataSource 

export interface IAutoComplete extends Omit<IForm, "onSelect"> {
  fetchSuggestion?: (snippet: string) => string[];
  onSelect?: (item: string) => void;
  renderOptions?: (item: string) => ReactElement;
}
const AutoComplete: React.FC<IAutoComplete> = (props) => {
  // props
  const { fetchSuggestion, onSelect, value, onChange, renderOptions, ...restProps } = props;

  // holder for suggestions
  const [inputValue, setInputValue] = useState(value);
  const [suggestion, setSuggestion] = useState<string[]>([]);

  // handle input
  const handlerInputChange = (e: ChangeEvent<HTMLInputElement>) => {

    const inputValue = e.target.value.trim();
    setInputValue(inputValue);

    if (inputValue && fetchSuggestion) {
      const suggestionList = fetchSuggestion(inputValue);

      setSuggestion(suggestionList);
    } else {
      setSuggestion([]);
    }

    if (onChange) {
      onChange(e);
    }
  };

  // handing item selected
  const itemSelectHandler = (item: string) => {
    setSuggestion([])
    if(onSelect) onSelect(item);
  };


  // -> render options
  const renderTemplate = (item: string) => {
      if(!renderOptions) return item 
      return renderOptions(item) ?? item
  }
  // -> COMPONENTS: generate a drop down component 
  const generateDropDown = () => {
    return (
      <ul>
        {suggestion.map((item: string) => (
          <li key={item} onClick={() => itemSelectHandler(item)}>
            {renderTemplate(item)}
          </li>
        ))}
      </ul>
    );
  };

  // returned component
  return (
    <div className="viking-auto-conplete">
      <Form value={value} onChange={handlerInputChange} {...restProps} />

      {generateDropDown()}
    </div>
  );
};

export default AutoComplete;
