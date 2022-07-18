import { FunctionComponent, useEffect, useState } from "react";
import { getHotComment, getSongMenuComment } from '~/services/api/comment';
import { useParams } from 'react-router-dom';
import CommentItem from './CommentItem';
import { Right } from "@icon-park/react";
import Pagination from '~/components/Pagination/index';
import Loading from '~/components/Loading/index';

interface CommentListProps {

}

interface CommentType {
  user: {
    avatarUrl: string
    nickname: string
    vipType: number
  }
  content: string
  likedCount: number
  timeStr: string
  time: number
}

const CommentList: FunctionComponent<CommentListProps> = () => {

  const [inputComment, setInputComment] = useState<string>(''); // 评论

  const [hotCommentList, setHotCommentList] = useState<CommentType[]>([]); // 精彩评论列表
  const [commentList, setCommentList] = useState<CommentType[]>([]); // 精彩评论列表
  const [totalComment, setTotalComment] = useState<number>(0); // 评论统计数量
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1); // 当前页数
  const [totalPageNumber, setTotalPageNumber] = useState<number>(0); // 总页数
  const [loading, setLoading] = useState<boolean>(false); // 加载
  const params = useParams(); // 路由参数
  /**
   * 加载热门评论和最新评论
   */
  useEffect(() => {
    getHotComment({ id: Number(params.songMenuId), type: 2, limit: 10 }).then((res: any) => {
      console.log(res);
      if (res.code === 200) {
        setHotCommentList(res.hotComments)
      }
    })

  }, [])

  /**
   * 分页加载最新评论
   */
  useEffect(() => {
    setLoading(true);
    getSongMenuComment({ id: Number(params.songMenuId), limit: 20, offset: (currentPageNumber - 1) * 20 }).then((res: any) => {
      console.log(res);
      if (res.code === 200) {
        setCommentList(res.comments);
        setTotalComment(res.total);
        setTotalPageNumber(parseInt((res.total / 20) + ''));
        setLoading(false);
      }
    })
  }, [currentPageNumber])

  return (
    <div className="p-8">
      {/* 输入框 */}
      <div className="relative">
        <textarea onChange={(e) => {
          setInputComment(e.target.value);
        }} placeholder="输入你的精彩评论吧~"
          className="w-full p-3 bg-gray-600 border-0 outline-none rounded-sm"
          rows={3}></textarea>
        <span className="absolute text-gray-400 right-3 bottom-3 text-sm">还可以输入{140 - inputComment.length}个字</span>
      </div>
      <div className="w-full flex justify-between items-center py-3">
        <div className="flex items-center space-x-3 text-lg">
          <span>@</span>
          <span>#</span>
        </div>
        <button className="btn btn-success text-white btn-sm">
          发送评论
        </button>
      </div>
      {/* 精彩评论列表 */}
      <ul className="w-full flex flex-col justify-start items-start">
        <li className="font-bold text-lg">精彩评论</li>
        {
          hotCommentList.length !== 0 ?
            hotCommentList.map((item, index) => {
              return (
                <CommentItem commentItem={item} key={item.time} timeType={0}></CommentItem>
              )
            })
            :
            <h3 className="w-full text-center">暂无评论...</h3>
        }
        <li className="w-full flex items-center justify-center mt-5">
          <button className="btn btn-ghost">
            更多精彩评论
            <Right theme="outline" size="24" fill="#ffffff" strokeWidth={2} />
          </button>
        </li>
      </ul>
      {/* 最新评论列表 */}
      <ul className="w-full flex flex-col justify-start items-start mt-6 pb-14 relative">
        <li className="font-bold text-lg">最新评论({totalComment})</li>
        {
          loading ? <Loading></Loading> :
            commentList.length !== 0 ?
              commentList.map((item, index) => {
                return (
                  <CommentItem commentItem={item} key={item.time} timeType={1}></CommentItem>
                )
              }) :
              <h3 className="w-full text-center">暂无评论...</h3>
        }
      </ul>
      {/* 分页 */}
      <Pagination activePage={currentPageNumber} setActivePage={setCurrentPageNumber} totalPage={totalPageNumber == 0 ? 1 : totalPageNumber}></Pagination>
    </div>
  );
}

export default CommentList;