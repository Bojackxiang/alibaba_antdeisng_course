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
