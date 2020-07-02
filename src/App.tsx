import React from "react";
import Upload from "./components/Upload";

interface IApp {}
export const App: React.FC<IApp> = ({}) => {
  return (
    <div>
      <Upload/>
    </div>
  );
};
