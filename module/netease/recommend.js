const config = require('../../config/index')
// 推荐歌单
module.exports = {
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
  headers: (query) => {
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
}
