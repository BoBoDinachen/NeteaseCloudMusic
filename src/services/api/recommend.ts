import { get, post } from '../index';

/**
 * 获取每日推荐歌单(需要登录)
 * @returns 
 */
function getRecommendSongList() {
  return get("/recommend/resource", {})
}

/**
 * 获取推荐歌单
 */
function getPersonalized(params: {limit: number}) {
  return get("/personalized", {...params});
}
/**
 * 获取轮播图数据
 * 0: pc
 * 1: android
 * 2: iphone
 * 3: ipad
 */
function getBanner(params: { type: 0|1|2|3}) {
  return get("/banner", {...params});
}

export {
  getRecommendSongList,
  getPersonalized,
  getBanner
}