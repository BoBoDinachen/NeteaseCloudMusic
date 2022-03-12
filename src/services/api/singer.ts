import { get } from '../index';

/**
 * 获取歌手分类列表
 * @param 参数
 *  * limit: 返回数量 , 默认为 30
 *  * offset: 偏移数量，用于分页
 *  * initial: 按首字母索引查找参数 热门传-1 #传0
 *  * type: -1:全部 1:男歌手 2:女歌手 3:乐队
 *  * area: -1:全部 7华语 96欧美  8:日本 16韩国 0:其他
 */
function getSingerClassifyList(params: {limit:number,offset:number,initial:string,type:'-1'|'1'|'2'|'3',area:'-1'|'7'|'96'|'8'|'16'|'0'}) {
  return get('/artist/list', {...params})
}


export {
  getSingerClassifyList
}