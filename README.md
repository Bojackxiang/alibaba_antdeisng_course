## Why we need webpack: 
Since the broser cannot recognize the import and export, so it is a special environment. 

`npx webpack main.js` will generate a dist for broswer to use. 

then import the `dist/main.js` can run the import file successfully. 

As we using the module bundle, we can use the ES6 gammar in the broswer 

### Why we want to use the require rather than import by script. (WHy ES module is better than the commonJS)
The main reason is that the script can help us to have a small size file and we and load the component basing on our own demand. 

### How to transfer typescript file tp ES modules. 


### Now we need to export all our component from the index.tsx

### Now we need to build all our component, please check the new updated package,json commend for build project. 
Then, another part important is the tsconfig.build.json, this is a necessary file for us to build the project. 
then run the following commend, you will generate a build file in your root dir. 
`npm run build-ts`

### After this, we need to build the style files. 
run the following commend 
`node-sass ./src/styles/index.scss ./build/index.css`

Now, we just modified build commend, then we can run both of the commend at the same time. 

### update the newest link for the local usage 
you will have following link returned in your terminal 

then run the following 