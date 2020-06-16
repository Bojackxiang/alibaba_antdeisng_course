import React from "react";
import { Button } from "./components/Button";
import { ButtonSize, ButtonType } from "./Enums/ButtonEnums";

interface IApp {}
export const App: React.FC<IApp> = ({}) => {
  return (
    <div>
      <Button>hello</Button>
      <br />

      <Button className={'test-classname'} disabled={true}>world</Button>
      <br />

      <Button className={'test-classname'} disabled={true}>world</Button>
      <br/>

      <Button size={ButtonSize.Large} btnType={ButtonType.Danger}>world</Button>
      <br/>

      <Button btnType={ButtonType.Link} disabled={true}>Link</Button>
      <Button btnType={ButtonType.Link} href="https://google.com">Link</Button>
      <br/>
    </div>
  );
};
