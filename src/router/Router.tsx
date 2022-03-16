import { lazy, Suspense } from 'react';
import { BrowserRouter, RouteObject, useRoutes } from 'react-router-dom';

import LayOut from '~/layout/index';
import Loading from '~/components/Loading/index';

const Hello = lazy(() => import('~/views/Hello/index')); // 欢迎
const Login = lazy(() => import('~/views/Login')); // 登录
const FindMusic = lazy(() => import('~/views/FindMusic/index')); // 发现音乐
const SingerList = lazy(() => import('~/views/SingerList/index')); // 歌手
const SongMenuDetails = lazy(() => import('~/views/SongMenuDetails/index')); // 歌单详情
const MusicList = lazy(() => import('~/views/SongMenuDetails/components/MusicList/index')); // 歌单详情 --- 歌曲列表
const CommentList = lazy(() => import('~/views/SongMenuDetails/components/CommentList/index')); // 歌单详情 --- 评论列表
const CollectorList = lazy(() => import('~/views/SongMenuDetails/components/CollectorList/index')); // 歌单详情 --- 收藏者列表


/**
 * 需要缓存的页面
 */
const Recommend = lazy(() => import('~/views/Recommend/index')); // 个性推荐
const SongMenuList = lazy(() => import('~/views/SongMenuList/index')); // 歌单
const RankingList = lazy(() => import('~/views/RankingList/index')); // 排行榜
const NewSongList = lazy(() => import('~/views/NewSongList/index')); // 新歌列表

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
            },
            {
              path: '/newSongList',
              element: <NewSongList />
            }
          ]
        },
        {
          path: "/songMenuDetails/:songMenuId",
          element: <SongMenuDetails />,
          children: [
            {
              index: true,
              path: 'musicList',
              element: <MusicList></MusicList>
            },
            {
              path: 'commentList',
              element: <CommentList></CommentList>
            },
            {
              path: 'collectorList',
              element: <CollectorList></CollectorList>
            }
          ]

        },
        {
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

  return (
    element
  )
}