# tistory

**Javascript** Tistory API package, Support **Node.js**, and **Browser**

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

with **bower**

```html
<body>
  <script src="bower_components/tistory/dist/tistory.js"></script>
</body>
```

or **cdn**

```html
<script src="https://unpkg.com/tistory"></script>
```

with **Node.js**

```javascript
const tistory = require('tistory');
```

# Getting Started

### with Browser

```javascript
if(location.hash) {
  const access_token = location.hash
    .split('#access_token=')[1]
    .split('&')[0],
  ;
  /** Getting Tistory Blog Info */
  Tistory.blog.info(access_token).then(({ data }) => {
    console.log(data);
  })
}
else {
  location.href = Tistory.auth.getPermissionUrl(
      '__TISTORY_CLIENT_ID__', 
      '__TISTORY_CALLBACK__',
      'token'
  );
}
```

### with Node.js

```javascript

const Tistory = require('tistory');

const http = require('http'),
      url = require('url')
;
http.createServer(async function(req, res) {
  let code = url.parse(req.url, true).query.code;
  if(code) {
    /** Getting access token */
    let response = await Tistory.auth.getAccessToken(
      '__TISTORY_CLIENT_ID__',
      '__TISTORY_CLIENT_SECRET__',
      '__TISTORY_CALLBACK__',
      code
    );
    let access_token = response.data.access_token;
    /** Getting Tistory Blog Info */
    Tistory.blog.info(access_token).then(({ data }) => {
      console.log(data);
    });
  }
  else {
    res.writeHead(302, {
      'Location': Tistory.auth.getPermissionUrl(
        '__TISTORY_CLIENT_ID__', 
        '__TISTORY_CALLBACK__', 
        'code'
    )});
  }
}).listen(80);
```

# Authentication

### Tistory.auth.getPermissionUrl(clientId, redirectUri, responseType, state = null): string

Return tistory permission Url for **Authorization**

### Tistory.auth.getAccessToken(clientId, clientSecret, redirectUri, code): AxiosPromise

Request ```https://www.tistory.com/oauth/access_token```

# Tistory API

### Tistory.__CATEGORY__.__METHOD__(access_token, options = {}): AxiosPromise

* access_token: string - Tistory Access Token
* options: object - Tistory api request parameters

### Usage

```javascript
Tistory.__CATEGORY__.__METHOD__(access_token, {
  /** Request Options */
})
.then(({ data }) => {
  /** ... */
})
.catch((e) => {
  /** ... */
});
```

### blog

|Name|description|
-----|-----------|
|**blog.info(access_token, options = {})**| Getting Tistory blog info

### category

|Name|description|
-----|-----------|
|**category.list(access_token, options = {})**| Getting Tistory category list

### comment

|Name|description|
-----|-----------|
|**comment.newest(access_token, options = {})**| Getting newest comments
|**comment.list(access_token, options = {})**| Getting comments list
|**comment.write(access_token, options = {})**| Writing a comment
|**comment.modify(access_token, options = {})**| Modifying a comment
|**comment.delete(access_token, options = {})**| Deleting a comment

### post

|Name|description|
-----|-----------|
|**post.list(access_token, options = {})**| Getting posts list
|**post.read(access_token,options = {})**| Reading a post
|**post.write(access_token, options = {})**| Writing a post
|**post.modify(access_token, options = {})**| Modifying a post
|**post.attach(access_token, options = {})**| Attaching a file

# Form Request

### post

```html
<!-- File Upload -->
<form id="form_request">
  <input type="hidden" name="blogName" value="__BLOG_NAME__">
  <input type="file" name="uploadedfile">
  <input type="submit">
</form>
```

```javascript
let form = document.getElementById('form_request');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  Tistory.post.attach(access_token, form).then(({ data }) => {
    console.log(data);
  });
});
```

# Reference

<https://tistory.github.io/document-tistory-apis/>