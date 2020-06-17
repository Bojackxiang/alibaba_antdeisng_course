## Part 1: using jest in the for the button

<b>Jest is embedded in the react project\* so, you do not need to reinstall it. </b>

create a file with jest.test.js, and you can run it with,

```javascript
npx test jest.test.js
```

the jest will go and find your file automatically

you can find the detail test code in the button.test.js

following are four basic testing case

```javascript
/**
 * sample test
 */
test("common matcher", () => {
  expect(2 + 2).toBe(4);
  expect(1 + 1).not.toBe(1);
});

test("true and false", () => {
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
});

test("less and greater", () => {
  expect(4).toBeGreaterThan(1);
  expect(1).toBeLessThan(2);
});

test("compare object", () => {
  expect({ name: "alex" }).toEqual({ name: "alex" });
});
```

you can also use the following code

```
npm test jest.test.js --watch
```

it will keep watching the changes in the test file

### note:

tobe is exactly same, which means the reference is same. So, the type object is not suitable for tobe(). Now, we need the to equal

## Part 2: install the react testing library (if you are using the new version, its then unnecessary)

we will use the testing library to do the unit test

```
npm install --save-dev @testing-library/react
```

now, you can write you first element testing code

```javascript
import React from "react";
import { render } from "@testing-library/react";
import { Button } from "./Button";

test("First test for button", () => {
  const wrapper = render(<Button>hello</Button>);
  const element = wrapper.queryByText("hello");

  expect(element).toBeTruthy();
});
```

_for the above code, you need to understand the render. Render will render a component._

and run with

```javascript
npm test
```

## part 3: for more action and assertion , we need the jest-dom

usually, you will find the "@testing-library/jest-dom" in you package.json

create a setUpTests.ts under src with following code.

```javascript
import "@testing-library/jest-dom/extend-expect";
```

Then you will find you have more method in the test.tsx file

now, we can put the test inside of a describe function, and use the jest-dom to do the test.

```javascript
describe("Is the button can rendered", () => {
  test("should rendered a default button ", () => {
    // render the component
    const wrapper = render(<AppButton>hello</AppButton>);
    const element = wrapper.getByText("hello");

    // validation 1
    expect(element).toBeInTheDocument();

    // validation 2
    expect(element.tagName).toEqual("BUTTON"); // ! Will transfer into upper case

    // validation 3
    expect(element).toHaveClass("btn");
  });

  test("should rendered a component with correct props", () => {});

  test("should rendered a link component", () => {});
});
```

understand the expect().toBeInTheDocument(); expect(.tagName).toEqual("..."); expect().toHaveClass("...")
