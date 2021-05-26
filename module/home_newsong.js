const config = require('../config/index')
// 推荐新歌
const mapping = {
  // 网易云
  netease: {
    type: 'POST',
    url: config.host['netease'] + '/api/personalized/newsong',
    data: (query) => {
      return {
        type: 'recommend',
        limit: query.limit || 10,
        areaId: query.areaId || 0
      }
    },
    options: (query) => {
      query.cookie.os = 'pc'
      return {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
        realIP: query.realIP
      }
    },
    body: (result) => {
      return result.map(item => {
        const album = item.song.album
        const artists = item.song.artists.map(item => {
          return {
            name: item['name'],
            id: item['id'],
            imageUrl: item['picUrl']
          }
        })
        return {
          id: item.song['id'],
          title: item.song['name'],
          mvId: item.song['mv'] ? item.song['mv'] : 0,
          url: `http://music.163.com/song/media/outer/url?id=${item.song['id']}.mp3`,
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
  kugou: {
    type: 'POST',
    url: config.host['netease'] + '/api/personalized/newsong',
    data: (query) => {
      return {
        type: 'recommend',
        limit: query.limit || 10,
        areaId: query.areaId || 0
      }
    },
    options: (query) => {
      query.cookie.os = 'pc'
      return {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
        realIP: query.realIP
      }
    },
    body: (result) => {
      return result.map(item => {
        const album = item.song.album
        const artists = item.song.artists.map(item => {
          return {
            name: item['name'],
            id: item['id'],
            imageUrl: item['picUrl']
          }
        })
        return {
          id: item.song['id'],
          title: item.song['name'],
          mvId: item.song['mv'] ? item.song['mv'] : 0,
          url: `http://music.163.com/song/media/outer/url?id=${item.song['id']}.mp3`,
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
  // 酷我
  kuwo: {
    type: 'POST',
    url: config.host['netease'] + '/api/personalized/newsong',
    data: (query) => {
      return {
        type: 'recommend',
        limit: query.limit || 10,
        areaId: query.areaId || 0
      }
    },
    options: (query) => {
      query.cookie.os = 'pc'
      return {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
        realIP: query.realIP
      }
    },
    body: (result) => {
      return result.map(item => {
        const album = item.song.album
        const artists = item.song.artists.map(item => {
          return {
            name: item['name'],
            id: item['id'],
            imageUrl: item['picUrl']
          }
        })
        return {
          id: item.song['id'],
          title: item.song['name'],
          mvId: item.song['mv'] ? item.song['mv'] : 0,
          url: `http://music.163.com/song/media/outer/url?id=${item.song['id']}.mp3`,
          album: {
            id: album['id'],
            name: album['name'],
            coverImageUrl: album['picUrl']
          },
          artist: artists
        }
      })
    }
  }
}
module.exports = { mapping }
