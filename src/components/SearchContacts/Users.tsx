import { useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Box, LinearProgress } from '@mui/material';
import { useLazySearchUserQuery } from '../../services/user';
import SearchUserForm from './SearchUserForm';
import { IUser } from '../../types/user';
import { IPaginatedData } from '../../types/paginatedData';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../helpers';
import { Snackbar } from '../../components';
import { useSnackbar } from '../../hooks';
import User from './User';
import { selectUser } from '../../store/slices/user/selectors/selectUser';

function Users() {
  const nameRef = useRef('');
  const pageRef = useRef(1);
  const limitRef = useRef(25);
  const currentUser = useSelector(selectUser);
  const [ search, {isLoading} ] = useLazySearchUserQuery(); 
  const [ responseData, setResponseData ] = useState<IPaginatedData<IUser> | null>(null);
  const { msg, setMessage, removeMessage } = useSnackbar(undefined);  
  
  const searchUser = useCallback(
    async function(name?: string) { 
      try {
        if (name) { // если сделали запрос с новым именем пользователя.
          nameRef.current = name;
          pageRef.current = 1;
        }
        const result = await search({name: name ?? nameRef.current, page: pageRef.current, limit: limitRef.current}).unwrap();
        const users = responseData && !name ? [...responseData.data, ...result.data] : [...result.data];
        const newData = {...result, data: users.filter((user) => user._id !== currentUser?._id)} // Внимание! при помощи фильтра удаляем текущего юзера из списка
        setResponseData(newData);
      }
      catch (err) {
        if (isFetchBaseQueryError(err)) {
          const errMsg = 'error' in err ? err.error : (err.data as {message: string}).message;
          setMessage({type: 'error', text: errMsg, duration: 6000});
        } 
        else if (isErrorWithMessage(err)) {
          setMessage({type: 'error', text: err.message, duration: 6000});
        }
      }
    },
    [search, responseData, setMessage, currentUser?._id]
  );

  const observer = useRef<IntersectionObserver>();
  const lastUserRef = useCallback((user: Element) => { // Использовали useCallback как useRef (это называется Callback Ref, функция переданная в useCallback будет отрабатывать всегда когда значение lastUserRef.current изменяется).  user - в данном случае последний <User/>
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((users) => {
      if (responseData) {
        const hasNextPage = (responseData.totalNumberOfMatches / responseData.limit) > responseData.currentPage;
        if (users[0].isIntersecting && hasNextPage) { // Мы следим только за последним <User/>, поэтому сразу обращаемся к одному <User/> (user[0])
          // console.log('Last user');
          pageRef.current = pageRef.current + 1;
          searchUser()
        }
      }
    })
    if (user) observer.current.observe(user);
  }, [isLoading, responseData, searchUser]);

  function closeHandler() {
    removeMessage();
  }
  
  return (
    <Box className='user-contacts'>
      <SearchUserForm
        isLoading={isLoading}
        onSubmit={searchUser}
      />
      <Box className='search-results'>
        { 
          responseData ?
          responseData.data.map((user, index) => {
            if (responseData.data.length === index + 1) {
              return <User key={user._id} user={user} ref={lastUserRef}/> // ref добавляем только для последнего <User/>
            }
            return <User key={user._id} user={user}/>
          }) : 
          isLoading ? <LinearProgress/> :
          null
        }
      </Box>      
      <Snackbar
        open={!!msg.text}
        autoHideDuration={msg.duration} 
        onClose={closeHandler}
        message={msg.text}
        severity={msg.type}
      />
    </Box>
  )
}

export default Users;