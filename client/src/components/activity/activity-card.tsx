/* eslint-disable object-curly-newline */
import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { makeDateToHourMinute, makeDateToMonthDate } from '@utils/index';
import roomDocumentIdState from '@atoms/room-document-id';
import roomViewState from '@atoms/room-view-type';
import anonymousState from '@atoms/anonymous';
import isOpenRoomState from '@atoms/is-open-room';

const ActivityCardLayout = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;

  height: max-content;
  padding: 24px;
  border-radius: 30px;

  margin-left: 0.8%;

  &:hover {
  background-color: #eeebe4e4;
  box-shadow: 0px 2px 4px rgb(0 0 0 / 25%);
  }
`;

const ImageLayout = styled.img`
    width: 48px;
    min-width: 48px;
    height: 48px;
    margin-right: 10px;
    border-radius: 70%;
    overflow: hidden;
`;

const UserNameSpan = styled.span`
  font-weight: bold;
`;

const DiscriptionSpan = styled.span`
  font-size: min(16px, 4vw);
  word-break: break-all;
  width: calc(100% - 60px);
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  overflow: hidden;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  min-width: 20%;
`;

const TimeDiv = styled.div`
  font-size: min(3vw, 14px);
  color: gray;
`;

interface ActivityUser {
  userId: string,
  userName: string,
  profileUrl: string,
}

interface ActivityCardProps {
  type: 'follow' | 'event' | 'room',
  clickDocumentId: string,
  from: ActivityUser,
  date: Date,
}

const mapping = {
  follow: '님이 팔로우 했습니다',
  room: '님이 room을 생성했습니다. 참여하실래요?',
  event: '님이 등록한 이벤트에 초대되셨습니다 !',
};

function ActivityCard({ type, clickDocumentId, from, date }: ActivityCardProps) {
  const history = useHistory();
  const setRoomView = useSetRecoilState(roomViewState);
  const setRoomDocumentId = useSetRecoilState(roomDocumentIdState);
  const setIsAnonymous = useSetRecoilState(anonymousState);
  const setIsOpenRoom = useSetRecoilState(isOpenRoomState);

  const activityClickEvent = () => {
    if (type === 'follow') {
      history.push(`/profile/${from.userId}`);
    } else if (type === 'room') {
      setIsAnonymous(false);
      setRoomDocumentId(clickDocumentId);
      setRoomView('inRoomView');
      setIsOpenRoom(true);
    }
  };

  const time = new Date(date);
  return (
    <ActivityCardLayout onClick={activityClickEvent}>
      <LeftSide>
        <ImageLayout src={from.profileUrl} />
        <DiscriptionSpan>
          <UserNameSpan>{from.userName}</UserNameSpan>
          {mapping[type]}
        </DiscriptionSpan>
      </LeftSide>
      <RightSide>
        <TimeDiv>{time.getDate() === (new Date()).getDate() ? makeDateToHourMinute(time) : makeDateToMonthDate(time)}</TimeDiv>
      </RightSide>
    </ActivityCardLayout>
  );
}

export default ActivityCard;
