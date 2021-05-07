// 搜索
module.exports = {
  type: 'GET',
  url: 'http://search.kuwo.cn/r.s',
  responseType: 'document',
  data: (query) => {
    return {
      all: query.keyword,
      ft: 'music',
      itemset: 'web_2013',
      client: 'kt',
      pn: query.offset || 0,
      rn: query.limit || 30,
      rformat: 'json',
      encoding: 'utf8'
    }
  },
  headers: (query) => {
    return query
  },
  body: (result) => {
    // 将单引号替换成双引号
    result = result.replace(/'/g, '"')
    result = JSON.parse(result)
    return {
      total: Number(result.TOTAL),
      list: result.abslist.map(item => {
        return {
          id: Number(item.MUSICRID.replace(/MUSIC_/g, '')),
          title: item.NAME,
          mvId: 0,
          url: null,
          album: {
            id: Number(item.ALBUMID),
            name: item.ALBUM
          },
          artist: [
            {
              id: 0,
              name: item.SONGNAME,
              imageUrl: null
            }
          ]
        }
      })
    }
    // return result
  }
}

