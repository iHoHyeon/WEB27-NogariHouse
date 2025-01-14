import React from 'react';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { HiHome } from 'react-icons/hi';
import { RouteComponentProps } from 'react-router-dom';

import { CustomtHeader, HeaderTitleNunito, CustomMenuIconsLayout } from '@common/header';
import { makeIconToLink } from '@utils/index';
import { IconType } from 'react-icons';

interface IconAndLink {
  Component:IconType,
  key: string | number,
  link: string,
  size?: number,
  color?: string,
}

function FollowingHeader({ history, location }: RouteComponentProps) {
  const Icon: IconAndLink = { Component: HiHome, link: '/', key: 'main' };

  return (
    <CustomtHeader>
      <HeaderTitleNunito to={location.pathname}>FOLLOWING</HeaderTitleNunito>
      <CustomMenuIconsLayout>
        <MdOutlineArrowBackIos onClick={() => history.goBack()} size={48} />
        {makeIconToLink(Icon)}
      </CustomMenuIconsLayout>
    </CustomtHeader>
  );
}

export default FollowingHeader;
