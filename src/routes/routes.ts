import { lazy } from 'react';
const Home = lazy(() => import("../pages/Home/Home"));
const Chats = lazy(() => import("../pages/Chats/Chats"));
const ResetPassword = lazy(() => import('../pages/ResetPassword/ResetPassword'));
const Admin = lazy(() => import('../pages/Admin/Admin'));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

const publicRoutes = [
  { path: '/', element: Home },
  { path: '/resetPassword/:link', element: ResetPassword },
  { path: '*', element: NotFound },
];

const privateRoutes = [
  { path: 'chats', element: Chats },
];

const adminRoutes = [
  { path: 'admin/*', element: Admin }, // звездочка нужна для того чтобы отличать вложенные роуты от родительского, если есть вложенные роуты, то * обязательна
];

export {
  publicRoutes,
  privateRoutes,
  adminRoutes
};