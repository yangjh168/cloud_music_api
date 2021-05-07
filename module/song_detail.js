const config = require('../config/index')
// 歌曲详情
const mapping = {
  // 网易云
  netease: {
    type: 'POST',
    url: config.host['netease'] + '/weapi/v3/song/detail',
    data: (query) => {
      query.ids = query.ids.split(/\s*,\s*/)
      return {
        c: '[' + query.ids.map((id) => '{"id":' + id + '}').join(',') + ']'
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
      // return JSON.parse(JSON.stringify(result))
      const res = result.songs.map(item => {
        const album = item.al
        const artists = item.ar.map(item => {
          return {
            name: item['name'],
            id: item['id'],
            imageUrl: item['picUrl']
          }
        })
        return {
          id: item['id'],
          title: item['name'],
          mvId: item['mvid'] ? item['mvid'] : 0,
          url: `http://music.163.com/song/media/outer/url?id=${item['id']}.mp3`,
          album: {
            id: album['id'],
            name: album['name'],
            coverImageUrl: album['picUrl']
          },
          artist: artists
        }
      })
      return res[0]
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
