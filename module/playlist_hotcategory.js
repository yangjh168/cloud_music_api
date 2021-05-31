// 热门歌单分类
const config = require('../config/index')
const { xmlToJson } = require('../utils/index')
const mapping = {
  // 网易云
  netease: {
    type: 'POST',
    url: config.host['netease'] + '/weapi/playlist/hottags',
    data: (query) => {
      return {}
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
      return result.tags.map(item => {
        return {
          id: item.id,
          name: item.name
        }
      })
    }
  },
  // 酷狗
  kugou: {},
  // 酷我
  kuwo: {
    type: 'GET',
    url: 'http://wapi.kuwo.cn/api/mobicase/playlist/taglist',
    responseType: 'xml',
    data: (query) => {
      return {
        type: 'hot_xh_newquku',
        platform: 'ar',
        corp: 'kuwo',
        newver: 2,
        ver: 2
      }
    },
    options: (query) => {
      return query
    },
    body: (result) => {
      const temp = xmlToJson(result)
      result = temp.root.section[0].new_list.map(item => item.$)
      return result.map(item => {
        return {
          id: Number(item.id),
          name: item.name
        }
      })
    }
  }
}
module.exports = { mapping }
