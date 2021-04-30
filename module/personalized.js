// 推荐歌单
const mapping = {
  // 网易云
  Netease: {
    type: 'POST',
    url: '/weapi/personalized/playlist',
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
      return result
    }
  },
  // 酷狗
  KuGou: {
    'address': 'adres'
  },
  // 酷我
  Kuwo: {
    'address': 'adres'
  }
}
module.exports = { mapping }
