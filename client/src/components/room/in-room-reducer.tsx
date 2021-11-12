/* eslint-disable max-len */
import { deepCopy } from '@src/utils';

export type Action = { type: 'JOIN_USER', payload: any } | { type: 'SET_USERS', payload: any }
| { type: 'LEAVE_USER', payload: any } | { type: 'ADD_STREAM', payload: any } | { type: 'SENT_CANDIDATE', payload: any }

export type TState = {
    participants: Array<any>
}

export const initialState = {
  participants: [],
};

export const reducer = (state: TState, action: Action): TState => {
  switch (action.type) {

    case 'JOIN_USER': {
      const { userData } = action.payload;
      const newParticipants = deepCopy(state.participants);
      newParticipants.push(userData);

      return { ...state, participants: newParticipants };
    }

    case 'SET_USERS': {
      const { participants } = action.payload;
      const newParticipants = deepCopy(participants);

      return { ...state, participants: newParticipants };
    }

    case 'LEAVE_USER': {
      const { userDocumentId } = action.payload;
      const newParticipants = state.participants
        .filter((participant) => (participant.userDocumentId !== userDocumentId));

      return { ...state, participants: newParticipants };
    }

    case 'ADD_STREAM': {
      const { data } = action.payload;
      const { participants } = state;
      const newParticipant = participants.pop();
      newParticipant.stream = data.stream;
      participants.push(newParticipant);

      return { ...state, participants };
    }

    case 'SENT_CANDIDATE': {
      const { data, socket } = action.payload;
      socket?.emit('room:ice', { ice: data });

      return { ...state };
    }

    default:
      throw new Error('Unhandled action');
  }
};
