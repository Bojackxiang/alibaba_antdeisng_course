import React, { useEffect, useState } from "react";
import Axios from "axios";

export interface IUpload {}

const Upload: React.FC<IUpload> = (props) => {
  const [title, setTitle] = useState<string>("")

  const postData = {title: 'hello world', value: "this is a title"}

  useEffect(() => {
    // Axios.get("https://jsonplaceholder.typicode.com/posts/1", {
    //   headers: {
    //     'X-Requested-With':"XMLHttpRequest",
    //   },
    //   responseType: "json"
    // })
    Axios.post('https://jsonplaceholder.typicode.com/posts', postData)
    .then((resp) => {
      const title = resp.data.title
      setTitle(title)
    });
  }, []);

  const {} = props;

return <div>{title}</div>;
};

export default Upload;
;
