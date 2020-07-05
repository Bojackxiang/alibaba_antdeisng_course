## Upload component

### Understanding the axios. (post and get)

### Understanding file uploading form by Axios

First, we need to optain the file by following code

```typescript
const file: FileList | null = e.target.files;
```

After the above line , we will have a file list, then we need to get the real file

```typescript
const uploadFile: File = file[0];
```

Now, we need to create a container for the file (Like we put water in a glass and deliver to a person)

```typescript
const formData = new FormData(); // we prepare a cup
formData.append(uploadFile.name, uploadFile); // we "append" water into the cup
```

Fianally, we can use the axios to upload our file

```typescript
Axios.post("https://jsonplaceholder.typicode.com/posts", formData, {
  headers: { "Content-Tyoe": "multipart/form-data" },
}).then((resp) => {
  console.log(resp);
});
```

Note: sometimes, we amy want a function to return a Promise data, beside using rxgs, we can just use the following
```javascript
return Promise.resolve([...])
```
Usually, return will only be a promise, but for new a promise, it is a constructor, so its different concept. 
One is just a promise, one is a new promise. So, here, we only need it to return a promise, rather than a new promise. 


## Adding beforeUploading and onChange functionalities

These two section is very easy, and you can check the code directly.

One thing need to pay attention to is that we can put a function into a setState function

```typescript
setState((prevState) => {
  // the prevState is the current value
  console.log(prevState, prevState + 1);
  return prevState + 1;
});
```

Be careful: if the state is same, the react will ignore it.
The orgithms they use is Object.is
For the object is,
you can check the following

```javascript
Object.is("foo", "foo"); // true
Object.is(window, window); // true

Object.is("foo", "bar"); // false
Object.is([], []); // false

var foo = { a: 1 };
var bar = { a: 1 };
Object.is(foo, foo); // true
Object.is(foo, bar); // false

Object.is(null, null); // true

// Special Cases
Object.is(0, -0); // false
Object.is(-0, -0); // true
Object.is(NaN, 0 / 0); // true
```

### Now we want to add more customized values for the upload component

### Now we adding an drag event for the component
In the following code, just need to pay attention for the 
1. "onDragOver"
2. "onDragLeave"
3. "onDrop"

```tsx
    
    <div className="viking-upload-component">
      <div
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
```

Then, we need to obtain the target file from the onDrop handler 

``` typescript
  const onDrophandler = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    const targetFileList = e.dataTransfer.files;
    console.log(targetFileList);
  };
```
Paying attention to the following line
`e.data.transfer.data`, you will get the target file, the obtain part is still a FileList type data. 