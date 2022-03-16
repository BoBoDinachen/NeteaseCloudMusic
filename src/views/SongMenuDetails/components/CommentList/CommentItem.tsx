import { FunctionComponent } from "react";
import { CommentOne, LightMember, ShareOne, ThumbsUp } from "@icon-park/react";

interface CommentItemProps {
  commentItem: CommentType
  timeType: 0 | 1
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

const CommentItem: FunctionComponent<CommentItemProps> = (props) => {
  return (
    <li className='
      flex justify-between items-start w-full py-4 bordered border-b border-gray-600
      space-x-4
    '>
      {/* 头像 */}
      <div className="relative">
        <img src={props.commentItem.user.avatarUrl} className='w-10 rounded-full' alt="" />
        {props.commentItem.user?.vipType !== 0 && <LightMember className="absolute -bottom-1 -right-0" theme="filled" size="16" fill="#f5a623" strokeWidth={2} />}
      </div>
      {/* 右边信息 */}
      <div className="space-y-2 flex flex-col justify-between items-start flex-1">
        <p className="text-sm">
          <span className="text-blue-300 mr-2 cursor-pointer">{props.commentItem.user.nickname}:</span>
          {props.commentItem.content}
        </p>
        <div className="flex justify-between items-center w-full space-y-2">
          <span className="text-xs text-gray-400">{props.timeType === 0 ? new Date(props.commentItem.time).toLocaleString() : props.commentItem.timeStr}</span>
          {/* 右边的东西 */}
          <div className="flex items-end justify-end space-x-4">
            <div className="flex items-center cursor-pointer space-x-1 tooltip" data-tip="点赞">
              <ThumbsUp theme="outline" size="18" fill="#ffffff" strokeWidth={2} />
              <span className="text-sm">{props.commentItem.likedCount}</span>
            </div>
            <div className="flex items-center cursor-pointer tooltip" data-tip="分享">
              <ShareOne theme="outline" size="18" fill="#ffffff" strokeWidth={2} />
            </div>
            <div className="flex items-center cursor-pointer tooltip" data-tip="回复">
              <CommentOne theme="outline" size="18" fill="#ffffff" strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CommentItem;