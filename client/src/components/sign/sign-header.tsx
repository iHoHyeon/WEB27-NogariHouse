import React from 'react';
import { IconType } from 'react-icons';
import { CustomtHeader, CustomMenuIconsLayout } from '@common/header';
import { MdOutlineArrowBackIos } from 'react-icons/md';

import { makeIconToLink } from '@utils/index';

interface IconAndLink {
  Component:IconType,
  key: string | number,
  link: string,
  size?: number,
  color?: string,
}

function SignHeader() {
  const Icon: IconAndLink = { Component: MdOutlineArrowBackIos, link: '/', key: 'main' };

  return (
    <CustomtHeader>
      <CustomMenuIconsLayout>
        {makeIconToLink(Icon)}
      </CustomMenuIconsLayout>
    </CustomtHeader>
  );
}

export default SignHeader;
