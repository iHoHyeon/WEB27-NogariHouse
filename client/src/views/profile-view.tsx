/* eslint-disable no-underscore-dangle */
import React, { useEffect, useRef, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from 'styled-components';

import followingListState from '@atoms/following-list';
import { isOpenChangeProfileImageModalState } from '@atoms/is-open-modal';
import userState from '@atoms/user';
import LoadingSpinner from '@common/loading-spinner';
import DefaultButton from '@common/default-button';
import useIsFollowingRef from '@hooks/useIsFollowingRef';
import { IUserDetail } from '@src/interfaces';

const ProfileViewLayout = styled.div`
  position:relative;
  display: flex;
  flex-direction: column;

  width: 80%;
  height: 100%;
  margin: auto;
`;

const ImageAndFollowButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LargeProfileImageBox = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 30%;

  &:hover{
    cursor: ${(props: {isMine:boolean}) => (props.isMine && 'pointer')};
  };
`;

const UserNameDiv = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-top: 10px;
`;

const UserIdDiv = styled.div`
  font-size: 24px;
  margin-top: 10px;
`;

const FollowBox = styled.div`
  position:relative;
  display: flex;
  align-items:center;
  width: 100%;
`;

const FollowBoxDiv = styled(Link)`
  display: flex;
  color: black;
  text-decoration: none;
  margin: 20px 20px 20px 0;
`;

const FollowNumberDiv = styled.div`
  font-size: 28px;
  font-weight: 600;
  margin-right: 10px;
`;

const FollowTextDiv = styled.div`
  font-size: 24px;
  transform: translateY(3px);
`;

const DescriptionDiv = styled.div`
  font-size: 20px;
  margin-top: 30px;
`;

const JoinDateDiv = styled.div`
  font-size: 20px;
  margin-top: 50px;
`;

const makeDateToJoinDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}월 ${date.getDate()}, ${date.getFullYear()}`;
};

function ProfileView({ match }: RouteComponentProps<{id: string}>) {
  const user = useRecoilValue(userState);
  const followingList = useRecoilValue(followingListState);
  const [loading, setLoading] = useState(true);
  const userDetailInfo = useRef<IUserDetail>();
  const [isFollowingRef, fetchFollow] = useIsFollowingRef(setLoading);
  const [isOpenChangeProfileImageModal, setIsOpenChangeProfileImageModalState] = useRecoilState(isOpenChangeProfileImageModalState);

  if (!match) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }

  const profileId = match.params.id;

  useEffect(() => {
    setLoading(true);
    const getUserDetail = async () => {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/api/user/${profileId}?type=userId`, {
        method: 'get',
        credentials: 'include',
      }).then((res) => res.json());
      if (result.ok) {
        userDetailInfo.current = result.userDetailInfo;
        isFollowingRef.current = followingList.includes(result.userDetailInfo._id);
      }
      setLoading(false);
    };

    getUserDetail();
  }, [isFollowingRef.current, profileId, user]);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!userDetailInfo.current) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }

  return (
    <ProfileViewLayout>
      <ImageAndFollowButtonDiv>
        <LargeProfileImageBox
          src={userDetailInfo.current.profileUrl}
          isMine={user.userId === profileId}
          onClick={() => user.userId === profileId && setIsOpenChangeProfileImageModalState(!isOpenChangeProfileImageModal)}
        />
        {user.userId !== profileId
        && (
        <DefaultButton
          buttonType={isFollowingRef.current ? 'following' : 'follow'}
          size="small"
          font="Nunito"
          isDisabled={false}
          onClick={() => fetchFollow(isFollowingRef.current as boolean, userDetailInfo.current!._id)}
        >
          {isFollowingRef.current ? 'following' : 'follow'}
        </DefaultButton>
        )}
      </ImageAndFollowButtonDiv>
      <UserNameDiv>{userDetailInfo.current.userName}</UserNameDiv>
      <UserIdDiv>{`@${userDetailInfo.current.userId}`}</UserIdDiv>
      <FollowBox>
        <FollowBoxDiv to={`/followers/${profileId}`}>
          <FollowNumberDiv>{userDetailInfo.current.followers.length}</FollowNumberDiv>
          <FollowTextDiv>followers</FollowTextDiv>
        </FollowBoxDiv>
        <FollowBoxDiv to={`/following/${profileId}`}>
          <FollowNumberDiv>{userDetailInfo.current.followings.length}</FollowNumberDiv>
          <FollowTextDiv>following</FollowTextDiv>
        </FollowBoxDiv>
      </FollowBox>
      <DescriptionDiv>{userDetailInfo.current.description}</DescriptionDiv>
      <JoinDateDiv>{`Joined ${makeDateToJoinDate(userDetailInfo.current.joinDate)}`}</JoinDateDiv>
    </ProfileViewLayout>
  );
}

export default ProfileView;
