// 搜索
const mapping = {
  // 网易云
  Netease: {
    type: 'POST',
    url: '/weapi/search/get',
    data: (query) => {
      return {
        s: query.keywords,
        type: query.type || 1, // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
        limit: query.limit || 30,
        offset: query.offset || 0
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
      return result.songs.map(item => {
        const album = item.album
        const artists = item.artists.map(item => {
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
          url: null, // `http://music.163.com/song/media/outer/url?id=${item['id']}.mp3`
          album: {
            id: album['id'],
            name: album['name'],
            coverImageUrl: album['picUrl']
          },
          artist: artists
        }
      })
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
