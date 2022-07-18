import { get } from '../index';

// **************************************** 评论相关的接口

/**
 *  **获取歌单评论**
 * @param params 参数
 *  * id: 歌单 id
 *  * limit: 取出评论数量 , 默认为 20
 *  * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 *  * before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
 * @returns 
 */
const getSongMenuComment = (params: {id: number,limit?: number,offset?: number,before?: number}) => { 
  return get('/comment/playlist', {...params})
}

/**
 * **获取热门评论**
 * @param params 参数
 * * id : 资源 id
 * * type: 数字 , 资源类型 , 对应0-歌曲 , 1-mv, 2-歌单 ,3-专辑, 4-电台, 5-视频对应以下类型
 * * limit: 取出评论数量 , 默认为 20
 * * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * * before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
 * @returns 
 */
const getHotComment = (params: {id:number,type: 0|1|2|3|4|5,limit?:number,offset?:number,before?:number}) => { 
  return get('/comment/hot', {...params})
}

export { 
  getSongMenuComment,
  getHotComment
}