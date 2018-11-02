# tistory

Tistory API for **Client Side**

# Installation

### Bower

```bash
bower install tistory --save
```

### Node.js

```bash
npm install --save tistory
```

# Includes

```html
<body>
  <script src="bower_components/tistory/dist/tistory.min.js"></script>
</body>
```
or,

```javascript
const tistory = require('tistory');
```

# Getting Started

```html
<button id="request">Request</button>
```

```javascript
if(location.hash) {
  const 
    access_token = location.hash
      .split('#access_token=')[1]
      .split('&')[0],
    api = tistory(access_token)
  ;

  let reqeust = document.getElementById('request');

  reqeust.addEventListener('click', () => {
    api.post.list((post) => {
      console.log(post.totalCount);
    }, { blogName: '__BLOG_NAME__' });
  });
}
```

# Methods

### Parameters

* callback: Function - the function that will be called after request
* options: object - Tistory api request parameters

### Usage

```javascript
const api = tistory(access_token);

api.__CATEGORY__.__METHOD__((response) => {
  /** XMLHttpRequest.onload */
}, {
  /** Reqeust Options */
})
```

### blog

|Name|description|
-----|-----------|
|**blog.info(callback = new Function(), options = {})**| Getting Tistory blog info

### category

|Name|description|
-----|-----------|
|**category.list(callback = new Function(), options = {})**| Getting Tistory category list

### comment

|Name|description|
-----|-----------|
|**comment.newest(callback = new Function(), options = {})**| Getting newest comments
|**comment.list(callback = new Function(), options = {})**| Getting comments list
|**comment.write(callback = new Function(), options = {})**| Writing a comment
|**comment.modify(callback = new Function(), options = {})**| Modifying a comment
|**comment.delete(callback = new Function(), options = {})**| Deleting a comment

### post

|Name|description|
-----|-----------|
|**post.list(callback = new Function(), options = {})**| Getting posts list
|**post.read(callback = new Function(),options = {})**| Reading a post
|**post.write(callback = new Function(), options = {})**| Writing a post
|**post.modify(callback = new Function(), options = {})**| Modifying a post
|**post.attach(callback = new Function(), options = {})**| Attaching a file

# Form Request

### post

```html
<!-- File Upload -->
<form method="POST" enctype="multipart/form-data" id="upload_form">
  <input type="hidden" name="blogName" value="__BLOG_NAME__">
  <input type="file" name="uploadedfile">
  <input type="submit">
</form>
```

```javascript
let uploadForm = document.getElementById('upload_form');

uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  api.post.attach((file) => {
    console.log(file.url);
  }, { form: uploadForm });
});
```

### get

```html
<form method="GET" action="/" id="form_request">
  <input type="text" name="blogName" value="__BLOG_NAME__">
  <input type="submit">
</form>
```

```javascript
let form = document.getElementById('form_request');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  api.post.list((post) => {
    console.log(post.totalCount);
  }, { form: form });
});
```

# Reference

<https://tistory.github.io/document-tistory-apis/>