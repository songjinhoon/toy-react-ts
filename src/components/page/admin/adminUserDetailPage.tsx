import { useNavigate } from 'react-router-dom';
import useUser, { IUseUserHook } from '@hooks/useUser';
import React, { useEffect } from 'react';
import { AdminBlock, Content } from './styles';
import LeftMenu from '@components/organism/skeleton/layout/LeftMenu';
import UserUpdateForm from '@components/organism/user/userUpdateForm';

const AdminUserDetailPage = () => {
  const navigate = useNavigate();
  const { user, isLoading }: IUseUserHook = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/sign-in');
    }
  }, [navigate, user, isLoading]);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <>
      {/*<Header></Header>*/}
      <AdminBlock>
        <LeftMenu></LeftMenu>
        <Content>
          <UserUpdateForm type={'page'} _onCancel={() => {}}></UserUpdateForm>
        </Content>
      </AdminBlock>
    </>
  );
};

export default AdminUserDetailPage;
