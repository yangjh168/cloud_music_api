// 歌词
const mapping = {
  // 网易云
  Netease: {
    type: 'POST',
    url: '/api/song/lyric',
    data: (query) => {
      return {
        id: query.id,
        lv: -1,
        kv: -1,
        tv: -1
      }
    },
    headers: (query) => {
      return {
        crypto: 'api',
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
