import { post, get } from '../index';

/**
 * 获取音乐url
 * @param id 音乐id
 */
function getMusic(id: number) {
  return get("/song/url", { id });
}

/**
 * 获取歌词
 * @param id 音乐id
 */
function getLyric(id:number) {
  return get('/lyric', { id });
}

/**
 * 获取歌曲详情信息
 * @param id 歌曲id
 * @returns 
 */
function getMusicDetail(id:number) {
  return get('/song/detail', {ids:id})
}


export {
  getMusic,
  getLyric,
  getMusicDetail
}