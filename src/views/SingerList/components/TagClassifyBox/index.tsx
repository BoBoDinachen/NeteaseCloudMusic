import { FunctionComponent, useMemo, useState } from "react";

interface TagClassifyBoxProps {
  activeTag1: string,
  activeTag2: string,
  activeTag3: string,
  setactiveTag1: (value: '-1'|'7'|'96'|'8'|'16'|'0') => void
  setactiveTag2: (value: '-1'|'1'|'2'|'3') => void
  setactiveTag3: (value: string) => void
}

const TagClassifyBox: FunctionComponent<TagClassifyBoxProps> = (props) => {
  const tagList1Map: any = {
    '全部': '-1',
    '华语': '7',
    '欧美': '96',
    '日本': '8',
    '韩国': '16',
    '其他': '0'
  }
  const tagList2Map: any = {
    '全部': '-1',
    '男歌手': '1',
    '女歌手': '2',
    '乐队组合': '3'
  }
  const tagList1 = useMemo(() => ['全部', '华语', '欧美', '日本', '韩国', '其他'], []);
  const tagList2 = useMemo(() => ['全部', '男歌手', '女歌手', '乐队组合'], []);
  //26个大写字母
  const tagList3 = useMemo(() => {
    let str = [];
    for (var i = 97; i < 123; i++) {
      str.push(String.fromCharCode(i));
    }
    return str;
  }, []);

  return (
    <div className='w-full flex flex-col space-y-2'>
      {/* Tag1 语种标签 */}
      <div className='w-full flex justify-start items-center'>
        <span className='text-gray-400 mr-5 text-sm'>语种:</span>
        <ul className='flex justify-start flex-1 space-x-5'>
          {
            tagList1.map((item, index) => {
              return (
                <li key={index} className='flex justify-center w-16'>
                  <button onClick={() => {props.setactiveTag1(tagList1Map[item])}} className={
                    `
                      btn btn-ghost text-gray-300 btn-sm hover:text-yellow-500
                      ${props.activeTag1 === tagList1Map[item] ? 'text-yellow-500' : ''}
                    `
                  }>{item}</button>
                </li>
              )
            })
          }
        </ul>
      </div>
      {/* Tag2 分类 */}
      <div className='w-full flex justify-start items-center'>
        <span className='text-gray-400 mr-5 text-sm '>分类:</span>
        <ul className='flex justify-start flex-1 space-x-5'>
          {
            tagList2.map((item, index) => {
              return (
                <li key={index} className='w-16 flex justify-center'>
                  <button onClick={() => {props.setactiveTag2(tagList2Map[item])}} className={
                    `
                      btn btn-ghost text-gray-300 btn-sm hover:text-yellow-500
                      ${props.activeTag2 === tagList2Map[item] ? 'text-yellow-500' : ''}
                    `
                  }>{item}</button>
                </li>
              )
            })
          }
        </ul>
      </div>
      {/* Tag3 筛选 */}
      <div className='w-full flex justify-start items-start'>
        <span className='text-gray-400 mr-5 text-sm pt-1'>筛选:</span>
        <ul className='grid grid-cols-12 flex-1 '>
          <li className='flex justify-center w-16'>
            <button onClick={() => {props.setactiveTag3('-1')}} className={
              `
                btn btn-ghost text-gray-300 btn-sm hover:text-yellow-500
                ${props.activeTag3 === '-1' ? 'text-yellow-500' : ''}
              `
            }>热门</button>
          </li>
          {
            tagList3.map((item, index) => {
              return (
                <li key={index} className='flex justify-center w-16'>
                  <button onClick={() => {props.setactiveTag3(item)}} className={
                    `
                      btn btn-ghost text-gray-300 btn-sm hover:text-yellow-500
                      ${props.activeTag3 === item ? 'text-yellow-500' : ''}
                    `
                  }>{item}</button>
                </li>
              )
            })
          }
          <li className='flex justify-center w-16'>
            <button onClick={() => {props.setactiveTag3('0')}} className={
              `
                btn btn-ghost text-gray-300 btn-sm hover:text-yellow-500
                ${props.activeTag3 === '0' ? 'text-yellow-500' : ''}
              `
            }>#</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TagClassifyBox;