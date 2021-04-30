// 热门搜索
const mapping = {
  // 网易云
  Netease: {
    type: 'POST',
    url: '/weapi/search/hot',
    data: (query) => {
      return {
        type: 1111
      }
    },
    headers: (query) => {
      return {
        crypto: 'weapi',
        ua: 'mobile',
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
