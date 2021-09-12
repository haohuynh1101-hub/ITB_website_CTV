/* eslint-disable react/display-name */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { APP_CONSTANTS } from '@/constants';
import { useAppDispatch } from '@/hooks';
import { getMeAsync } from '@/redux/reducers';

const withAuthentication = (Component, url?: string) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const fetchMe = async () => {
      const token = localStorage.getItem(APP_CONSTANTS.AUTH);
      // try {
      //   await AuthApi.getMe();
      //   return true;
      // } catch (error) {
      //   return false;
      // }
      if (!token) {
        return false;
      }

      return true;
    };

    /**
     * Case 1: chưa có auth nhưng muốn truy cập vào url khác
     * Case 2: chưa có auth nhưng đã vào đúng url login
     * @returns
     */
    const processNotAuthenticated = async () => {
      // chưa loggin nhưng muốn cố tình truy cập bằng cách thay đổi url
      if (router.pathname !== '/login') {
        await router.push('/login');
      }
      setIsLoading(false);
      return;
    };

    /**
     * Case 1: Đã có auth nhưng muốn quay lại trang login sẽ bị đá về trang home
     * Case 2: Đã có auth cho phép truy cập các url khác ngoài login
     * @returns
     */
    const processAuthenticated = async () => {
      const result = await dispatch(getMeAsync());
      if (result.meta.requestStatus === 'rejected') {
        await router.push('/login');
        setIsLoading(false);
        return;
      }
      if (router.pathname == '/login') {
        await router.push('/');
        return;
      }
      //logged in but wanna to login page
      setIsLoading(true);
      await router.push(url);
      setIsLoading(false);
    };
    useEffect(() => {
      const getAuth = async () => {
        const isAuth = await fetchMe();
        if (!isAuth) {
          return processNotAuthenticated();
        }

        return processAuthenticated();
      };
      getAuth();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.pathname]);

    // const checkAuth = async () => {
    //   const token = localStorage.getItem(APP_CONSTANTS.AUTH);
    //   if (!token) {
    //     await router.push('/login');
    //     setIsLoading(false);
    //     return;
    //   } else {
    //     try {
    //       const result = await dispatch(getMeAsync());
    //       if (result.meta.requestStatus === 'rejected') {
    //         router.push('/login');
    //         setIsLoading(false);
    //         return;
    //       }

    //       router.push(url);
    //       setIsLoading(false);
    //       return;
    //     } catch (error) {
    //       return router.push('/login');
    //     }
    //   }
    // };

    // useEffect(() => {
    //   Promise.all([checkAuth()]);

    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [router.pathname]);

    if (isLoading) {
      return <div>loading</div>;
    }

    return <Component {...props} />;
  };
};

export { withAuthentication };
