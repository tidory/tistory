# Tistory API for javascript

**Javascript** Tistory API package, Support **Node.js**, and **Browser**

## Installation

```bash
npm install --save tistory
```

or **cdn**

```html
<script src="https://unpkg.com/tistory"></script>
```

## Getting Started

### with Browser

```javascript
if (location.hash) {
  const accessToken = location.hash
    .split('#access_token=')[1]
    .split('&')[0]

  tistory.blog.info(accessToken).then(({ data }) => {
    console.log(data)
  })
} else {
  location.href = tistory.auth.getPermissionUrl(
    '__TISTORY_CLIENT_ID__',
    '__TISTORY_CALLBACK__',
    'token'
  )
}
```

### with Node.js

```javascript
const tistory = require('tistory')

const http = require('http')
const url = require('url')

http.createServer(async function (req, res) {
  const code = url.parse(req.url, true).query.code
  if (code) {
    /** Getting access token */
    const response = await tistory.auth.getAccessToken(
      '__TISTORY_CLIENT_ID__',
      '__TISTORY_SECRET_KEY__',
      '__TISTORY_CALLBACK__',
      code
    )
    const accessToken = response.data.access_token

    /** Getting Tistory Blog Info */
    const { data } = await tistory.blog.info(accessToken)
    console.log(data)
  } else {
    res.writeHead(302, {
      Location: tistory.auth.getPermissionUrl(
        '__TISTORY_CLIENT_ID__',
        '__TISTORY_CALLBACK__',
        'code'
      )
    })
  }
  res.end()
}).listen(8080)
```

## Authentication

### tistory.auth.getPermissionUrl(clientId: string, redirectUri: string, responseType: string, state: string = null)

Return tistory permission Url for **Authorization**

* clientId: Tistory API client id
* redirectUri: Tistory API redirect uri
* responseType: 'code', or 'token'
* state: CSRF Token

```javascript
tistory.auth.getPermissionUrl(
  '__TISTORY_CLIENT_ID__',
  '__TISTORY_CALLBACK__',
  'code'
)
```

### tistory.auth.getAccessToken(clientId: string, clientSecret: string, redirectUri: string, code: string)

Request ```https://www.tistory.com/oauth/accessToken```

* clientId: Tistory API client id
* clientSecret: Tistory API client secret
* redirectUri: Tistory API redirect uri
* code: Access Token request code

```javascript
tistory.auth.getAccessToken(
  '__TISTORY_CLIENT_ID__',
  '__TISTORY_CLIENT_SECRET__',
  '__TISTORY_CALLBACK__',
  code
)
```

## Tistory API

* accessToken: Tistory Access Token
* options: Tistory API request parameters

### tistory.blog.info(accessToken: string, options: object = {})

Getting tistory blog info

```javascript
tistory.blog.info(accessToken)
```

### tistory.category.list(accessToken: string, options: object = {})

Getting Tistory category list

```javascript
tistory.category.list(accessToken, {
  blogName: 'example'
})
```

### tistory.comment.newest(accessToken: string, options: object = {})

Getting newest comments

```javascript
tistory.comment.newest(accessToken, {
  blogName: 'example',
  page: '1',
  count: '10'
})
```

### tistory.comment.list(accessToken: string, options: object = {})

Getting comments list

```javascript
tistory.comment.list(accessToken, {
  blogName: 'example',
  postId: '1'
})
```

### tistory.comment.write(accessToken, options: object = {})

Writing a comment

```javascript
tistory.comment.write(accessToken, {
  blogName: 'example',
  postId: '1',
  content: 'Hello, world!'
})
```

### tistory.comment.modify(accessToken: string, options: object = {})

Modifying a comment

```javascript
tistory.comment.modify(accessToken, {
  blogName: 'example',
  postId: '1',
  commentId: '1',
  content: 'Hello, world!'
})
```

### tistory.comment.delete(accessToken: string, options: object = {})

Deleting a comment

```javascript
tistory.comment.delete(accessToken, {
  blogName: 'example',
  postId: '1',
  commentId: '1',
})
```

### tistory.post.list(accessToken: string, options: object = {})

Getting posts list

```javascript
tistory.post.list(accessToken, {
  blogName: 'example',
  page: '1'
})
```

### tistory.post.read(accessToken: string, options: object = {})

Reading a post

```javascript
tistory.post.read(accessToken, {
  blogName: 'example',
  postId: '1'
})
```

### tistory.post.write(accessToken: string, options: object = {})

Writing a post

```javascript
tistory.post.write(accessToken, {
  blogName: 'example',
  title: 'Hello, world!'
})
```

### tistory.post.modify(accessToken: string, options: object = {})

Modifying a post

```javascript
tistory.post.modify(accessToken, {
  blogName: 'example',
  postId: '1',
  title: 'Hello, world!'
})
```

### tistory.post.attach(accessToken: string, options: object = {})

Attaching a file

```javascript
const fs = require('fs')

let response = await tistory.post.attach(accessToken, {
  'blogName': 'example',
  'uploadedfile': fs.createReadStream('preview.jpg')
})
```

Also, you can use ```Form``` request.

```html
<!-- File Upload -->
<form id="form_request">
  <input type="hidden" name="blogName" value="__BLOG_NAME__">
  <input type="file" name="uploadedfile">
  <input type="submit">
</form>
```

```javascript
const form = document.getElementById('form_request')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  tistory.post.attach(accessToken, form).then(({ data }) => {
    console.log(data)
  })
})
```

## License

[MIT](https://github.com/tidory/tistory/blob/master/LICENSE)

Copyright 2018-2020. [SangWoo Jeong](https://github.com/pronist). All rights reserved.
