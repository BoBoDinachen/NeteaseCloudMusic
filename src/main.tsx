import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css' // 引入全局样式
import '@icon-park/react/styles/index.css'; // 引入inco-park的图标样式
import App from '~/views/App';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
)

