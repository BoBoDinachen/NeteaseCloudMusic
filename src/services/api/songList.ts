import { get } from '../index';

/**
 * 获取歌单内的所有歌曲
 * @param params 
 * @returns 
 */
function getSongListAllMusic(params: { id: number, limit?: number, offset?: number }) {
  return get('/playlist/track/all', { ...params })
}

/**
 * 获取歌单分类 
 * category:
 * 0 --语种
 * 1 --风格
 * 2 --场景
 * 3 --情感
 * 4 --主题
 * @returns 
 */
function getSongCatlist() {
  return get('/playlist/catlist', {})
}

/**
 * 获取热门歌单分类
 * @returns 
 */
function getHotSongCatlist() {
  return get('/playlist/hot', {})
}

/**
 * 获取歌单列表
 * @param params 
 * cat -tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",
 * @returns 
 */
function getSongList(params: {order?: 'new'|'hot',cat:string,limit:number,offset?:number}) {
  return get('/top/playlist', {...params})
}

/**
 * 获取精品歌单标签列表
 */
function getBoutiquePlaylistTags() {
  return get('/playlist/highquality/tags', {})
}

/**
 * 获取精品歌单
 * @param params 
 * @returns 
 */
function getBoutiquePlaylist(params: {cat:string,limit: number,before?:number}) {
  return get('/top/playlist/highquality', { ...params });
}

/**
 * 获取歌单详情
 * id : 歌单 id
 * s : 歌单最近的 s 个收藏者,默认为 8
 */
function getSongListDetail(params: {id:number,s?:number}) {
  return get('/playlist/detail', { ...params });
}
export {
  getSongListAllMusic,
  getSongCatlist,
  getHotSongCatlist,
  getBoutiquePlaylistTags,
  getBoutiquePlaylist,
  getSongList,
  getSongListDetail
}