import { FunctionComponent, useState, useRef, useEffect, useImperativeHandle } from "react";
import { useEventListener, useHover, useUpdateEffect, useInterval } from 'ahooks';

interface SliderProps {
  value: number, // 当前值
  totalValue: number, // 总的值
  setValue: (value: number) => void,
  vertical?: true // 垂直模式,
  onRef?: any,
  setLastValue?: (value: number) => void
}

const Slider: FunctionComponent<SliderProps> = (props) => {

  const progressRef = useRef<HTMLProgressElement>(null); // 进度条节点
  const progressBoxRef = useRef<HTMLDivElement>(null); // 进度条盒子节点
  const signRef = useRef<HTMLSpanElement>(null); // 进度条指示器
  // ************************************************************************
  const isHovering = useHover(progressBoxRef); // 监听是否悬浮进度条
  const signPosition = useRef<number>(0); // 按下时指示器的位置
  const activeValue = useRef<number>(0); // 按下时的值
  const [isSlide, setIsSlide] = useState<boolean>(false); // 是否滑动
  let activePlan = parseInt(Number((props.value / props.totalValue).toFixed(2)) * 100 + ''); // 进度百分比
  let lastValue = useRef<number>(0); // 最后一次抬起的值
  // **************************************************************************

  /**
   * 监听点击进度条
   */
  useEventListener('click', (e) => {
    let progressWidth = progressRef.current!.offsetWidth;
    let activeValue = parseInt(((e.offsetX * props.totalValue) / progressWidth) + '');
    // console.log(e.offsetX, activeSeconds);
    props.setValue(activeValue);
    if (props.setLastValue) {
      props.setLastValue(activeValue);
    }
  }, { target: progressRef })

  /**
   * 监听指示器的按下 
   */
  useEventListener('mousedown', (e) => {
    // console.log("开始：", e.clientX);
    if (props.vertical) {
      signPosition.current = e.clientY;
    } else {
      signPosition.current = e.clientX;
    }
    setIsSlide(true);
    activeValue.current = props.value;
  }, { target: signRef })

  /**
   * 监听鼠标移动
   */
  useEventListener('mousemove', (e) => {
    if (isSlide) {
      // console.log("按下时移动的距离", e.clientX - signPosition.current);
      if (props.vertical) {
        let moveY = signPosition.current - e.clientY; // 鼠标从点击的那一刻移动的y距离
        let stepValue = parseInt((((props.totalValue * moveY) / document.body.offsetHeight)) * 3 + '') + activeValue.current // 计算当前的秒数
        props.setValue(stepValue);
      } else {
        let moveX = e.clientX - signPosition.current; // 鼠标从点击的那一刻移动的X距离
        let stepValue = parseInt((((props.totalValue * moveX) / document.body.offsetWidth)) * 3 + '') + activeValue.current // 计算当前的秒数
        if (stepValue < 0) {
          stepValue = 0;
        } else if (stepValue > props.totalValue) {
          stepValue = props.totalValue;
        }
        lastValue.current = stepValue; // 最后一次值
        props.setValue(stepValue);
      }
    }
  }, { target: document })

  /**
   * 监听鼠标的抬起
   */
  useEventListener('mouseup', () => {
    setIsSlide(false);

  }, { target: document })

  /**
   * 监听是否滑动
   */
  useUpdateEffect(() => {
    if (isSlide === false) {
      if (props.setLastValue) {
        props.setLastValue(lastValue.current);
      }
    }
  }, [isSlide])
  /**
   * 组件渲染完成后执行，这里获取到的进度条节点的宽度为0，但理论上这个回调是页面渲染完成之后才执行，不应该获取为O啊
   * 加个定时器，延时执行
   */
  useEffect(() => {
    let timer = setTimeout(() => {
      synchronizationPosition();
    }, 500)
    return () => {
      clearTimeout(timer);
    }
  }, [])
  /**
   * 监听seconds的变化，重新渲染进度条
   */
  useUpdateEffect(() => {
    synchronizationPosition();
  }, [props.value])

  /**
   * 暴漏给父组件的方法
   */
  useImperativeHandle(props.onRef, () => {
    return {
      synchronizationPosition
    }
  })
  /**
   * 同步位置
   */
  const synchronizationPosition = () => {
    let progressWidth = progressRef.current?.offsetWidth;
    let stepValue = progressWidth! / props.totalValue; // 当前步长值 px/每秒
    // console.log(progressWidth, stepValue, seconds);
    // 设置指示器的位置
    signRef.current!.style.left = `${stepValue! * props.value - 5}px`
    if (props.value >= props.totalValue) {
      props.setValue(props.totalValue);
      setIsSlide(false);
    } else if (props.value <= 0) {
      props.setValue(0);
      setIsSlide(false);
    }
  }

  return (
    <div className={`flex-1 relative h-2.5 flex items-center ${props.vertical ? 'w-auto' : ''}`} ref={progressBoxRef}>
      <progress className={`progress progress-accent  bg-gray-700 ${isHovering ? 'h-1.5 shadow-sm' : 'h-1'} rounded-md`} ref={progressRef} value={props.value} max={props.totalValue}></progress>
      <span className="flex h-2.5 w-2.5 absolute cursor-pointer" style={{}} ref={signRef}>
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-70"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        <div style={{ display: `${isSlide || isHovering ? 'block' : 'none'}`, transform: `${props.vertical ? 'rotate(90deg)' : ''}` }} className='absolute -top-10 p-1 px-2 rounded-md bg-gray-900 flex justify-center items-center'>
          <span>{`${activePlan}%`}</span>
        </div>
      </span>
    </div>
  );
}

export default Slider;