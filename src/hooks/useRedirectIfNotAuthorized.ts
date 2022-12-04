import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';

// Если пользователь вошел, то его должно редиректить со страниц типа 'страница логина', 'регистрации' и 'восстановления пароля'

export function useRedirectIfNotAuthorized(path: string) {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect( 
    function() {
      if (user) {
        navigate(path, { replace: true });
      }
    },
    [user, navigate, path]
  );
}

/**
 * useEffect ждет полного завершения рендера компонента в котором используется данны хук и только потом отрабатывает.
 * Без useEffect, рендер начинается, но не успевает завершиться и мы редиректимся, из-зи этого выскакивает warning.
 * Сдесь так-же можно было использовать useLayoutEffect, он отрабатывает асинхронно что значит он не дает рендеру
 * начаться пока сам не отработает и ворнинга не возникает, но это замедляет работу компонента и к тому-же как часто 
 * залогинившийся пользователь решит посетить страницы с которых их редиректит по умолчанию, поэтому выбран useEffect.
 */