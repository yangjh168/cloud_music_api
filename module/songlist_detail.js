const config = require('../config/index')
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
  kuwo: {
    type: 'GET',
    url: 'http://mobilebasedata.kuwo.cn/basedata.s',
    data: (query) => {
      return {
        type: 'get_songlist_info2',
        prod: 'kwplayer_ar_9.3.7.7',
        corp: 'kuwo',
        newver: 2,
        p2p: 1,
        notrace: 1,
        id: query.id,
        pos: 8,
        apiv: 3,
        aapiver: 1
      }
    },
    options: (query) => {
      return query
    },
    body: (result) => {
      return result['sl_data']
    }
  }
}
module.exports = { mapping }
