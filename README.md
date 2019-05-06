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
    .split('&')[0]
  ;
  /** Getting Tistory Blog Info */
  tistory.blog.info(access_token).then(({ data }) => {
    console.log(data);
  })
}
else {
  location.href = tistory.auth.getPermissionUrl(
      '__TISTORY_CLIENT_ID__', 
      '__TISTORY_CALLBACK__',
      'token'
  );
}
```

### with Node.js

```javascript

const tistory = require('tistory');

const http = require('http'),
      url = require('url')
;
http.createServer(async function(req, res) {
  let code = url.parse(req.url, true).query.code;
  if(code) {
    /** Getting access token */
    let response = await tistory.auth.getAccessToken(
      '__TISTORY_CLIENT_ID__',
      '__TISTORY_CLIENT_SECRET__',
      '__TISTORY_CALLBACK__',
      code
    );
    let access_token = response.data.access_token;
    /** Getting Tistory Blog Info */
    tistory.blog.info(access_token).then(({ data }) => {
      console.log(data);
    });
  }
  else {
    res.writeHead(302, {
      'Location': tistory.auth.getPermissionUrl(
        '__TISTORY_CLIENT_ID__', 
        '__TISTORY_CALLBACK__', 
        'code'
    )});
  }
  res.end();
}).listen(80);
```

# Authentication

### tistory.auth.getPermissionUrl(clientId: string, redirectUri: string, responseType: string, state: string = null)

Return tistory permission Url for **Authorization**

#### Parameters

* clientId: Tistory API client id
* redirectUri: Tistory API redirect uri
* responseType: 'code', or 'token'
* state: CSRF Token

#### Usage

```javascript
let redirectUrl = tistory.auth.getPermissionUrl(
  '__TISTORY_CLIENT_ID__', 
  '__TISTORY_CALLBACK__',
  'code'
);
```

### tistory.auth.getAccessToken(clientId: string, clientSecret: string, redirectUri: string, code: string)

Request ```https://www.tistory.com/oauth/access_token```

#### Parameters

* clientId: Tistory API client id
* clientSecret: Tistory API client secret
* redirectUri: Tistory API redirect uri
* code: Access Token request code

#### Usage

```javascript
let response = await tistory.auth.getAccessToken(
  '__TISTORY_CLIENT_ID__',
  '__TISTORY_CLIENT_SECRET__',
  '__TISTORY_CALLBACK__',
  code
);
```

# Tistory API

#### Parameters

* access_token: Tistory Access Token
* options: Tistory API request parameters

### tistory.blog.info(access_token: string, options: object = {})

Getting tistory blog info

#### Usage

```javascript
let response = await tistory.blog.info(access_token);
```

### tistory.category.list(access_token: string, options: object = {})

Getting Tistory category list

#### Usage

```javascript
let response = await tistory.category.list(access_token, {
  blogName: 'example'
});
```

### tistory.comment.newest(access_token: string, options: object = {})

Getting newest comments

#### Usage

```javascript
let response = await tistory.comment.newest(access_token, {
  blogName: 'example',
  page: '1',
  count: '10'
});
```

### tistory.comment.list(access_token: string, options: object = {})

Getting comments list

#### Usage

```javascript
let response = await tistory.comment.list(access_token, {
  blogName: 'example',
  postId: '1'
});
```

### tistory.comment.write(access_token, options: object = {})

Writing a comment

#### Usage

```javascript
let response = await tistory.comment.write(access_token, {
  blogName: 'example',
  postId: '1',
  content: 'Hello, world!'
});
```

### tistory.comment.modify(access_token: string, options: object = {})

Modifying a comment

#### Usage

```javascript
let response = await tistory.comment.modify(access_token, {
  blogName: 'example',
  postId: '1',
  commentId: '1',
  content: 'Hello, world!'
});
```

### tistory.comment.delete(access_token: string, options: object = {})

Deleting a comment

#### Usage

```javascript
let response = await tistory.comment.delete(access_token, {
  blogName: 'example',
  postId: '1',
  commentId: '1',
});
```

### tistory.post.list(access_token: string, options: object = {})

Getting posts list

#### Usage

```javascript
let response = await tistory.post.list(access_token, {
  blogName: 'example',
  page: '1'
});
```

### tistory.post.read(access_token: string, options: object = {})

Reading a post

#### Usage

```javascript
let response = await tistory.post.read(access_token, {
  blogName: 'example',
  postId: '1'
});
```

### tistory.post.write(access_token: string, options: object = {})

Writing a post

#### Usage

```javascript
let response = await tistory.post.write(access_token, {
  blogName: 'example',
  title: 'Hello, world!'
});
```

### tistory.post.modify(access_token: string, options: object = {})

Modifying a post

#### Usage

```javascript
let response = await tistory.post.modify(access_token, {
  blogName: 'example',
  postId: '1',
  title: 'Hello, world!'
})
```

### tistory.post.attach(access_token: string, options: object = {})

Attaching a file

#### Usage

```javascript
const fs = require('fs');

let response = await tistory.post.attach(access_token, {
  'blogName': 'example',
  'uploadedfile': fs.createReadStream('preview.jpg')
});
```

# with Form

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

  tistory.post.attach(access_token, form).then(({ data }) => {
    console.log(data);
  });
});
```

# Reference

<https://tistory.github.io/document-tistory-apis/>