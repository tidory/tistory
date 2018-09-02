# tistory

Tistory API for **Client Side**

# Installation

with **Node.js**

```bash
npm install --save tistory
```

# Basic usage

```html
<button id="request">Request</button>
```

```javascript
const 
  tistory = require('tistory')
;
if(location.hash) {
  const 
    access_token = location.hash
      .split('#access_token=')[1]
      .split('&')[0],
    api = tistory(access_token)
  ;
  let reqeust = document.getElementById('request');
  reqeust.addEventListener('click', () => {
    api.post.list({
      blogName: 'example',
      output: 'json'
    }, (request) => {
      /** https://www.w3schools.com/js/js_ajax_http.asp */
      console.log(request.responseText);
    });
  });
}
```

# Methods

## Parameters

* options: object - Tistory api request parameters
* callback: Function - the function that will be called after request

## Usage

```javascript
const api = tistory(access_token);

api.__CATEGORY__.__METHOD__({
  /** Reqeust Options */
}, (request, aEvt) => {
  /** XMLHttpRequest.onload */
})
```

## Categories

### Tistory.blog

#### Methods

* Tistory.blog.info

### Tistory.post

#### Methods

* Tistory.post.list
* Tistory.post.write
* Tistory.post.modify
* Tistory.post.read
* Tistory.post.attach
* Tistory.post.delete

### Tistory.category

#### Methods

* Tistory.category.list

### Tistory.comment

#### Methods

* Tistory.comment.list
* Tistory.comment.newest
* Tistory.comment.write
* Tistory.comment.modify
* Tistory.comment.delete

### Tistory.guestbook

#### Methods

* Tistory.guestbook.list
* Tistory.guestbook.write
* Tistory.guestbook.modify
* Tistory.guestbook.delete

# Form Request

## post

```html
<!-- File Upload -->
<form method="POST" enctype="multipart/form-data" id="upload_form">
  <input type="hidden" name="blogName" value="__BLOG_NAME">
  <input type="file" name="uploadedfile">
  <input type="submit">
</form>
```

```javascript
let uploadForm = document.getElementById('upload_form');
uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  api.post.attach({
    form: uploadForm
  }, (request) => {
    console.log(request.responseText);
  });
});
```

## get

```html
<form method="GET" action="/" id="form_request">
  <input type="text" name="blogName" value="__BLOG_NAME__">
  <input type="hidden" name="output" value="json">
  <input type="submit">
</form>
```

```javascript
let form = document.getElementById('form_request');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  api.post.list({
    form: form
  }, (request) => {
    console.log(request.responseText);
  });
});
```

# License

MIT

Copyright (c) Mansu Jeong. All rights reserved.