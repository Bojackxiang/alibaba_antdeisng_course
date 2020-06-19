import React, {useContext, createContext} from 'react'
import classNames from "classnames";
import {menuContext} from './Menu'


interface IMenuItem {
    index: number;
    disabled?: boolean;
    className?: string; 
    style?: React.CSSProperties;
    children?: React.ReactNode;
}


const MenuItem:React.FC<IMenuItem> = (props) => {
    const {index, disabled, className, style, children } = props;

    // use the passed -in function and value by using context 
    const context = useContext(menuContext)

    // setup the classes 
    const classes = classNames("menu-item", className, {
        'is-disabled': disabled,
        'is-active': context.index === index // if the index equals to the context.index: active
    })

    //
    const itemClicked = () => {
        
        if(!disabled && context.onSelect) {
            context.onSelect(index)
        }
        
    }
    
    // 
    return (
        <li className={classes} style={style} onClick={itemClicked}>
            {children}
        </li>
    )
}

MenuItem.defaultProps = {

}


export default MenuItem
