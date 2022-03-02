import { Suspense, lazy } from 'react';
import { BrowserRouter, RouteObject, useRoutes } from 'react-router-dom';

import LayOut from '~/layout/index';
import Loading from '~/components/Loading/index';

const Hello = lazy(() => import('~/views/Hello/index')); // 欢迎
const Login = lazy(() => import('~/views/Login')); // 登录
const FindMusic = lazy(() => import('~/views/FindMusic/index')); // 发现音乐
const Recommend = lazy(() => import('~/views/Recommend/index')); // 个性推荐
const SongMenuList = lazy(() => import('~/views/SongMenuList/index')); // 歌单
const RankingList = lazy(() => import('~/views/RankingList/index')); // 排行榜
const SingerList = lazy(() => import('~/views/SingerList/index')); // 排行榜


export const Router = () => {
  /**
 * 重定向到/app/findMusic
 */
  if (window.location.pathname === '/') {
    // window.location.pathname = '/app/findMusic'
  }
  return (
    <BrowserRouter basename="/app" >
      <InnerRouter />
    </BrowserRouter>
  )
}
const InnerRouter = () => {
  // 路由信息
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <LayOut />,
      children: [
        {
          path: '/',
          element: <FindMusic />,
          children: [
            {
              index: true,
              element: <Recommend />
            },
            {
              path: '/songMenuList',
              element: <SongMenuList />
            },
            {
              path: '/rankingList',
              element: <RankingList />
            },
            {
              path: '/singerList',
              element: <SingerList />
            }
          ]
        },
        {
          index: false,
          path: "/hello",
          element: <Hello />
        },
      ]
    },
    {
      path: '*',
      element: <Loading />
    }
  ]
  const element = useRoutes(routes);

  return element
}