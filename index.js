const axios = require('axios'),
      queryString = require('query-string'),
      Request = require('./src/request')
;

const Tistory = {
  auth: {
    /** 티스토리 권한 요청 */
    getPermissionUrl(clientId, redirectUri, responseType, state = null) {
      let query = queryString.stringify({
          'client_id': clientId,
          'redirect_uri': redirectUri,
          'state': state,
          'response_type': responseType
      });
      return `https://www.tistory.com/oauth/authorize/?${query}`;
    },
    getAccessToken(clientId, clientSecret, redirectUri, code) {
       return axios.get('https://www.tistory.com/oauth/access_token', {
        params: {
          'client_id': clientId,
          'client_secret': clientSecret,
          'redirect_uri': redirectUri,
          'code': code,
          'grant_type': 'authorization_code'
        }
      });
    }
  },
  blog: {
    /** 블로그 정보 API */
    info(access_token, options = {}) {
      return Request.get(access_token, "/blog/info", options)
    }
  },
  post: {
    /** 최근 게시글 목록 API */
    list(access_token, options = {}) {
      return Request.get(access_token, "/post/list", options)
    },
    /** 게시글 작성하기 API */
    write(access_token, options = {}) {
      return Request.post(access_token, "/post/write", options)
    },
    /** 게시글 수정하기 API */
    modify(access_token, options = {}) {
      return Request.post(access_token, "/post/modify", options)
    },
    /** 글 읽기 API */
    read(access_token, options = {}) {
      return Request.get(access_token, "/post/read", options)
    },
    /** 파일 첨부 API */
    attach(access_token, options = {}) {
      return Request.post(access_token, "/post/attach", options)
    },
  },
  category: {
    /** 카테고리 목록 API */
    list(access_token, options = {}) {
      return Request.get(access_token, "/category/list", options)
    },
  },
  comment: {
    /** 게시글 댓글 목록 API */
    list(access_token, options = {}) {
      return Request.get(access_token, "/comment/list", options)
    },
    /** 최근 댓글 목록 API */
    newest(access_token, options = {}) {
      return Request.get(access_token, "/comment/newest", options)
    },
    /** 댓글 작성 API */
    write(access_token, options = {}) {
      return Request.post(access_token, "/comment/write", options)
    },
    /** 댓글 수정 API */
    modify(access_token, options = {}) {
      return Request.post(access_token, "/comment/modify", options)
    },
    /** 댓글 삭제 API */
    delete(access_token, options = {}) {
      return Request.post(access_token, "/comment/delete", options)
    }
  }
};

/** only for Browser */
if(typeof window !== 'undefined' && window) {
  window.Tistory = Tistory;
}

module.exports = Tistory;