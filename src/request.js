const axios = require('axios')
const queryString = require('query-string')

const axiosInstance = axios.create({
  baseURL: 'https://www.tistory.com/apis/'
})

function Request () {}

/**
 * 'get' request
 *
 * @param {string} accessToken - Tistory Access Token
 * @param {string} url - Request url
 * @param {Object} options - Params
 */
Request.get = function (accessToken, url, options) {
  return axiosInstance.get(url, {
    params: Object.assign({
      access_token: accessToken,
      output: 'json'
    }, options)
  })
}

/**
 * 'post' request
 *
 * @param {string} accessToken - Tistory Access Token
 * @param {string} url - Request url
 * @param {Object} options - Params
 */
Request.post = function (accessToken, url, options) {
  const request = function (data, axiosConfig = {}) {
    return axiosInstance.post(
      url,
      data,
      axiosConfig
    )
  }
  const form = function () {
    let formData = null

    /** only for Browser */
    if (typeof window !== 'undefined' && window) {
      formData = new FormData(options)
    } else if (typeof process !== 'undefined' && process) {
      const FormData = require('form-data')
      formData = new FormData()
      for (const key in options) {
        formData.append(key, options[key])
      }
    }
    /** add access_toekn to form */
    formData.append('access_token', accessToken)
    formData.append('output', 'json')

    return formData
  }
  /** only for Browser */
  if (typeof window !== 'undefined' && window) {
    /** form */
    if (options instanceof Element && options.tagName === 'FORM') {
      return request(form())
    } else {
      return request(queryString.stringify(
        Object.assign({
          access_token: accessToken,
          output: 'json'
        }, options)
      ))
    }
  } else if (typeof process !== 'undefined' && process) {
    const formData = form()
    return request(formData, {
      headers: formData.getHeaders()
    })
  }
  return false
}

module.exports = Request
