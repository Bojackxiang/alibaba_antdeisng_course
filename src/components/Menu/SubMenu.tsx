import React, { useContext, useState } from "react";
import classNames from "classnames";
import { menuContext } from "./Menu";
import { IMenuItem } from "./MenuItem";

interface ISubMenu {
  index?: number;
  title: string;
  className?: string;
  children: React.ReactNode;
}
const SubMenu: React.FC<ISubMenu> = (props) => {
  const { index, title, className, children } = props;

  // the state of the component
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // receive the context from the menu
  const subMenuContext = useContext(menuContext);

  // class names
  const classes = classNames("menu-item", "submenu-item", className, {
    "is-active": subMenuContext.index === index,
    "is-opened": isMenuOpen,
  });

  // triggered when use clicked the sub menu title
  const handleClicked = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };


  // the child element must be menuItem
  const renderChildren = () => {
    const menuClasses = classNames("viking-submenu", {
      "menu-opened": isMenuOpen,
    });

    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<IMenuItem>;
      const { displayName } = childElement.type;

      if (displayName && ["MenuItem", "SubMenu"].indexOf(displayName) < 0)
        return console.error("Warning: Child element must be MenuItem");

      return React.cloneElement(childElement, { index });
    });

    return <ul className={menuClasses}>{childrenComponent}</ul>;
  };

  return (
    <li key={index} className={classes}>
      <div className="submenu-title" onClick={handleClicked}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.defaultProps = {};

SubMenu.displayName = "SubMenu";

export default SubMenu;
