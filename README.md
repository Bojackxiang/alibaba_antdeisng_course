## part 1: Set up the component structure

targets:
1: understand different types of interface <br>
2: understand how to use the defaultProps for reach component <br>
3: understand how to use the className (package) for the component

Setting up the Menu and MenuItem. <br>

will only show the interface here;

```typescript
interface IMenu {
  defaultIndex?: number;
  className?: string;
  mode?: MenuModeType;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: number) => void;
  children?: React.ReactNode;
}
```

```typescript
interface IMenuItem {
  index?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
```

style: React.React.CSSProperties ; <br>
children: React.ReactNode;

## part 2: Using the context to pass variables and function from menu to menu item.

You need to create a context by createContext

```typescript
interface IMenuContext {
  index?: number;
  onSelect?: onSelectType;
}
export const menuContext = createContext<IMenuContext>({ index: 0 });
```

Note: Actually it dose not mater what you pass when you creating a context <br>

Then you need to reset the real variables and the function that you pass into context

```typescript
//create a content to pass to child component
const passedContext: IMenuContext = {
  index: menuIndex,
  onSelect: menuItemSelectedHandler,
};
```

lastly for you Menu component, wrap the component that you want to use the context <br>

```typescript
return (
  <ul className={classes} style={style}>
    <menuContext.Provider value={passedContext}>
      {children}
    </menuContext.Provider>
  </ul>
);
```

now, start to think about your child component, we need to get and use the function in the context

```typescript
const context = useContext(menuContext);
```

Now you can access to the variable and the function in your child component

## part 3: Testing

### Target 1: understand beforeEach function

### Target 2: understand the click event trigger function

In this section, we will start to test the menu element <br>
Different from before, we will add this line in the test file

```typescript
import "@testing-library/jest-dom/extend-expect"; // do it in this way
```

It can help you to avoid unnecessary setting up error. <br>

Before start testing, we need to render the menu component in the test with different interface values, following are horizontal and vertical example 
```typescript
const generalMenu: IMenu = {
  defaultIndex: 1,
  onSelect: jest.fn(),
  className: "test",
};

const verticalMenu: IMenu = {
  defaultIndex: 1,
  onSelect: jest.fn(),
  className: "test-vertical",
  mode: "vertical",
};

const appMenu = (props: IMenu) => {
  return (
    <Menu {...props}>
      <MenuItem index={1}>active</MenuItem>
      <MenuItem index={2} disabled={true}>
        disabled
      </MenuItem>
      <MenuItem index={3}>my</MenuItem>
    </Menu>
  );
};
```

In the describe function, for each test, we need to do the render and get the element, so we can use the beforeEach function;

```typescript
describe("Testing for menu and menu item", () => {
  beforeEach(() => {
    wrapper = render(appMenu(generalMenu));
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
    buttonItem = wrapper.getByText("my");
  }),
    test("render test", () => {
      /// ...
    });
});
```

Everything is similar with what we did before, but for the menu click, we need to trigger the clicked event 
```typescript
  test("click test", () => {
    fireEvent.click(buttonItem) // trigger the event before we start tot test

    expect(buttonItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')

    expect(generalMenu.onSelect).toHaveBeenCalledWith(3)
    // above mean the function is triggered with 3rd element 

    expect(generalMenu.onSelect).not.toHaveBeenCalledWith(1)
    expect(generalMenu.onSelect).not.toHaveBeenCalledWith(2)

  });
```
