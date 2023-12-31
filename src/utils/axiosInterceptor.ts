import Api from './axiosConfig';
import axios from 'axios';
import { deleteAuth, getId } from './authConfig';
import { toast } from 'react-toastify';

const AxiosInterceptor = (navigate: any) => {
  Api.interceptors.request.use(
    async (config) => {
      console.log('request interceptor');

      /*if (isInValidToken()) {
        console.log('token refresh request');

        await axios.get(`/users/${getId()}/refresh`);

        updateAuth();
      }*/

      return config;
    },
    (error) => {
      console.log('refresh error' + error);
    },
  );

  Api.interceptors.response.use(
    function (response) {
      console.log('response interceptor');
      return response;
    },
    async function (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          console.log('token refresh response error');

          await axios.get(`/users/${getId()}/logout`);

          deleteAuth();

          navigate('/sign-in');

          return false;
        } else {
          toast.error(error.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          return false;
        }
      }
      return Promise.reject(error);
    },
  );
};

export default AxiosInterceptor;
