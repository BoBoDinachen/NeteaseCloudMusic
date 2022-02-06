import { useClickAway, useEventEmitter, useGetState } from "ahooks";
import { FunctionComponent, useImperativeHandle, useRef, useState } from "react";
import Slider from '~/components/Slider/index';
import { useAppContext} from '~/context/AppContext';

interface VolumeControlProps {
  show: boolean,
  setShow: (value: boolean) => void,
  onRef?: any,
}

const VolumeControl: FunctionComponent<VolumeControlProps> = (props) => {
  // const [volume, setVolume, getVolume] = useGetState<number>(70); // 当前音量
  const [totalVolume, setTotalVolume] = useState<number>(100); // 总音量
  const progressBoxRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef() as any;
  const {state,dispatch } = useAppContext();

  /**
   * 隐藏音量控制
   */
  useClickAway(() => {
    props.setShow(false);
  }, progressBoxRef)

  /**
   * 显示音量控制
   */
  const showVolumeControl = () => {
    props.setShow(true);
    progressRef.current.synchronizationPosition();
  }

  /**
   * 暴漏方法给父组件
   */
  useImperativeHandle(props.onRef,() => {
    return {
      showVolumeControl
    }
  })
  return (
    <div ref={progressBoxRef} className='w-56 absolute bottom-44 -right-5 bg-gray-600 p-3 rounded-sm' style={{ transform: "rotate(-90deg)", display: `${props.show ? 'block' : 'none'}` }}>
      <Slider onRef={progressRef} totalValue={totalVolume} vertical value={state.currentVolume} setValue={(value) => { dispatch({type:'setCurrentVolume',playload:value}) }}></Slider>
    </div>
  );
}

export default VolumeControl;