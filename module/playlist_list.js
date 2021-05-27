// 歌单列表-可按分类查询
const config = require('../config/index')
const mapping = {
  // 网易云
  netease: {
    type: 'POST',
    url: config.host['netease'] + '/weapi/playlist/list',
    data: (query) => {
      return {
        cat: query.cat || '全部', // 全部,华语,欧美,日语,韩语,粤语,小语种,流行,摇滚,民谣,电子,舞曲,说唱,轻音乐,爵士,乡村,R&B/Soul,古典,民族,英伦,金属,朋克,蓝调,雷鬼,世界音乐,拉丁,另类/独立,New Age,古风,后摇,Bossa Nova,清晨,夜晚,学习,工作,午休,下午茶,地铁,驾车,运动,旅行,散步,酒吧,怀旧,清新,浪漫,性感,伤感,治愈,放松,孤独,感动,兴奋,快乐,安静,思念,影视原声,ACG,儿童,校园,游戏,70后,80后,90后,网络歌曲,KTV,经典,翻唱,吉他,钢琴,器乐,榜单,00后
        order: query.order || 'hot', // hot,new
        limit: query.limit || 50,
        offset: query.offset || 0,
        total: true
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
      return {
        total: result.total,
        list: result.playlists.map(item => {
          return {
            id: item.id,
            name: item.name,
            picUrl: item.coverImgUrl,
            playCount: item.playCount
          }
        })
      }
    }
  },
  // 酷狗
  kugou: {},
  // 酷我
  kuwo: {}
}
module.exports = { mapping }
