const { xmlToJson } = require('../../utils/index')

// 酷我首页数据
module.exports = {
  type: 'GET',
  url: 'http://mgxhtj.kuwo.cn/mgxh.s?type=tuijian&isVip=3&apiv=15&dailyrec=1&prod=kwplayer_ar_9.3.7.7&corp=kuwo&newver=2&vipver=9.3.7.7&source=kwplayer_ar_9.3.7.7_40.apk',
  responseType: 'xml',
  data: (query) => {
    return query
  },
  headers: (query) => {
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

