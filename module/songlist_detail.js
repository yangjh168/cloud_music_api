const config = require('../config/index')
// const { matchLength } = require('./utils/kuwo')

// const fetch = require('../axios/index')
// 歌单详情
const mapping = {
  // 网易云
  netease: {
    type: 'POST',
    url: config.host['netease'] + '/api/v6/playlist/detail',
    data: (query) => {
      return {
        id: query.id,
        n: 100000,
        s: query.s || 8
      }
    },
    options: (query) => {
      return {
        crypto: 'api',
        cookie: query.cookie,
        proxy: query.proxy,
        realIP: query.realIP
      }
    },
    body: (result) => {
      // return JSON.parse(JSON.stringify(result))
      result['playlist'].tracks = result['playlist'].tracks.map(item => {
        item.platform = 1
        return item
      })
      return result['playlist']
      // const res = result.songs.map(item => {
      //   const album = item.al
      //   const artists = item.ar.map(item => {
      //     return {
      //       name: item['name'],
      //       id: item['id'],
      //       imageUrl: item['picUrl']
      //     }
      //   })
      //   return {
      //     platform: 1,
      //     id: item['id'],
      //     title: item['name'],
      //     mvId: item['mvid'] ? item['mvid'] : 0,
      //     url: `http://music.163.com/song/media/outer/url?id=${item['id']}.mp3`,
      //     album: {
      //       id: album['id'],
      //       name: album['name'],
      //       coverImageUrl: album['picUrl']
      //     },
      //     artist: artists
      //   }
      // })
      // return res[0]
    }
  },
  // 酷狗
  kugou: {
  },
  // 酷我
  // kuwo: {
  //   type: 'GET',
  //   url: 'http://mobilebasedata.kuwo.cn/basedata.s',
  //   data: (query) => {
  //     return {
  //       type: 'get_songlist_info2',
  //       prod: 'kwplayer_ar_9.3.7.7',
  //       corp: 'kuwo',
  //       newver: 2,
  //       p2p: 1,
  //       notrace: 1,
  //       id: query.id,
  //       pos: 8,
  //       apiv: 3,
  //       aapiver: 1
  //     }
  //   },
  //   options: (query) => {
  //     return query
  //     // http://nmsublist.kuwo.cn/mobi.s?f=kuwo&type=gift_list
  //   },
  //   body: (result) => {
  //     return result['sl_data']
  //   }
  // }
  kuwo: {
    type: 'GET',
    url: 'http://nmsublist.kuwo.cn/mobi.s?f=kuwo&q=1fnyoBHoOZfCeYOyxPiNJ42UFgFIIiJi94a590oOQhxLwcPciTNimzYckWYaEW3P3LAHPMlGm1FNLrZROkUAL6NfLn0MdYWpbKFLBw/RC0LH6X5rWVer8RvdnPkogmd9jwyphe9KFxRMVJTkkBPYbNTGXG2vOGJuWqVwgYX2rI3jYB2cxETw82v8VIo8zLDnVG/vS5okdWDgXGJpPokeCzbJmzw7GiD/O0NBly+8Km81Go/d/7+t01Wfuh+ALJ3xLVExDLXiq/qb9mKh9Z4zvq0KrwydGcAspUMyzM5Y9Qre7xJ1u6lcwts2sMMjgki1+NL+H9Up3z3lbdIf0EkL/cc6YtNyQmtZxzU7d1ZsaTkNXIDCvClw8hb07+0+Op9XIR7LqUer6X/ltBVa8HMo0re4ND1EcaLoGQoPpNK8KRFWopMERTIpWyfv7eFDGNcizNpchCA3Tzjlp2YSkExX5FVgx1zL2r1LBsed8mKkTKuzv0Yy0uLDtrJwRiXaeHdlnrBDVMHOaqvGzrNDhMRpNOhvEpWBdvS+',
    responseType: 'xml',
    data: (query) => {
      return query
    },
    options: (query) => {
      return query

      // http://nmsublist.kuwo.cn/mobi.s?f=kuwo&type=gift_list
    },
    body: (result, query) => {
      return result
      // var c = result.toBytes('utf8')
      // var trim = result.split('\r\n')[0].trim()
      // if (!trim.startsWith('sig=')) {
      //   return null
      // }
      // var n = trim.toBytes('utf8').length + '\r\n'.toBytes('utf8').length
      // console.log('n：' + n)
      // var byteArray = Buffer.from([c[n + 0], c[n + 1], c[n + 2], c[n + 3]])
      // console.log(byteArray.length)
      // var a = matchLength(byteArray, 4, false)
      // console.log(a)
      // console.log(c.length)
      // if (a > c.length - n) {
      //   return null
      // }
      // var string = Buffer.from(array).toString('utf8')
      // return a
    }
  }
}
module.exports = { mapping }
