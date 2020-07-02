import React, { useEffect, useState, ChangeEvent } from "react";
import Axios from "axios";

export interface IUpload {}

const Upload: React.FC<IUpload> = (props) => {
  const [title, setTitle] = useState<string>("");

  const postData = { title: "hello world", value: "this is a title" };

  useEffect(() => {
    // Axios.get("https://jsonplaceholder.typicode.com/posts/1", {
    //   headers: {
    //     'X-Requested-With':"XMLHttpRequest",
    //   },
    //   responseType: "json"
    // })
    Axios.post("https://jsonplaceholder.typicode.com/posts", postData).then(
      (resp) => {
        const title = resp.data.title;
        setTitle(title);
      }
    );
  }, []);

  const {} = props;

  const _fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: FileList | null = e.target.files;
    if (file) {
      const uploadFile: File = file[0];

      const formData = new FormData();
      formData.append(uploadFile.name, uploadFile);
      Axios.post("https://jsonplaceholder.typicode.com/posts", formData, {
        headers: { "Content-Tyoe": "multipart/form-data" },
      }).then((resp) => {
        console.log(resp);
      });
    }
  };

  return (
    <div>
      <input type="file" name="myFile" onChange={_fileChangeHandler} />
    </div>
  );
};

export default Upload;
