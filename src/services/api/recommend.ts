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
 * 获取推荐MV
 * @returns 
 */
function getRecommendMV() {
  return get('/personalized/mv', {});
}

/**
 * 获取推荐新音乐
 * @param limit 取出数量
 * @returns 
 */
function getRecommendNewSong(limit:number = 20) {
  return get('/personalized/newsong', {limit})
}

/**
 * 获取独家放送
 */
function getPrivateContent(){
  return get('/personalized/privatecontent', {})
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
  getBanner,
  getRecommendMV,
  getRecommendNewSong,
  getPrivateContent
}