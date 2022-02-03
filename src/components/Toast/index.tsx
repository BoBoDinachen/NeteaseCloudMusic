import Toast from './Toast';
import ReactDOM from 'react-dom';

interface propsType {
  type: 'success' | 'info' | 'warning' | 'error',
  message: string,
  time?: number // 持续时间
}

export const useToast = (props: propsType) => {
  // 检查节点
  const toastElement = document.getElementById('toast-box');
  if (toastElement === null) {
    // 如果为null，则创建容器,追加到body中
    let element = document.createElement('div');
    element.id = 'toast-box';
    document.body.appendChild(element);
    // 将toast组件挂载到容器中
    ReactDOM.render(<Toast {...props} />, element);
  } else {
    ReactDOM.render(<Toast {...props} />, toastElement);
  }
}
