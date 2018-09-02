module.exports = {

  /**
   * Object to queryString
   * 
   * @param {string} params
   * 
   * @return {string}
   */
  httpBuildQuery: function(params) {
    let
      qs = new String()
    ;
    Object.keys(params).forEach(function(v) {
      qs += `${v}=${eval('params.'+ v)}&`;
    });
    qs = qs.substr(0, qs.length -1);
    return qs;
  }
};

 