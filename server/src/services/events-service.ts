/* eslint-disable no-underscore-dangle */
import Events, { IEventsTypesModel } from '@models/events';
import usersService from './users-service';

export default {
  get10EventItems: async (count : number) => {
    try {
      const items = await Events.find({ date: { $gte: new Date() } })
        .sort({ date: 1 })
        .skip(count)
        .limit(10);
      return items;
    } catch (e) {
      console.error(e);
    }
  },

  // myEvent 구현시 해당 함수에서 추가적으로 구현해서 사용하실건지 아니면 따로 함수를 만들어주실건지 ...
  get10EventItemsFromUser: async (userDocumentId: string, count : number) => {
    try {
      const items = await Events.find().skip(count).limit(10);
      return items;
    } catch (e) {
      console.error(e);
    }
  },

  makeItemToEventInterface: async (item : IEventsTypesModel & {_id: number}) => {
    const participantsList = await Promise.all(item.participants
      .map(async (userId) => usersService.findUserByUserId(userId)));
    return {
      key: item._id,
      time: String(item.date),
      title: item.title,
      participants: participantsList,
      description: item.description,
      type: 'event',
    };
  },

  setEvent: async (title:string, participants:object, date:Date, description:string) => {
    const newEvent = new Events({
      title,
      participants,
      date: new Date(date),
      description,
    });
    await newEvent.save();
    return newEvent._id;
  },

  searchEvent: async (keyword: string, count: number) => {
    const query = new RegExp(keyword, 'i');
    const res = await Events
      .find({ $or: [{ title: query }, { description: query }] })
      .sort({ date: 1 }).skip(count).limit(10);
    return res;
  },
};
