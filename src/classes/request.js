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
  options = Object.assign({ access_token }, options);

  /** XMLHttpRequest Events */
  xhr.addEventListener('load', function(aEvt) {
    return requestOptions.onResponse(xhr, aEvt);
  });
  
  /** form? */
  if(options.form !== undefined && options.form) {
    /** request */
    xhr.open(requestOptions.method, 
      requestOptions.method == 'get'
        ? requestUrl + `?access_token=${access_token}&` + serialize(options.form)
        : requestUrl
    , true);
    if(requestOptions.method == 'post') {
      /** formData: Function Scope */
      var 
        formData = new FormData(options.form)
      ;
      /** add access_toekn to form */
      formData.append('access_token', access_token);
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