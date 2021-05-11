// 歌曲详情
const mapping = {
  // 网易云
  netease: {
    url: '',
    body: (req) => {
      return `http://music.163.com/song/media/outer/url?id=${req.query['id']}.mp3`
    }
  },
  // 酷狗
  kugou: {
  },
  // 酷我
  kuwo: {
    type: 'GET',
    url: 'http://antiserver.kuwo.cn/anti.s',
    data: (query) => {
      return {
        type: 'convert_url',
        rid: `MUSIC_${query.id}`,
        format: 'mp3',
        response: 'url'
      }
    },
    options: (query) => {
      return query
    },
    body: (result, query) => {
      result = result.replace(/other./g, 'win.')
      return result
    }
  }
}
module.exports = { mapping }
