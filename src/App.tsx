import React from "react";
import { AppButton } from "./components/AppButton";
import { ButtonSize, ButtonType } from "./Enums/ButtonEnums";

interface IApp {}
export const App: React.FC<IApp> = ({}) => {
  return (
    <div>
      <AppButton>hello</AppButton>
      <br />

      <AppButton className={'test-classname'} disabled={true}>world</AppButton>
      <br />

      <AppButton className={'test-classname'} disabled={true}>world</AppButton>
      <br/>

      <AppButton size={ButtonSize.Large} btnType={ButtonType.Danger}>world</AppButton>
      <br/>

      <AppButton btnType={ButtonType.Link} disabled={true}>Link</AppButton>
      <AppButton btnType={ButtonType.Link} href="https://google.com">Link</AppButton>
      <br/>
    </div>
  );
};
