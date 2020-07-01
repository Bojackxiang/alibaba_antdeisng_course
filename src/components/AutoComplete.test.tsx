import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, RenderResult, fireEvent, wait } from "@testing-library/react";
import AutoComplete, { IAutoComplete } from "./AutoComplete";
import { config } from "process";

const testArray = [
  { value: 11, name: "11" },
  { value: 22, name: "22" },
  { value: 33, name: "33" },
  { value: 44, name: "44" },
  { value: 55, name: "55" },
];
describe("If the component can render successfully", () => {
  test("if the test can run successfully", () => {
    expect(1 + 1).toBe(2);
  });
});
