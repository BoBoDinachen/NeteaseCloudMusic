import { FunctionComponent } from "react";
import testImg from '~/assets/images/test.jpg';
import { PlayOne } from '@icon-park/react';
import { unitConverter } from '~/utils/BaseUtil';
import { SongMenuType } from '~/types/index';

interface SongMenuProps {
  menuItem: SongMenuType
}

const SongMenu: FunctionComponent<SongMenuProps> = (props) => {
  return (
    <li className='flex flex-col justify-between w-50 h-50 relative cursor-pointer'>
      <img src={props.menuItem.picUrl} className='h-50 object-cover rounded-md' alt="" />
      <span className=' text-sm overflow-ellipsis text-gray-300 overflow-hidden h-12 py-1 break-all hover:text-white'>
        {props.menuItem.name}
      </span>
      <div className='flex items-center absolute right-1 top-1'>
        <PlayOne theme="outline" size="18" fill="#ffffff" />
        <span className='text-xs'>{unitConverter(props.menuItem.playCount)}</span>
      </div>
    </li>
  );
}

export default SongMenu;