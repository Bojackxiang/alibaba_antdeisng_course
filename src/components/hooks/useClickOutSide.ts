import React, {useEffect,  RefObject } from 'react'

const useClickOutSide = (ref: RefObject<HTMLElement>, handler: Function) => {
    useEffect(() => {
        const listener = (e: MouseEvent) => {
            console.log(e.target)
            if(!ref.current || ref.current.contains(e.target as HTMLElement)) {
                // case 1 if there is not ref 
                // case 2: if the event is happeing on the autocomplete component (which means the component should not disappear )
                return 
            }
            handler(e)
        }

        document.addEventListener("click", listener)

        return () => {
            document.removeEventListener('click', listener);
        }
    }, [ref, handler])

}

export default useClickOutSide;
