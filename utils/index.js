module.exports = {
  toBoolean(val) {
    if (typeof val === 'boolean') return val
    if (val === '') return val
    return val === 'true' || val === '1'
  },
  cookieToJson(cookie) {
    if (!cookie) return {}
    const cookieArr = cookie.split(';')
    const obj = {}
    cookieArr.forEach((i) => {
      const arr = i.split('=')
      obj[arr[0]] = arr[1]
    })
    return obj
  },
  /**
   * xml转jsonjson
   * @param {xml字符串} result
   * @returns
   */
  xmlToJson(result) {
    var xml2js = require('xml2js')
    var parser = new xml2js.Parser()
    // console.log(result)
    parser.parseString(result, function(err, res) {
      if (err) {
        result = 'xml转json失败'
      } else {
        result = res
      }
    })
    return result
  }
}
