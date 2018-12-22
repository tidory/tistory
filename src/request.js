const axios = require('axios'),
      queryString = require('query-string'),
      serialize = require('form-serialize')
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
  const request = function(appendParams) {
    return axiosInstance
      .get(url, {
        params: Object.assign({ 
          'access_token': access_token,
          'output': 'json'
        }, appendParams)
      })
      .catch(function(e) { console.log(e) })
    ;
  }
  try {
    /** only for Browser */
    if(window !== undefined && window) {
        /** form */
        if(options instanceof Element && options.tagName === 'FORM') {
          return request(queryString.parse(serialize(options)));
        }
        else {
          return request(options);
        }
    }
  }
  catch(e) {
    try {
      /** node.js */
      if(process !== undefined && process) {
        return request(options);
      }
    }
    catch(e) {
      /** when it's not node.js, just exception from browser */
      console.log(e);
    }
  }
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
    return axiosInstance.post(url, data, axiosConfig).catch(function(e) { console.log(e) });
  }
  const form = function() {
    let formData = null;
    try {
      /** only for Browser */
      if(window !== undefined && window) {
        formData = new FormData(options);
      }
    }
    catch(e) {
      /** node.js */
      if(process !== undefined && process) {
        const FormData = require('form-data');
        formData = new FormData();
        for(let key in options) {
          formData.append(key, options[key]);
        }
      }
    }
    finally {
      /** add access_toekn to form */
      formData.append('access_token', access_token);
      formData.append('output', 'json');

      return formData;
    }
  }
  try {
    /** only for Browser */
    if(window !== undefined && window) {
      /** form */
      if(options instanceof Element && options.tagName === 'FORM') {
        request(form());
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
  }
  catch(e) {
    try {
      /** node.js */
      if(process !== undefined && process) {
        const formData = form();
        return request(formData, {
          headers: formData.getHeaders()
        });
      }
    }
    catch(e) {
      /** when it's not node.js, just exception from browser */
      console.log(e);
    }
  }
}

module.exports = Request;