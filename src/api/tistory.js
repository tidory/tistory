const request = require('../classes/request');

/**
 * convert to API Object
 * 
 * @param {string} access_token - tistory access_token
 * @param {Object} configs - api configs
 * 
 * @return {Object}
 */
function convertToApiObject(access_token, configs) {
  let apis = new Object();
  Object.keys(configs).forEach(function(key) {
    eval(`apis.${key} = new Object()`);
    Object.keys(eval(`configs.${key}`)).forEach(function(service) {
      eval(`apis.${key}.${service} = function(callback = new Function(), options = {}) {
        request(access_token, "/${key}/${service}", new Object({
          method: configs.${key}.${service}.method,
          onResponse: callback
        }), options)
      };`);
    });
  });
  return apis;
}

/**
 * return Tistory API Object
 * 
 * @param {string} access_token - tistory access_token
 * 
 * @return {Object}
 */
function tistory(access_token) {
  let configs = new Object({
    /** 티스토리 블로그 API */
    blog: {
      /** 블로그 정보 API */
      info:   { method: 'get' }
    },
    /** 티스토리 게시글 API */
    post: {
      /** 최근 게시글 목록 API */
      list:   { method: 'get' },
      /** 게시글 작성하기 API */
      write:  { method: 'post' },
      /** 게시글 수정하기 API */
      modify: { method: 'post' },
      /** 글 읽기 API */
      read:   { method: 'get' },
      /** 파일 첨부 API */
      attach: { method: 'post' }
    },
    /** 티스토리 카테고리 API */
    category: {
      /** 카테고리 목록 API */
      list:   { method: 'get' }
    },
    /** 티스토리 댓글 API */
    comment: {
      /** 게시글 댓글 목록 API */
      list:   { method: 'get' },
      /** 최근 댓글 목록 API */
      newest: { method: 'get' },
      /** 댓글 작성 API */
      write:  { method: 'post' },
      /** 댓글 수정 API */
      modify: { method: 'post' },
      /** 댓글 삭제 API */
      delete: { method: 'post' }
    }
  });
  return convertToApiObject(access_token, configs);
}

module.exports = tistory;