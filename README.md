## Form component 
## Form 
- *Target 1 : Understand how the Omit works in the interface* 
- *Target 2: Understand the simulation of the events*
- *Target 3:  understand how the querySelector working for selecting classes (very simple user rather than others)*


Step 1 
Doing the following code, you will  find an error 
```typescript 
interface IForm extends InputHTMLAttributes<HTMLElement>{ 
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  style?: CSSProperties;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
```
The error is like the following 
```
Interface 'IForm' incorrectly extends interface 'InputHTMLAttributes<HTMLElement>'.
  Types of property 'size' are incompatible.
    Type '"lg" | "sm" | undefined' is not assignable to type 'number | undefined'.
      Type '"lg"' is not assignable to type 'number | undefined'.ts(2430)
```
The main reason is that we already have an size in out interface, but the InputHTMLAttribute<T> also has an size property, and they are conflict with each other;

Now we need to  use Omit to ignore the size in the HTML element , focus on the first line, you will notice
``` typescript
interface IForm extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{ 
... 
}

```

Another thing you probably want to take care of is the type if the triggered event, 
`onChange?: (e: ChangeEvent<HTMLInputElement>) => void;`
This is the line for the type of the event 

After this, you can check the finished code, since the input is not very hard, so in the next part, we will Starr the testing part .

## Part 2 Unit Test
### First one is test by event 
Before this we already used the ::fireEvent::, following are two examples 
```typescript
	  fireEvent.change(testNode, { target: { value: '23' } })
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(testNode.value).toEqual('23')

    fireEvent.change(testNode, { target: {value: "hello"}})
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(testNode.value).toBe("hello")

```

### Second One is test the attribute 
``` typescript
it('should render the disabled Input on disabled property', () => {
    const wrapper = render(<Form disabled placeholder="disabled"/>)
    const testNode = wrapper.getByPlaceholderText('disabled') as HTMLInputElement
    expect(testNode.disabled).toBeTruthy()
  })
```

###  Third One is test by classes 
``` typescript
  it('should render different input sizes on size property', () => {
    const wrapper = render(<Form placeholder="sizes" size="lg" />)
    const testContainer = wrapper.container.querySelector('.viking-input-wrapper')
    expect(testContainer).toHaveClass('input-size-lg')
  })

```

### The last one is to select by class name, and see if it has the required class names 
``` typescript
  it('should render prepand and append element on prepand/append property', () => {
    const {queryByText, container } = render(<Form placeholder="pend" prepend="https://" append=".com"/>)
    const testContainer = container.querySelector('.viking-input-wrapper')
    expect(testContainer).toHaveClass('input-group input-group-append input-group-prepend')
    expect(queryByText('https://')).toBeInTheDocument()
    expect(queryByText('.com')).toBeInTheDocument()
  })
```
In the last one, you need to understand the how querySelector works among the test 

### The update for the form
Form component (which is the *<InputHTMLAttributes<HTMLElement>*) has a property called defaultValue (Or you can see it as all the input as an defaultValue for the input),
Now we want to know user set an default value for the input, if so, we need to remove the default value 


### Auto-complete 
The target of this section is create an auto complete component basing on the form component

### Customized render item ✋
Complicated Data type declare : 
In the following situation, we are facing a problem, please check the following data structure 
```typescript
const data = {name: 'alex', age: 20}
```
This is very simple, the data type is as following 
`type dataTupe = {name: string, age: number}`
But we want the user to have more control of the data structure, what if his data is something like this 
```typescript
const data = {name: 'alex', age: 20, address: 'australia', code: '2000'}
```
To avoid give user a static data type we need a dynamic data structure 
```typescript 
type DataSource = {name: string'}
export type DataSourceType<T = {}> = T & DataSource 
```
We declare the T is an *object*, this is important,  and T And the DataSource are combined, now, let use is
```typescript 
type userInfo = { age: number, address: string, code: string}
const userInfo:DataSource<userInfo> = { // the data you want to filled }
```

### Async request for the auto complete 

### Debounce for the auto-complete 
During we use the useEffect, the return function in the useEffect (You can also see it as a clearer.), it will be triggered when the *useEffect triggered next time* 

You will find the code in the use Debounce hook, the key is *“Whether change the input value”*, and this will cause the fetch will triggered or not. 

### Keyboard event
The keyboard is simple, only need to care about the type of the event 
``` typescript
const keyboardTrigger = (e: KeyboardEvent<HTMLInputElement>) => {
	//	...... whatever you want to do here .
	console.log(e.keyCode)
}
```

### UseRef to handle multiple comparison between values 
Why it is important: It won’t change its value event after multiple re-rendering; 
Case 1: Use use ref as flag : boolean 

``` typescript
const triggered = useRef(boolran)
console.log(triggered.current) // present the value 
triggered.current = false 	  // change the ref value   
```

Case 2: Handing problem with Dom 
Now we need to hide the auto-complete component if we clicked out size of the component 