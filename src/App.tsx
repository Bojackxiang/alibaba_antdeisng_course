import React from "react";
import Upload from "./components/Upload";

interface IApp {}
export const App: React.FC<IApp> = ({}) => {
  const onSuccess = (result: any, file: File) => {
    console.log("Success!");
    console.log(result);
  };

  const onError = (error: any, file: File) => {
    console.log('failure')
    console.log(error);
  };

  const onProgress = (progress: number, file: File) => {
    console.log(progress);
  };

  const beforeUpload = (file: File) => {
    if (file.size / 1024 > 50) {
      alert("file is to big");
      return false; 
    } else {
      return Promise.resolve(file);
    }
  };

  return (
    <div>
      <Upload
        onProgress={onProgress}
        onSuccess={onSuccess}
        onError={onError}
        beforeUpload={beforeUpload}
        action="string"

      />
    </div>
  );
};
