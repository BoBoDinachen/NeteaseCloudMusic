import { Suspense, lazy } from 'react';
import { BrowserRouter, RouteObject, useRoutes } from 'react-router-dom';
import LayOut from '~/layout/index';
import Loading from '~/components/Loading/index';

const Hello = lazy(() => import('~/views/Hello/index')); // 欢迎
const Login = lazy(() => import('~/views/Login')); // 登录

export const Router = () => {
  /**
 * 重定向到/app/hello
 */
  if (window.location.pathname === '/') {
    window.location.pathname = '/app/hello'
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
          index: true,
          path: "/hello",
          element: <Hello />
        }
      ]
    },
    {
      path: '*',
      element: <Loading />
    }
  ]
  const element = useRoutes(routes);

  return (
    <Suspense fallback={<Loading />}>{element}</Suspense>
  )
}