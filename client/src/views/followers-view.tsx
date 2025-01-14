/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import LoadingSpinner from '@common/loading-spinner';
import useFetchItems from '@src/hooks/useFetchItems';
import followingListState from '@atoms/following-list';
import UserCard from '@common/user-card';
import userState from '@atoms/user';
import { IUserForCard } from '@src/interfaces';

function FollowerView({ match }: RouteComponentProps<{id: string}>) {
  const userId = match.params.id;
  const [nowItemList, nowItemType] = useFetchItems<Required<IUserForCard>>(`/user/followers/${userId}`, 'followers');
  const [loading, setLoading] = useState(true);
  const myFollowingList = useRecoilValue(followingListState);
  const user = useRecoilValue(userState);

  const makeUserObjectIncludedIsFollow = (userItem: Required<IUserForCard>): IUserForCard => ({
    ...userItem,
    isFollow: !!myFollowingList.includes(userItem._id),
  });

  const makeItemToCardForm = (item: Required<IUserForCard>) => {
    const newUserItemForm = makeUserObjectIncludedIsFollow(item);
    if (newUserItemForm._id === user.userDocumentId) {
      return (
        <UserCard
          // eslint-disable-next-line no-underscore-dangle
          key={newUserItemForm._id}
          cardType="me"
          userData={newUserItemForm}
        />
      );
    }

    return (
      <UserCard
        // eslint-disable-next-line no-underscore-dangle
        key={newUserItemForm._id}
        cardType="follow"
        userData={newUserItemForm}
      />
    );
  };

  useEffect(() => {
    if (nowItemList && nowItemType === 'followers') {
      setLoading(false);
    }
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {nowItemList.map(makeItemToCardForm)}
    </>
  );
}

export default FollowerView;
