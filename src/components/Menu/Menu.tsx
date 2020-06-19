import React, { createContext, useState } from "react";
import classNames from "classnames";
import { onSelectType } from "../../Types/onSelectType";
import { MenuModeType } from "../../Types/MenuModeType";

interface IMenuContext {
  index?: number;
  onSelect?: onSelectType;
}
export const menuContext = createContext<IMenuContext>({ index: 0 });

interface IMenu {
  defaultIndex?: number;
  className?: string;
  mode?: MenuModeType | undefined | null;
  style?: React.CSSProperties;
  onSelect?: onSelectType; // user defined function 
  children?: React.ReactNode;
}
const Menu: React.FC<IMenu> = (props: IMenu) => {
  const { defaultIndex, className, mode, style, onSelect, children } = props;

  // set the classes for the menu
  const classes = classNames("menu", classNames, {
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
  };

  return (
    <ul className={classes} style={style}>
      <menuContext.Provider value={passedContext}>
        {children}
      </menuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  mode: "horizontal",
  defaultIndex: 1,
};

export default Menu;
