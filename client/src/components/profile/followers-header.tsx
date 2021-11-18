import React from 'react';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { RouteComponentProps } from 'react-router-dom';

import { CustomtHeader, HeaderTitleNunito } from '@common/header';

function FollowersHeader({ history }: RouteComponentProps) {
  return (
    <CustomtHeader>
      <MdOutlineArrowBackIos onClick={() => history.goBack()} size={48} />
      <HeaderTitleNunito>FOLLOWERS</HeaderTitleNunito>
      <div />
    </CustomtHeader>
  );
}

export default FollowersHeader;