### Final Goal: create a button component 

### Sub-target 1 under stand how the sass and its features 

### Sub-target 2 Understand the test and how to test a component 

## Note
The react dose not support the SASS, so we need to use the node-sass 

``` javascript
npm install node-sass --save
```
or 
``` javascript
yarn add node-sass --save
```
in _variables.scss
``` scss
$gray-100: #f8f9fa !default;
```
<b>!default: When user have same parameter name, the new value wont add to the default value </b>
<br>
<b>当用户重新设定这个$grey-color值之后, 不会再重新赋值</b>

Interview Question: What is the different between the rm and rem ? 
https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units

### introduction to Normalize.css -- _reboot.css
https://necolas.github.io/normalize.css/

``` scss
%heading {
  margin-top: 0; // 1
  margin-bottom: $headings-margin-bottom;
  font-family: $headings-font-family;
  font-style: $headings-font-style;
  font-weight: $headings-font-weight;
  line-height: $headings-line-height;
  color: $headings-color;
}
h1 {
  @extend %heading;
  font-size: $h1-font-size;
}
```
@extend: combine different styles into one block
@extend: 将多个code组合到一个block中

## Scss 的import 命令
you don't need the under score when you import the scss value in the index.scss 
``` scss 
// config
@import "variables";

//layout
@import "reboot";

//mixin
@import "mixin";

// animation
@import "animation";
// button
```
You only need to do sth like above 
<br/>
the _ means the <b>partial</b>, you cannot use it in the read project, you can <b>only import</b> it 

<br>

```javascript 
import './styles/index.scss'
```
finally, import the index.scss in the index.tsx file, then you can try p tag, h1 tag and so on to test. 
<br>
the font should change 

## Started to work on the button.tsx component, you can check the component for code

## create a style for a component: button/_style.scss 

import the _style.scss into the index.scss 

## understand the @mixin in the scss 
create the _mixin.scss in the /styles
<br>
creating a mixin as an example. you can see it as a function 

```javascript 
@mixin button-size($padding-y, $padding-x, $font-size, $border-raduis) {
  padding: $padding-y $padding-x;
  font-size: $font-size;
  border-radius: $border-raduis;
}
```

the way to use it in the _styles.scss
``` javascript
.btn {
  @include button-size( $btn-padding-y,  $btn-padding-x,  $btn-font-size,  $border-radius);
}
```

you can see the @mixin and @include as a pair for using. 
and they can help you to reduce the repeating code. 


## the inner function of scss 
``` javascript
@mixin button-style(
  $hover-background: lighten($background, 7.5%),
  $hover-border: lighten($border, 10%),
) { 
  ...
}
```
you can see the lighten function the the @mixin to control the color. 

## expand the interface with native attributes （interface的扩展）
key point: intersection type 
```typescript
// 获取html element中所有的button的属性
type NativeBtnProps = React.ButtonHTMLAttributes<HTMLElement> & React.LinkHTMLAttributes<HTMLElement>
```
Above will give you the INTERSECTION of two different types
<br>
合并类型：将两种属性合并成一种属性 

## utilities type : help us to make type optional 

``` typescript 
type NativeButtonProps = IButton & React.ButtonHTMLAttributes<HTMLElement>
type NativeLinkProps = IButton & React.AnchorHTMLAttributes<HTMLElement>

type ButtonProps = Partial<NativeButtonProps & NativeLinkProps>

export const Button: React.FC<ButtonProps> = ({
}) => { ... } 
```
Reason to do this, we only need one of the NativeButtonProps or the NativeLinkProps for a button component 

### understand ...restProps for a function component 



