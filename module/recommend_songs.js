// 每日推荐歌曲
const config = require('../config/index')
// 歌曲详情
const mapping = {
  // 网易云
  netease: {
    type: 'POST',
    url: config.host['netease'] + '/api/v3/discovery/recommend/songs',
    data: (query) => {
      return {}
    },
    options: (query) => {
      query.cookie.os = 'ios'
      return {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
        realIP: query.realIP
      }
    },
    body: (result) => {
      console.log(result)
      return {
        total: Number(result.songCount),
        list: result.songs.map(item => {
          const album = item.album
          const artists = item.artists.map(item => {
            return {
              name: item['name'],
              id: item['id'],
              imageUrl: item['picUrl']
            }
          })
          return {
            platform: 1,
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
    }
  },
  // 酷狗
  kugou: {},
  // 酷我
  kuwo: {
    type: 'GET',
    url: 'http://mobi.kuwo.cn/mobiweb.s?',
    data: (query) => {
      return {
        f: 'web',
        num: 40,
        source: 'kwplayer_ar_9.3.7.7_40.apk', // 必填
        type: 'rcm_discover',
        // kweexVersion: '1.1.2',
        apiv: 2,
        // uid: 1959179028, 有uid则根据用户进行推荐歌曲
        // loginUid: 544959540,
        vip_member: 0 // 会员尊享多听30首，是否会员，默认30首、传1则60首
      }
    },
    options: (query) => {
      return query
    },
    body: (result) => {
      return result.child[0].child.map(item => {
        return {
          platform: 3,
          id: Number(item.musicdata.rid),
          title: item.musicdata.name,
          mvId: 0,
          url: null, // `http://music.163.com/song/media/outer/url?id=${item['id']}.mp3`
          album: {
            id: Number(item.data.albumid),
            name: item.data.album,
            coverImageUrl: item.data.img
          },
          artist: [
            {
              name: item.data.artist,
              id: Number(item.data.artistid),
              imageUrl: item.data.img
            }
          ]
        }
      })
    }
  }
}
module.exports = { mapping }
