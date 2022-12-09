import { lazy } from 'react';
const Home = lazy(() => import("../pages/Home/Home"));
const Chats = lazy(() => import("../pages/Chats/Chats"));
const ResetPassword = lazy(() => import('../pages/ResetPassword/ResetPassword'));
const Admin = lazy(() => import('../pages/Admin/Admin'));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

const publicRoutes = [ // доступ только для не вошедших пользователей
  { path: '/', element: Home },
  { path: '/resetPassword/:link', element: ResetPassword },
];

const privateRoutes = [ // доступ только для вошедших пользователей
  { path: 'chats', element: Chats },
];

const adminRoutes = [ // доступ только для админа
  { path: 'admin/*', element: Admin }, // звездочка нужна для того чтобы отличать вложенные роуты от родительского, если есть вложенные роуты, то * обязательна
];

const openRoutes = [ // доступно всем
  { path: '*', element: NotFound },
]

export {
  publicRoutes,
  privateRoutes,
  adminRoutes,
  openRoutes
};