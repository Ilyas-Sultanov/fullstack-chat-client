import './Layout.scss';
import { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import Header from '../../components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useRefreshQuery } from'../../services/auth';
import { publicRoutes, privateRoutes, adminRoutes, openRoutes } from '../../routes/routes';
import { selectUser } from '../../store/slices/user/selectors/selectUser';
import { setUser } from '../../store/slices/user';

function Layout() {
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const { data, isLoading } = useRefreshQuery('', {skip});
  const user = useSelector(selectUser);

  const routes = user && user.roles.includes('admin') ? 
    [...privateRoutes, ...adminRoutes, ...openRoutes] :
    user ? [...privateRoutes, ...openRoutes] :
    [...publicRoutes, ...openRoutes]
  ;  

  useEffect( // refrash tokens
    function() {
      const token = localStorage.getItem('token');
      if (token && !user) {
        setSkip(false);
      }
    },
    [user]
  )

  useEffect(
    function() {
      if (data) {
        dispatch(setUser(data.user));
        localStorage.setItem('token', data.accessToken);
        setSkip(true);
      }
    },
    [data, dispatch]
  )

  return (
    <BrowserRouter>
      <Header/>
      <Container maxWidth={false} className='layout'>
          {
            isLoading && !user ?
            <div>Loading...</div> :
            <Routes>
              {
                routes.map((route) => 
                  <Route 
                    key={ route.path }
                    path={ `${route.path}` } 
                    element={ 
                      <Suspense fallback={<div>Loading...</div>}>
                        <route.element />
                      </Suspense>
                    }
                  />
                )
              }
            </Routes>
          } 
      </Container>
    </BrowserRouter> 
  )
}

export default Layout;
