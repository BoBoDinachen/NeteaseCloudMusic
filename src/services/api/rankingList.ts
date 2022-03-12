import { get } from '../index';

/**
 * 获取所有的榜单
 */
function getAllTopList() {
  return get('/toplist', {});
}

export {
  getAllTopList
}