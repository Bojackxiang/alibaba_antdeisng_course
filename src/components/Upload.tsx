import React, {
  useEffect,
  useState,
  ChangeEvent,
  useRef,
  DragEvent,
} from "react";
import Axios from "axios";

export interface IUpload {
  action: string;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onChange?: (file: File) => void;
  header?: { [key: string]: string }; //customized header
  name?: string;
  data?: string;
  withCrediential?: boolean;
  drag?: boolean;
}

const Upload: React.FC<IUpload> = (props) => {
  const {
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    header,
    name,
    data,
    withCrediential,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string | []>("");
  const [isDragOver, setIsDragOver] = useState(false);

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

  const _clickHandler = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const _fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList | null = e.target.files;
    if (!fileList) return;

    // -> get the file
    uploadFiles(fileList);

    // -> reset inputRef
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const uploadFiles = (fileList: FileList) => {
    const postData = Array.from(fileList);

    // -> Putting water (data) into the cup (FormData)
    postData.forEach((file) => {
      if (!beforeUpload) {
        uploadFile(file);
      } else {
        const result = beforeUpload(file);

        if (!result || !(result instanceof Promise)) return;

        result.then((processedFile) => {
          uploadFile(processedFile);
        });
      }

      if (onChange) {
        onChange(file);
      }
    });
  };

  const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append(name || file.name, file);
    if (data) {
      Object.keys(data).forEach((key: any) => {
        formData.append(key, data[key]);
      });
    }

    // -> start to upload file to the target website
    Axios.post("https://jsonplaceholder.typicode.com/posts/", formData, {
      headers: {
        ...header,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: withCrediential,
      onUploadProgress: (e: any) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0;
        if (percentage < 100) {
          if (onProgress) {
            onProgress(percentage, file);
          }
        }
      },
    })
      .then((resp) => {
        if (onSuccess) {
          onSuccess(resp.data, file);
        }
      })
      .catch((e) => {
        if (onError) {
          onError(e.message, file);
        }
      });
  };

  const drager = (e: DragEvent<HTMLElement>, param: boolean) => {
    e.preventDefault();
    setIsDragOver(() => {
      return param;
    });
  };

  const onDrophandler = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    const targetFileList = e.dataTransfer.files;
    console.log(targetFileList);
  };

  return (
    <div className="viking-upload-component">
      <div
        style={{ width: 200, height: 200, background: "pink" }}
        onDragOver={(e: DragEvent<HTMLElement>) => {
          drager(e, true);
        }}
        onDragLeave={(e: DragEvent<HTMLElement>) => {
          drager(e, false);
        }}
        onDrop={(e: DragEvent<HTMLElement>) => {
          onDrophandler(e);
        }}
      >
        <h2>{isDragOver ? "true" : "false"}</h2>
      </div>
      <button onClick={_clickHandler}>upload file</button>
      <input
        style={{ display: "none" }}
        type="file"
        ref={inputRef}
        onChange={_fileChangeHandler}
      />
    </div>
  );
};

Upload.defaultProps = {
  name: "default file name",
  drag: false,
};

export default Upload;
