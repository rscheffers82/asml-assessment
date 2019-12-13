import moment from 'moment';
import * as config from '../config';

// local helper function for generateEngineerItems
const withinTimeSlot = (item, index) => {
  const {defaultTimeStart, interval} = config;

  const timeSlotStart = defaultTimeStart.valueOf() + interval * index;
  const timeSlotEnd = defaultTimeStart.valueOf() + interval + interval * index;
  return (
    item.start === timeSlotStart ||
    item.end === timeSlotEnd || // service action starts or ends on the start or end of the time slot
    (item.start < timeSlotStart && item.end > timeSlotEnd)
  ); // service action ongoing and time slot falls within its start and end time
};

export const generateEngineerItems = (items = []) => {
  const {defaultTimeStart, defaultTimeEnd, interval} = config;

  const timeSlots =
    (defaultTimeEnd.valueOf() - defaultTimeStart.valueOf()) / interval;
  // create an array of all available time slots
  // for each time slot an item is returned containing the total count of engineers
  return [
    ...Array(timeSlots)
      .fill({})
      .map((_, index) => {
        // map over all items and return the total count of engineers within the time slot.
        const engineers = items.reduce((acc, item) => {
          return withinTimeSlot(item, index)
            ? acc + item.itemProps['data-engineers']
            : acc;
        }, 0);

        return {
          id: `engineers_${index}`,
          group: '0',
          title: engineers,
          start: moment(defaultTimeStart)
            .add(12 * index, 'hours')
            .valueOf(),
          end: moment(defaultTimeStart)
            .add(12 + 12 * index, 'hours')
            .valueOf(),
          className: 'engineer',
          canMove: false,
        };
      }),
  ];
};
