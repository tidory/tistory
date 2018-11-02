const
  util = require('./util'),
  serialize = require('./serialize'),
  baseUrl = 'https://www.tistory.com/apis'
;

/**
 * request
 * 
 * @param {string} access_token - Tistory Access_token
 * @param {string} url - request url
 * @param {Object} requestOptions - ONLY FOR request FUNCTION options
 * @param {Object} options - params
 */
function request(access_token, url, requestOptions, options) {
  const 
    xhr = new XMLHttpRequest(),
    requestUrl = baseUrl + url
  ;
  /** default */
  requestOptions = {
    method: requestOptions.method || 'get' , // http method
    onResponse: requestOptions.onResponse || new Function, // callback on response
  };
  /** combine options */
  options = Object.assign({ 
    'access_token': access_token,
    'output': 'json'
  }, options);
  /** XMLHttpRequest Events */
  xhr.addEventListener('load', function(aEvt) {
    let response = JSON.parse(xhr.responseText);
    switch(requestOptions.method) {
      case 'get':
        return requestOptions.onResponse(response.tistory.item);
      case 'post':
        let result = {};
        Object.keys(response.tistory).map(function(key) {
          if(key != 'status') {
            result[key] = response.tistory[key]; 
          }
        });
        return requestOptions.onResponse(result);
    }
  });
  
  /** form? */
  if(options.form !== undefined && options.form) {
    /** request */
    xhr.open(requestOptions.method, 
      requestOptions.method == 'get'
        ? requestUrl + `?access_token=${access_token}&output=json&` + serialize(options.form)
        : requestUrl
    , true);
    if(requestOptions.method == 'post') {
      /** formData: Function Scope */
      var 
        formData = new FormData(options.form)
      ;
      /** add access_toekn to form */
      formData.append('access_token', access_token);
      formData.append('output', 'json');
    }
    /** send */
    xhr.send(requestOptions.method == 'get'
      ? null
      : formData
    );
  }
  else {
    /** request */
    xhr.open(requestOptions.method, 
      requestOptions.method == 'get'
        ? requestUrl + '?' + util.httpBuildQuery(options)
        : requestUrl
    , true);
    /** set request header */
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    /** send */
    xhr.send(
      requestOptions.method == 'get'
        ? null
        : util.httpBuildQuery(options)
    );
  }
}

module.exports = request;