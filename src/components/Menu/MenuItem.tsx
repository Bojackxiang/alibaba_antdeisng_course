import React, { useContext, createContext } from "react";
import classNames from "classnames";
import { menuContext } from "./Menu";

export interface IMenuItem {
  index?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const MenuItem: React.FC<IMenuItem> = (props) => {
  const { index, disabled, className, style, children } = props;
  

  // use the passed -in function and value by using context
  const context = useContext(menuContext);

  // setup the classes
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index, // if the index equals to the context.index: active
  });

  // handling the item click event
  const itemClicked = () => {
    
    if (!disabled && context.onSelect) {
      if (typeof index !== "number") return;

      context.onSelect(index)
    }

    
  };

  // rendering
  return (
    
    <li className={classes} style={style} onClick={itemClicked}>
      {console.log(index)}
      {children}
    </li>
  );
};

MenuItem.defaultProps = {};

//
MenuItem.displayName = "MenuItem";

export default MenuItem;
