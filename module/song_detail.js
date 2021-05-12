const config = require('../config/index')
const fetch = require('../axios/index')
// 歌曲详情
const mapping = {
  // 网易云
  netease: {
    type: 'POST',
    url: config.host['netease'] + '/weapi/v3/song/detail',
    data: (query) => {
      query.ids = query.id.split(/\s*,\s*/)
      return {
        c: '[' + query.ids.map((id) => '{"id":' + id + '}').join(',') + ']'
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
          platform: 1,
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
  kugou: {
  },
  // 酷我
  kuwo: {
    type: 'GET',
    url: 'http://datacenter.kuwo.cn/d.c',
    data: (query) => {
      return {
        ids: query.id,
        corp: 'kuwo',
        p2p: 1,
        ft: 'music',
        resenc: 'utf8',
        isdownload: 1,
        cmkey: 'plist_pl2012'
      }
    },
    options: (query) => {
      return query
    },
    body: async(result, query) => {
      result = result[0]
      const albumid = result.albumid
      try {
        const res = await fetch.get('http://sartist.kuwo.cn/qi.s', {
          rid: albumid,
          newver: 2,
          encoding: 'utf8',
          isMultiArtists: 1,
          platform: 3
        })
        console.log(res)
        const link = await fetch.get('http://antiserver.kuwo.cn/anti.s', {
          type: 'convert_url',
          rid: `MUSIC_${result.id}`,
          format: 'mp3',
          response: 'url',
          platform: 3
        })
        if (res.status === 200 && link.status === 200) {
          const body = res.body
          const artists = body.artists[0]
          return {
            platform: 3,
            id: Number(result.id),
            title: result.name,
            mvId: 0,
            url: link.body.replace(/other./g, 'win.'),
            album: {
              id: Number(body.albumID),
              name: body.albumName,
              coverImageUrl: body.albumPic
            },
            artist: [
              {
                id: Number(artists.artistID),
                name: artists.artistName,
                imageUrl: artists.artistPic
              }
            ]
          }
        } else {
          return {
            code: 500,
            msg: '服务器错误'
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
module.exports = { mapping }
