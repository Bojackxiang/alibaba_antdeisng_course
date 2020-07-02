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
