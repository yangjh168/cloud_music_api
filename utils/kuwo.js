/* eslint-disable no-constant-condition */
/* eslint-disable no-extend-native */

String.prototype.toBytes = function(encoding) {
  // var bytes = []
  // var buff = Buffer.from(this, encoding)
  // for (var i = 0; i < buff.length; i++) {
  //   var byteint = buff[i]
  //   bytes.push(byteint)
  // }
  // return bytes
  return Buffer.from(this, encoding)
}
module.exports = {
  matchLength(array, n, b) {
    if (array != null && array.length !== 0) {
      var min = Math.min(n, array.length)
      var n2 = 0
      var n3
      if (b) {
        n = 0
        while (true) {
          n3 = n2
          if (n >= min) {
            break
          }
          n2 = (n2 << 8 | (array[n] & 0xFF))
          ++n
        }
      } else {
        n = min - 1
        while (true) {
          n3 = n2
          if (n < 0) {
            break
          }
          n2 = (n2 << 8 | (array[n] & 0xFF))
          console.log('n2：' + n2)
          --n
        }
      }
      return n3
    }
    throw Error('byte array is null or empty!')
  }
}
