const config = require('../config/index')
const { xmlToJson } = require('../utils/index')
// 歌曲详情
const mapping = {
  // 网易云
  netease: {
    type: 'POST',
    url: config.host['netease'] + '/weapi/personalized/playlist',
    data: (query) => {
      return {
        limit: query.limit || 30,
        // offset: query.offset || 0,
        total: true,
        n: 1000
      }
    },
    options: (query) => {
      return {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
        realIP: query.realIP
      }
    },
    body: (result) => {
      return result.map(item => {
        return {
          id: item.id,
          name: item.name,
          picUrl: item.picUrl,
          playCount: item.playCount
        }
      })
    }
  },
  // 酷狗
  kugou: {},
  // 酷我
  kuwo: {
    type: 'GET',
    url: 'http://mgxhtj.kuwo.cn/mgxh.s?type=tuijian&isVip=3&apiv=15&dailyrec=1&prod=kwplayer_ar_9.3.7.7&corp=kuwo&newver=2&vipver=9.3.7.7&source=kwplayer_ar_9.3.7.7_40.apk',
    responseType: 'xml',
    data: (query) => {
      return query
    },
    options: (query) => {
      return query
    },
    body: (result) => {
      const temp = xmlToJson(result)
      // 取推荐歌单
      result = temp.root.section[3].songlist.map(item => item.$)
      return result.map(item => {
        return {
          id: Number(item.id),
          name: item.name,
          picUrl: item.img,
          playCount: Number(item.listencnt)
        }
      })
    }
  }
}
module.exports = { mapping }
