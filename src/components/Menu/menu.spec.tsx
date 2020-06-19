import React from "react";
import { render, RenderResult } from "@testing-library/react";


import Menu, { IMenu } from "./Menu";
import MenuItem from "./MenuItem";

const generalMenu: IMenu = {
  defaultIndex: 1,
  onSelect: jest.fn(),
  className: "test",
};

const verticalMenu: IMenu = {
  defaultIndex: 1,
  onSelect: jest.fn(),
  className: "test",
  mode: "vertical",
};

const appMenu = (props: IMenu) => {
  return (
    <Menu {...props}>
      <MenuItem index={1}>active</MenuItem>
      <MenuItem index={2} disabled={true}>
        disabled
      </MenuItem>
    </Menu>
  );
};

let wrapper: RenderResult, 
  menuElement: HTMLElement,
  activeElement,
  disabledElement;

describe("Testing for menu and menu item", () => {
  beforeEach(() => {
    wrapper = render(appMenu(generalMenu));
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  }),


    test("render test", () => {
      expect(menuElement)

      expect(wrapper.findAllByTestId.length).toEqual(3)
      expect(menuElement.getElementsByTagName("li").length).toEqual(2)
      expect(menuElement.getElementsByTagName("ul").length).toEqual(0) 

      // the above result is 0, is because it will only get the child element 
      expect(wrapper.findAllByTestId.length).toEqual(3)
      // the reason for above is 3 is because we cannot access to the ul, we only can get the child component in this way .

    });

  test("click test", () => {});

  test("vertical class test ", () => {});
});
