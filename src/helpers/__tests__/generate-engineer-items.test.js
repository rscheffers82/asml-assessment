import moment from 'moment';
import initialData from '../initial-data';
import {
  withinTimeSlot,
  generateEngineerItems,
} from '../generate-engineer-items';

const {items} = initialData();

describe('withinTimeSlot helper', () => {
  it('Is within time slot', () => {
    const first12hours = moment().startOf('day');
    const item = {
      start: first12hours.valueOf(),
      end: first12hours.add(12, 'hours').valueOf(),
    };
    const result = withinTimeSlot(item, 0);
    expect(result).toBe(true);
  });
  it('Is outside time slot', () => {
    const first12hours = moment().startOf('day');
    const item = {
      start: first12hours.add(12, 'hours').valueOf(),
      end: first12hours.add(24, 'hours').valueOf(),
    };
    const result = withinTimeSlot(item, 0);
    expect(result).toBe(false);
  });

  describe('generateEngineerItems helper', () => {
    it('Generates a week view (7 * 2 engineer count items)', () => {
      const result = generateEngineerItems();
      expect(result.length).toBe(7 * 2);
    });

    it('Sets the count to 2, when in a time slot there is ONE service action with 2 engineer', () => {
      const ServiceActionEngineers = items[0].itemProps['data-engineers'];
      const result = generateEngineerItems([items[0]]);
      const firstSlotEngineerCount = result[0].title;
      expect(firstSlotEngineerCount).toBe(ServiceActionEngineers);
    });

    it('Sets the correct engineer count when there are TWO service actions in a time slot', () => {
      const firstSAEngineers = items[2].itemProps['data-engineers']; // 2
      const secondSAEngineers = items[3].itemProps['data-engineers']; // 5
      const result = generateEngineerItems(items);
      const overlappingSlotEngineerCount = result[6].title;
      expect(overlappingSlotEngineerCount).toBe(
        firstSAEngineers + secondSAEngineers,
      );
    });
  });
});
