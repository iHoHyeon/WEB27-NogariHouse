/* eslint-disable object-shorthand */
import React, { useState, useRef } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import roomDocumentIdState from '@atoms/room-document-id';
import userTypeState from '@atoms/user';
import roomViewState from '@atoms/room-view-type';
import { isOpenRoomModalState } from '@atoms/is-open-modal';
import { getRandomRoomDocumentId, postRoomInfo } from '@api/room';
import DefaultButton from '@common/default-button';
import RoomTypeCheckBox from '@components/room/common/room-type-check-box';
import AnonymousCheckBox from '@components/room/new-view/anonymous-checkbox';
import { ButtonLayout } from '@components/room/common/style';
import toastListSelector from '@selectors/toast-list';
import {
  CustomTitleForm, TitleInputbar, CheckboxLayout, TitleInputbarLabel,
} from './style';

// 룸 생성 모달
function RoomModal() {
  const user = useRecoilValue(userTypeState);
  const setToastList = useSetRecoilState(toastListSelector);
  const setRoomView = useSetRecoilState(roomViewState);
  const setRoomDocumentId = useSetRecoilState(roomDocumentIdState);
  const setIsOpenModal = useSetRecoilState(isOpenRoomModalState);
  const [roomType, setRoomType] = useState('public');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitButtonHandler = () => {
    const roomInfo = {
      type: roomType,
      title: inputRef.current?.value as string,
      userId: user.userId,
      userName: user.userName,
      isAnonymous: (roomType !== 'closed') ? isAnonymous : false,
    };
    postRoomInfo(roomInfo)
      .then((roomDocumentId: any) => {
        setRoomDocumentId(roomDocumentId);
        if (roomType === 'closed') setIsOpenModal(true);
        else if (isAnonymous) setRoomView('selectModeView');
        else {
          setRoomView('inRoomView');
        }
      })
      .catch((err) => {
        setToastList({
          type: 'danger',
          title: '방 생성',
          description: '방 생성을 실패했습니다',
        });
        console.error(err);
      });
  };

  const inputHandler = () => {
    setIsDisabled(!inputRef.current?.value);
  };

  const checkboxHandler = () => {
    setIsAnonymous(!isAnonymous);
  };

  const roomTypeHandler = (checkBoxName: string) => {
    setRoomType(checkBoxName);
  };

  const randomlyAssignedHandler = async () => {
    const roomDocumentId = await getRandomRoomDocumentId();
    if (roomDocumentId === 'NO_ROOM') {
      setToastList({
        type: 'danger',
        title: '방 매칭 실패',
        description: '현재 접속 가능한 익명 허용 방이 없습니다',
      });
    } else {
      setRoomDocumentId(roomDocumentId);
      setRoomView('selectModeView');
    }
  };

  return (
    <>
      <h2> Let&apos;s have fun together! </h2>
      <CheckboxLayout>
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <RoomTypeCheckBox checkBoxName="public" onClick={roomTypeHandler.bind(null, 'public')} roomType={roomType} />
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <RoomTypeCheckBox checkBoxName="closed" onClick={roomTypeHandler.bind(null, 'closed')} roomType={roomType} />
      </CheckboxLayout>
      <AnonymousCheckBox checked={isAnonymous} onChange={checkboxHandler} roomType={roomType} text="Allow anonymous ?" />
      <CustomTitleForm>
        <TitleInputbarLabel>Add a Room Title</TitleInputbarLabel>
        <TitleInputbar ref={inputRef} onChange={inputHandler} data-testid="TitleInputbar" />
      </CustomTitleForm>
      <ButtonLayout>
        <DefaultButton buttonType="secondary" size="medium" onClick={submitButtonHandler} isDisabled={isDisabled}>
          Let&apos;s Go
        </DefaultButton>
        <DefaultButton buttonType="thirdly" size="medium" onClick={randomlyAssignedHandler}>
          Randomly assigned
        </DefaultButton>
      </ButtonLayout>
    </>
  );
}

export default RoomModal;