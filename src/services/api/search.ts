import { get, post } from '../index';
/**
 * 根据关键词搜索
 * @param params {limit : 返回数量 , 默认为 30,offset : 偏移数量，用于分页,type: 搜索类型 
 * 默认为 1 即单曲 , 
 * 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV,
 *  1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 * }
 */
function search(params: { keywords: string, limit?: number, offset?: number, type?: 1 | 10 | 100 | 1000 | 1002 | 1004 | 1006 | 1009 | 1014 | 1018 }) {
  return get('/search', { ...params })
}

/**
 * 获取热门搜索列表（简略）
 * @returns 
 */
function getHotSearchList() {
  return get('/search/hot', {});
}

/**
 * 获取热门详情列表
 * @returns 
 */
function getHotSearchDetailsList() {
  return get('/search/hot/detail', {});
}

/**
 * 获取默认搜索关键词
 * @returns 
 */
function getDefaultSearchKeywords() {
  return get('/search/default', {});
}

/**
 * 获取搜索建议列表
 * @param params 
 */
function getSearchSuggestList(params: { keywords: string, type?: string }) {
  return get('/search/suggest', { ...params });
}
export {
  search,
  getHotSearchList,
  getHotSearchDetailsList,
  getDefaultSearchKeywords,
  getSearchSuggestList
}