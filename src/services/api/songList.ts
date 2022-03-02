import { get } from '../index';

/**
 * 获取歌单内的所有歌曲
 * @param params 
 * @returns 
 */
function getSongListAllMusic(params: { id: number, limit?: number, offset?: number }) {
  return get('/playlist/track/all', { ...params })
}

export {
  getSongListAllMusic
}