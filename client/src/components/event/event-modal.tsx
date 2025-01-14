import React from 'react';
import { useSetRecoilState } from 'recoil';

import { isOpenEventModalState } from '@atoms/is-open-modal';
import { ModalBox, BackgroundWrapper } from '@common/modal';

function EventModal() {
  const setIsOpenEventModal = useSetRecoilState(isOpenEventModalState);

  return (
    <>
      <BackgroundWrapper onClick={() => setIsOpenEventModal(false)} />
      <ModalBox>
        <h1>Detailed page is not available yet.</h1>
        <button type="button" aria-label="test" onClick={() => setIsOpenEventModal(false)}>cancle</button>
      </ModalBox>
    </>
  );
}

export default EventModal;
