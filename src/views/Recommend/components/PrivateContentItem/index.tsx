import { FunctionComponent } from "react";
import { PlayOne} from '@icon-park/react';

interface PrivateContentItemProps {
  content: {id:number,picUrl:string,name:string}
}
 
const PrivateContentItem: FunctionComponent<PrivateContentItemProps> = (props) => {
  return (
    <li className='flex flex-col justify-start cursor-pointer relative'>
      <img className='rounded-md' src={props.content.picUrl} alt="" />
      {/* 标题 */}
      <span className=' mt-2 text-md overflow-ellipsis text-gray-300 overflow-hidden h-12 py-1 break-all hover:text-white'>
        {props.content.name}
      </span>
      {/* 按钮 */}
      <button className='btn btn-primary btn-xs btn-circle absolute top-2 left-2'>
        <PlayOne theme="filled" size="18" fill="#ffffff"/>
      </button>
    </li>
  );
}
 
export default PrivateContentItem;