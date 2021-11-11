/* eslint-disable object-curly-newline, max-len */

import React from 'react';
import styled from 'styled-components';

const EventCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  padding: 24px;
  height: max-content;
  max-height: 200px;
  border-radius: 25px;

  div:not(:last-child) {
    margin-bottom: 10px;
  }

  :hover{
    background-color: #DDD9C7;
  }
`;

const TimeDiv = styled.div`
  font-size: 14px;
  color: gray;
`;

const TitleDiv = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
const ImageDiv = styled.div`
  display: flex;
  img:not(:last-child) {
    margin-right: 12px;
  }
`;
const ImageLayout = styled.img`
  width: 48px;
  min-width: 48px;
  height: 48px;
  margin-right: 10px;
  border-radius: 30%;
  overflow: hidden;
`;

const DiscriptionDiv = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

interface EventUser {
  userId: string,
  userName: string,
  profileUrl: string,
}

interface EventCardProps {
  time: string,
  title: string,
  participants: EventUser[],
  description: string,
}

const makeUserToImg = (participant: EventUser, idx: number) => <ImageLayout key={idx} src={participant.profileUrl} />;

function UserImageList({ participants }: { participants: EventUser[] }) {
  return <>{participants?.map(makeUserToImg)}</>;
}

function EventCard({ time, title, participants, description }: EventCardProps) {
  return (
    <EventCardLayout>
      <TimeDiv>{time}</TimeDiv>
      <TitleDiv>{title}</TitleDiv>
      <ImageDiv>
        <UserImageList participants={participants} />
      </ImageDiv>
      <DiscriptionDiv>{description}</DiscriptionDiv>
    </EventCardLayout>
  );
}

export default EventCard;