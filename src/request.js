const axios = require('axios'),
      queryString = require('query-string')
;

const axiosInstance = axios.create({
  baseURL: 'https://www.tistory.com/apis/'
})

function Request() {
  /** empty */
}

/**
 * 'get' request
 * 
 * @param {string} access_token - Tistory Access_token
 * @param {string} url - Request url
 * @param {Object} options - Params
 */
Request.get = function(access_token, url, options) {
  return axiosInstance.get(url, {
    params: Object.assign({ 
      'access_token': access_token,
      'output': 'json'
    }, options)
  })
  .catch(function(e) { console.log(e) });
}

/**
 * 'post' request
 * 
 * @param {string} access_token - Tistory Access_token
 * @param {string} url - Request url
 * @param {Object} options - Params
 */
Request.post = function(access_token, url, options) {
  const request = function(data, axiosConfig = {}) {
    return axiosInstance.post(
      url,
      data, 
      axiosConfig
    ).catch(function(e) { console.log(e) });
  }
  const form = function() {
    let formData = null;

    /** only for Browser */
    if(typeof window !== 'undefined' && window) {
      formData = new FormData(options);
    }
    else if(typeof process !== 'undefined' && process) {
      const FormData = require('form-data');
      formData = new FormData();
      for(let key in options) {
        formData.append(key, options[key]);
      }
    }
    /** add access_toekn to form */
    formData.append('access_token', access_token);
    formData.append('output', 'json');

    return formData;
  }
  /** only for Browser */
  if(typeof window !== 'undefined' && window) {
    /** form */
    if(options instanceof Element && options.tagName === 'FORM') {
      return request(form());
    }
    else {
      return request(queryString.stringify(
        Object.assign({
          'access_token': access_token,
          'output': 'json'
        }, options)
      ));
    }
  }
  /** node.js */
  else if(typeof process !== 'undefined' && process) {
    const formData = form();
    return request(formData, {
      headers: formData.getHeaders()
    });
  }
  return false
}

module.exports = Request;