import React from "react";
import { render, RenderResult, fireEvent, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'; // do it in this way 


import Menu, { IMenu } from "./Menu";
import MenuItem from "./MenuItem";

const generalMenu: IMenu = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test",
};

const verticalMenu: IMenu = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test-vertical",
  mode: "vertical",
};

const appMenu = (props: IMenu) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled={true}>
        disabled
      </MenuItem>
      <MenuItem>my</MenuItem>
      {/* <li>no</li> */}
    </Menu>
  );
};

let wrapper: RenderResult, 
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  buttonItem:HTMLElement,
  verticalWrapper:RenderResult,
  verticalElement:HTMLElement,
  disabledElement: HTMLElement;


describe("Testing for menu and menu item", () => {
  beforeEach(() => {
    wrapper = render(appMenu(generalMenu));
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
    buttonItem = wrapper.getByText('my');
  }),

    test("render test", () => {

      expect(wrapper.findAllByTestId.length).toEqual(3)
      expect(menuElement.getElementsByTagName("li").length).toEqual(3)
      expect(menuElement.getElementsByTagName("ul").length).toEqual(0) 

      expect(menuElement).toBeInTheDocument();
      
      // the above result is 0, is because it will only get the child element 
      expect(wrapper.findAllByTestId.length).toEqual(3)
      // the reason for above is 3 is because we cannot access to the ul, we only can get the child component in this way .

      expect(activeElement).toHaveClass("menu-item is-active") // test class 

    });

  test("click test", () => {
    fireEvent.click(buttonItem)

    expect(buttonItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')

    expect(generalMenu.onSelect).toHaveBeenCalledWith(2)
    // above mean the function is triggered with 3rd element 

  });

  test("vertical class test ", () => {
    cleanup()
    verticalWrapper = render(appMenu(verticalMenu));
    verticalElement = verticalWrapper.getByTestId("test-menu");

    expect(verticalElement).toHaveClass("menu-vertical")
    
  });
});
