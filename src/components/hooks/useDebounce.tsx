import React, {useState, useEffect} from 'react'
import { debugPort } from 'process'

// the value here is the input value in the example 
const useDebounce = (value: any, delay=300) => {
    
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        /**
         * the result(the action will do) will be saved in hadler 
         */
        const handler = window.setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => {
            /**
             * if user input value within 300ms, 
             * then clean will be triggered; 
             * and re-created a handler 
             */
            clearTimeout(handler)
        }
    }, [value, delay])

    return debounceValue

}

export default useDebounce;

