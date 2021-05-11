// 搜索
module.exports = {
  type: 'GET',
  url: 'http://search.kuwo.cn/r.s',
  // responseType: 'document',
  data: (query) => {
    return {
      all: query.keyword,
      ft: 'music',
      itemset: 'web_2013',
      client: 'kt',
      pn: query.offset || 0,
      rn: query.limit || 30,
      rformat: 'json',
      encoding: 'utf8',
      mobi: 1, // 加这个才返回的是json
      vipver: 1, // 必须加不然数据不完整
      vermerge: 1, // 是否拼接子标题
      issubtitle: 1 // 是否要子标题,前提vermerge=1
    }
  },
  options: (query) => {
    return query
  },
  body: (result) => {
    return {
      total: Number(result.TOTAL),
      list: result.abslist.map(item => {
        return {
          platform: 3,
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

