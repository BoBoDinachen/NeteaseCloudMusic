import { Download, FolderPlus, LightMember, PlayOne, Plus, Share } from "@icon-park/react";
import { FunctionComponent, useEffect } from "react";
import { getTsFormatDate, unitConverter } from '~/utils/BaseUtil';

interface CoverTitleBarProps {
  details: CoverInfoType | null
}

interface CoverInfoType {
  id: number
  name: string
  coverImgUrl: string
  createTime: number
  shareCount: number
  subscribedCount: number
  tags: string[]
  commentCount: number
  trackCount: number
  playCount: number
  description: string
  creator: {
    avatarUrl: string
    nickname: string
    vipType: number
  }
}

const CoverTitleBar: FunctionComponent<CoverTitleBarProps> = (props) => {

  useEffect(() => {

  }, [])

  return (
    <div className="
      w-full p-8 
      flex justify-start items-center
    ">
      {/* 封面图片 */}
      <img src={props.details?.coverImgUrl} className='w-52 rounded-md' alt="" />
      {/* 右边的信息 */}
      <div className="flex-1 ml-7 flex flex-col justify-between items-start space-y-4">
        {/* 歌单标题 */}
        <div className="flex items-center space-x-2 w-full">
          <span className="block bordered border-green-500 rounded-md border-2 px-2 text-sm text-green-500">歌单</span>
          <h1 className="font-bold text-xl">{props.details?.name}</h1>
        </div>
        {/* 创建者信息 */}
        <div className="flex items-center justify-start text-sm">
          <div className="relative">
            <img className="w-6 rounded-full" src={props.details?.creator.avatarUrl} alt="" />
            {props.details?.creator.vipType !== 0 && <LightMember className="absolute -bottom-1 -right-1" theme="filled" size="16" fill="#f5a623" strokeWidth={2} />}
          </div>
          <span className={`ml-2 cursor-pointer
            ${props.details?.creator.vipType !== 0 ? 'text-yellow-400' : 'text-blue-400'}
          `}
          >{props.details?.creator.nickname}</span>
          <span className="ml-7 text-gray-400">{new Date(props.details?.createTime!).toLocaleDateString("ko-KR") + '创建'}</span>
        </div>
        {/* 按钮组--播放--收藏--分享 */}
        <ul className="flex justify-start items-center space-x-4 text-sm ">
          <li className="flex space-x-1 justify-between items-center px-2 py-1 cursor-pointer rounded-full bg-green-500">
            <PlayOne theme="filled" size="20" fill="#ffffff" strokeWidth={2} />
            <span className="flex-1">播放全部</span>
            <Plus theme="filled" size="24" fill="#ffffff" strokeWidth={2} />
          </li>
          <li className="flex space-x-1 justify-between items-center px-3 py-1 cursor-pointer rounded-full bordered border border-gray-400">
            <FolderPlus theme="outline" size="18" fill="#ffffff" strokeWidth={2} />
            <span className="flex-1">收藏({unitConverter(props.details?.subscribedCount!)})</span>
          </li>
          <li className="flex space-x-1 justify-between items-center px-3 py-1 cursor-pointer rounded-full bordered border border-gray-400">
            <Share theme="outline" size="18" fill="#ffffff" strokeWidth={2} />
            <span className="flex-1">分享({unitConverter(props.details?.shareCount!)})</span>
          </li>
          <li className="flex space-x-1 justify-between items-center px-3 py-1 cursor-pointer rounded-full bordered border border-gray-400">
            <Download theme="outline" size="18" fill="#ffffff" strokeWidth={2} />
            <span className="flex-1">下载全部</span>
          </li>
        </ul>
        {/* 歌单详情信息 */}
        <ul className="flex flex-col space-y-2 text-sm justify-between flex-1">
          <li className="space-x-2">
            <span>标签:</span>
            <span>{props.details?.tags.map((item,index) => { 
              if (index !== props.details?.tags.length! - 1) {
                return <b key={index}>{item + ' / '}</b>
              } else { 
                return <b key={index}>{item}</b>
              }
            })}</span>
          </li>
          <li className="flex space-x-4">
            <div className="space-x-2">
              <span>歌曲:</span>
              <span className="text-gray-300">{props.details?.trackCount}</span>
            </div>
            <div className="space-x-2">
              <span>播放:</span>
              <span className="text-gray-300">{unitConverter(props.details?.playCount!)}</span>
            </div>
          </li>
          <li className="flex space-x-2">
            <span>简介:</span>
            <p className="truncate overflow-visible w-96 text-gray-400">{props.details?.description}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CoverTitleBar;