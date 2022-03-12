import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css' // 引入全局样式
import '@icon-park/react/styles/index.css'; // 引入inco-park的图标样式
import App from '~/views/App';

ReactDOM.render(
  <App></App>
  ,
  document.getElementById('root')
)