import { Cup, Earth, Fire, GrinningFaceWithOpenMouth, Platte, Windmill } from "@icon-park/react";
import { useClickAway } from "ahooks";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { getSongCatlist } from '~/services/api/songList';

interface TagListBoxProps {
  show: boolean, // 控制显示
  activeTag: string // 当前活动的标签
  boxRef: any,
  setActiveTag: (name: string) => void
  setShowTagListBox: (value: boolean) => void
}

const TagListBox: FunctionComponent<TagListBoxProps> = (props) => {
  const [songCatList, setSongCatList] = useState<{ type: number, name: string, hot: boolean }[]>([]); // 分类标签列表
  const [categories, setCategories] = useState<{ type: number, name: string }[]>([]); // 种类列表
  /**
   * 加载歌单分类列表
   */
  useEffect(() => {
    getSongCatlist().then((res: any) => {
      console.log(res);
      let categorieList: { type: number, name: string, hot: boolean }[] = [];
      let tagList: { type: number, name: string }[] = [];

      let map = new Map();
      for (let key in res.categories) {
        map.set(key, res.categories[key]);
      }
      for (const key of map.keys()) {
        tagList.push({ type: Number(key), name: map.get(key) })
      }
      res.sub.forEach((item: any, index: number) => {
        categorieList.push({ type: item.category, hot: item.hot, name: item.name });
      });
      setCategories(tagList);
      setSongCatList(categorieList);
    })
  }, [])

  /**
   * 点击选择每个标签
   * @param name 标签名字
   */
  const handleSelectTag = (name: string) => {
    props.setActiveTag(name);
    props.setShowTagListBox(false);
  }

  return (
    <div ref={props.boxRef} style={{ visibility: props.show ? 'visible' : 'hidden' }} className='flex flex-col w-4/6 bg-gray-800 rounded-md absolute top-10 z-50 text-gray-200'>
      {/* 全部歌单 */}
      <div className='w-full h-10 p-7  flex items-center border-b border-gray-600'>
        <span className='cursor-pointer hover:text-yellow-500'>全部歌单</span>
      </div>
      <div className='w-full flex flex-col text-sm'>
        {
          categories.map((tag, index) => {
            return (
              <div className='w-full p-5 flex justify-between items-start' key={tag.type}>
                <div className='flex h-full items-center space-x-2'>
                  {tag.type === 0 && <Earth theme="outline" size="24" fill="#ffffff" strokeWidth={2} />}
                  {tag.type === 1 && <Windmill theme="outline" size="24" fill="#ffffff" strokeWidth={2} />}
                  {tag.type === 2 && <Cup theme="outline" size="24" fill="#ffffff" strokeWidth={2} />}
                  {tag.type === 3 && <GrinningFaceWithOpenMouth theme="outline" size="24" fill="#ffffff" strokeWidth={2} />}
                  {tag.type === 4 && <Platte theme="outline" size="24" fill="#ffffff" strokeWidth={2} />}
                  <span className='text-gray-500'>{tag.name}</span>
                </div>
                <ul className='ml-16 flex-1 grid grid-cols-5 gap-x-5 gap-y-4'>
                  {
                    songCatList.map((category, index) => {
                      if (tag.type === category.type) {
                        return (
                          <li key={index}>
                            <div className="indicator">
                              {category.hot ? <span className="indicator-item "><Fire theme="filled" size="16" fill="#ee3131" strokeWidth={2}/></span> : <></>}
                              <button onClick={() => {handleSelectTag(category.name)}} className="btn btn-xs text-gray-300 hover:text-yellow-500">{category.name}</button>
                            </div>
                          </li>
                        )
                      }
                    })
                  }
                </ul>
              </div>
            )
          })
        }
      </div>

      {/* 语种 */}

      {/* 风格 */}
      {/* 场景 */}
      {/* 情感 */}
      {/* 主题 */}

    </div>
  );
}

export default TagListBox;