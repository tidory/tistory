const axios = require('axios')
const queryString = require('query-string')
const Request = require('./src/request')

const tistory = {
  auth: {
    /** 티스토리 권한 요청 */
    getPermissionUrl (clientId, redirectUri, responseType, state = null) {
      const query = queryString.stringify({
        client_id: clientId,
        redirect_uri: redirectUri,
        state: state,
        response_type: responseType
      })
      return `https://www.tistory.com/oauth/authorize/?${query}`
    },
    getAccessToken (clientId, clientSecret, redirectUri, code) {
      return axios.get('https://www.tistory.com/oauth/access_token', {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          code: code,
          grant_type: 'authorization_code'
        }
      })
    }
  },
  blog: {
    /** 블로그 정보 API */
    info (accessToken, options = {}) {
      return Request.get(accessToken, '/blog/info', options)
    }
  },
  post: {
    /** 최근 게시글 목록 API */
    list (accessToken, options = {}) {
      return Request.get(accessToken, '/post/list', options)
    },
    /** 게시글 작성하기 API */
    write (accessToken, options = {}) {
      return Request.post(accessToken, '/post/write', options)
    },
    /** 게시글 수정하기 API */
    modify (accessToken, options = {}) {
      return Request.post(accessToken, '/post/modify', options)
    },
    /** 글 읽기 API */
    read (accessToken, options = {}) {
      return Request.get(accessToken, '/post/read', options)
    },
    /** 파일 첨부 API */
    attach (accessToken, options = {}) {
      return Request.post(accessToken, '/post/attach', options)
    }
  },
  category: {
    /** 카테고리 목록 API */
    list (accessToken, options = {}) {
      return Request.get(accessToken, '/category/list', options)
    }
  },
  comment: {
    /** 게시글 댓글 목록 API */
    list (accessToken, options = {}) {
      return Request.get(accessToken, '/comment/list', options)
    },
    /** 최근 댓글 목록 API */
    newest (accessToken, options = {}) {
      return Request.get(accessToken, '/comment/newest', options)
    },
    /** 댓글 작성 API */
    write (accessToken, options = {}) {
      return Request.post(accessToken, '/comment/write', options)
    },
    /** 댓글 수정 API */
    modify (accessToken, options = {}) {
      return Request.post(accessToken, '/comment/modify', options)
    },
    /** 댓글 삭제 API */
    delete (accessToken, options = {}) {
      return Request.post(accessToken, '/comment/delete', options)
    }
  }
}

/** only for Browser */
if (typeof window !== 'undefined' && window) {
  window.tistory = tistory
}

module.exports = tistory
