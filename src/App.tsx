import { useEffect, useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { setUser } from './store/slices/user';
import { useRefreshQuery } from'./services/auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { publicRoutes, privateRoutes, adminRoutes } from './routes/routes';
// import { useWhyDidYouUpdate } from './hooks';

function App() {
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const { data, isLoading } = useRefreshQuery('', {skip});
  const { user } = useSelector((state: RootState) => state.user);

  // useWhyDidYouUpdate('App', {skip, data, isLoading, user});

  const routes = user && user.roles.includes('admin') ? 
    [...publicRoutes, ...privateRoutes, ...adminRoutes] :
    user ? [...publicRoutes, ...privateRoutes] :
    publicRoutes
  ;

  useEffect(
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
      }
    },
    [data, dispatch]
  )
  
  return (
    <div className="App">
      <BrowserRouter>
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
      </BrowserRouter> 
    </div>
  );
}

export default App;