import useSWR from 'swr';
import { IUser } from '@typing/db';
import fetcher from '@util/fetcher';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ISignInUser, ISignUpUser } from '@typing/user';
import Api from '@util/axiosConfig';
import { createAuth, deleteAuth, getId } from '@util/authConfig';
import axios from 'axios';

/*
 * dedupingInterval을 사용하지 않으면 다른 텝을 갔다가 오는 경우 재요청을 보내게 되고 dedupingInterval 옵션을 추가하게 되면 그 시간안에는 탭을 갔다와도 재요청을 보내지 않고 캐시해서 그대로 데이터를 사용하다가 그 시간이 끝나면 다시 재요청
 * */

export type UseUserHookType = {
  user: any;
  userMutate: any;
  isLoading: any;
  signUp: any;
  signIn: any;
  logout: any;
  userQuery: any;
  updateUser: any;
  isEqualPassword: any;
};

const useUser = () => {
  const navigate = useNavigate();
  const {
    data: user,
    mutate: userMutate,
    isLoading,
  } = useSWR<IUser | boolean>(
    getId() ? `/api/users/${getId()}` : null,
    fetcher,
    {
      dedupingInterval: 60000, // 60초동안은 캐쉬에서 호출하겠다.
    },
  );

  const signUp = useCallback(
    async (params: ISignUpUser) => {
      try {
        const response = await Api.post(`/api/users/sign-up`, params, {
          withCredentials: true,
        });
        if (response.status === 201) {
          toast.success('회원가입 성공~ 로그인 창으로 이동합니다~', {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          await userMutate();
          navigate('/sign-in');
        }
      } catch (error: any) {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    [userMutate, navigate],
  );

  const signIn = useCallback(
    async (params: ISignInUser) => {
      try {
        const response = await axios.post(`/api/users/sign-in`, {
          ...params,
        });
        if (response.status === 200) {
          createAuth(response.data.id);
          // await userMutate(); 여기서 동작을 안한다 이유가 뭐지
          navigate('/dashboard');
        }
      } catch (error: any) {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    [navigate],
  );

  const logout = useCallback(async () => {
    await Api.get(`/api/users/${getId()}/logout`);
    deleteAuth();
    navigate('/sign-in');
  }, [navigate]);

  const isEqualPassword = useCallback((param: string) => {
    return param === '123';
  }, []);

  const updateUser = useCallback(
    async (params: ISignUpUser) => {
      const response = await Api.put(`/api/users/${getId()}`, {
        ...params,
      });
      if (response.status === 204) {
        alert('성공');
        await userMutate();
      } else {
        alert('실패야');
      }
    },
    [userMutate],
  );

  const userQuery = useCallback(async () => {
    const response = await Api.get('/api/users');
    console.log(response.data);
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return {
    user,
    userMutate,
    isLoading,
    signUp,
    signIn,
    logout,
    userQuery,
    updateUser,
    isEqualPassword,
  };
};

export default useUser;
