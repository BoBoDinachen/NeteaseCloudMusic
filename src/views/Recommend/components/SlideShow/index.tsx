import { FunctionComponent, useEffect, useRef, useState } from "react";
import styles from './index.module.css';
import { Left, Right } from '@icon-park/react';
import { useInterval } from "ahooks";

interface SlideShowProps {
  imgUrlList: { url: string, title: string }[] // 图片地址列表
  dir: { name: string }[] // 图片位置信息
  setDir: ([]:any) => void
}

const SlideShow: FunctionComponent<SlideShowProps> = (props) => {

  const timer = useRef<number>();
  const [currentKey, setCurrentKey] = useState<number>(0);
  const index = useRef<number>(0);
  
  // 自动播放轮播图
  useInterval(() => {
    index.current += 1;
    if (index.current > props.imgUrlList.length-1) {
      index.current = 0;
    } else if (index.current < 0) {
      index.current = props.imgUrlList.length-1;
    }
    pointFunc(index.current);
  }, 4000)

  // 点击图片
  function slide(name: string, key: number) {  // 图片点击逻辑
    // 记录当前节点
    setCurrentKey(key);
    // 数组操作方法
    imgArr(name);
  }
  // 图片数组排序
  function imgArr(name: string) { // 数组处理
    let dirCopy = props.dir;
    if (name === 'start') {  // 点击左侧那张
      const shift = dirCopy.shift(); // 从数组头部弹出一个元素
      dirCopy.push(shift!);  // 添加到数组尾部
      
    } else if (name === 'end') { // 点击右侧那张
      const pop = dirCopy.pop(); // 从数组尾部弹出一个元素
      dirCopy.unshift(pop!); // 尾部元素添加到数组头部
    }
    props.setDir(dirCopy); // 保存重新排列的数组 并触发render
  }
  // 点击图标
  function pointFunc(index: number) { // 按钮点击
    const dirCopy = props.dir;
    if (index <= currentKey!) { // 鼠标经过左侧的按钮
      for (let i = 0; i < (currentKey! - index); i += 1) { // 判断距离
        const shift = dirCopy.shift(); // 进行数组操作
        dirCopy.push(shift!);
      }
    } else if (index >= currentKey!) { // 鼠标经过右侧的按钮
      for (let i = 0; i < (index - currentKey!); i += 1) {
        const pop = dirCopy.pop();
        dirCopy.unshift(pop!);
      }
    }
    props.setDir(dirCopy) // 触发react-render重新渲染页面
    setCurrentKey(index); // 记录当前图片节点
  }

  return (
    <div className='w-full mt-2'>
      {/* 外部容器*/}
      <div className='w-full h-40 mx-0 m-auto relative'>
        {/* 内部循环*/}
        {
          props.imgUrlList?.map((item, key) => {
            return (
              <div key={key} className={`${styles.slide} ${styles[props.dir[key]?.name]}`}>
                <img src={item.url} className='rounded-lg'></img>
                {/* <span className={`text-xs p-1 w-max absolute right-0 text-center bg-indigo-700 ${dir[key].name === 'middle'?'-bottom-5':'bottom-0.5'}`}>{ item.title}</span> */}
              </div>
            );
          })
        }
        {/* 导航按钮*/}
        <div className={styles.point}>
          {
            props.dir.map((item, key) => { // 根据图片数量进行循环
              return (
                <span
                  key={key}
                  className={item.name === 'start' ? styles.hover : 'bg-gray-600'} // 给予当前显示的按钮样式变化
                  onMouseEnter={() => pointFunc(key)} // 鼠标进入动画
                >{ }</span>
              );
            })
          }
        </div>
        {/* 左侧按钮 */}
        <div onClick={() => { pointFunc(--index.current) }} className='absolute top-0 bottom-0 left-0 m-auto z-40 btn border-0 btn-xs btn-circle bg-gray-500'>
          <Left theme="outline" size="20" fill="#ffffff" />
        </div>
        {/* 右侧按钮 */}
        <div onClick={() => { pointFunc(++index.current) }} className='absolute top-0 bottom-0 m-auto right-0 z-40 btn border-0 btn-xs btn-circle bg-gray-500'>
          <Right theme="outline" size="20" fill="#ffffff" />
        </div>
      </div>
    </div>
  );
}

export default SlideShow;