import React from 'react'
import {render} from '@testing-library/react'
import { AppButton } from "./AppButton";


describe("Is the button can rendered", () => {
  test("should rendered a default button ", () => {
    // render the component 
    const wrapper = render(<AppButton>hello</AppButton>)
    const element = wrapper.getByText("hello"); 
    
    // validation 1
    expect(element).toBeInTheDocument();
    
    // validation 2
    expect(element.tagName).toEqual("BUTTON") // Will transfer into upper case 

    // validation 3
    expect(element).toHaveClass("btn")

  });

  test("should rendered a component with correct props", () => {

  }); 

  test("should rendered a link component", () => {

  })
})


 