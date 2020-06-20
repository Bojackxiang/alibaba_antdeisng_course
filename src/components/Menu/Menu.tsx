import React, { createContext, useState } from "react";
import classNames from "classnames";
import { onSelectType } from "../../Types/onSelectType";
import { MenuModeType } from "../../Types/MenuModeType";
import {IMenuItem} from './MenuItem'


interface IMenuContext {
  index?: number;
  onSelect?: onSelectType;
  mode?: MenuModeType
}
export const menuContext = createContext<IMenuContext>({ index: 0 });

export interface IMenu {
  defaultIndex?: number;
  className?: string;
  mode?: MenuModeType;
  style?: React.CSSProperties;
  onSelect?: onSelectType; // user defined function 
  children?: React.ReactNode;
}
const Menu: React.FC<IMenu> = (props: IMenu) => {
  const { defaultIndex, className, mode, style, onSelect, children } = props;

  // set the classes for the menu
  const classes = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode === "horizontal",
  });

  // set the active index of the menu
  const [menuIndex, setMenuIndex] = useState(defaultIndex);

  // triggered when user select an menu item
  const menuItemSelectedHandler: onSelectType = (selectedIndex) => {
    setMenuIndex(selectedIndex);
    // run user defined function if existed ...
    if (onSelect) onSelect(selectedIndex);
  };

  //create a content to pass to child component
  const passedContext: IMenuContext = {
    index: menuIndex,
    onSelect: menuItemSelectedHandler,
    mode: mode
  };

  // Making sure the received child element are MenuItem component 
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<IMenuItem>
      const {displayName} = childElement.type
      
      if(!displayName || ['MenuItem', 'SubMenu'].indexOf(displayName) < 0) return console.error("Warning: Child element must be MenuItem")

      return React.cloneElement(childElement, {index})
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <menuContext.Provider value={passedContext}>
        {renderChildren()}
      </menuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  mode: "horizontal",
  defaultIndex: 0,
};

export default Menu;
