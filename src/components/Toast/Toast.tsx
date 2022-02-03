import { FunctionComponent, useEffect } from "react";
import {Info,EmotionHappy,Caution,Forbid} from '@icon-park/react';
import ReactDOM from 'react-dom';

interface ToastProps {
  type: 'success' | 'info' | 'warning' | 'error',
  message: string,
  time?: number
}

const Toast: FunctionComponent<ToastProps> = (props) => {
  useEffect(() => {
    // 定时销毁自身
    let tiemr = setTimeout(() => {
      ReactDOM.unmountComponentAtNode(document.getElementById('toast-box')!); // 定时卸载组件
    },props.time === undefined ? 2000: props.time)
    return () => {
      clearTimeout(tiemr); // 清除定时器
    }
  },[])
  return (
    <div className={`alert w-max absolute top-2 m-auto left-0 right-0  z-50
    ${props.type === 'success' ? 'alert-success' :
      (props.type === 'info' ? 'alert-info' : (
        props.type === 'warning' ? 'alert-warning' :
          'alert-error'
      ))
    }`
    }>
      <div className="flex-1 space-x-3">
        {props.type === 'info' && <Info theme="outline" size="24" fill="#4a90e2" />}
        {props.type === 'success' && <EmotionHappy theme="outline" size="24" fill="#7ed321"/>}
        {props.type === 'warning' && <Caution theme="outline" size="24" fill="#f5a623"/>}
        {props.type === 'error' && <Forbid theme="outline" size="24" fill="#df3e4d"/>}
        
        <label>{ props.message}</label>
      </div>
    </div>
  );
}

export default Toast;