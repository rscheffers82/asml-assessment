import moment from "moment";

export default function() {
    const startMoment = moment().startOf('day');

    return {
        groups: [
            {id: '1', title: 'Machine 1'},
            {id: '2', title: 'Machine 2'},
            {id: '3', title: 'Machine 3'},
          ],
          items: [
            {
                id: "a",
                group: "1",
                title: 'Service Action A',
                start: startMoment.valueOf(),
                end: moment(startMoment).add(12, 'hours').valueOf(),
                itemProps: { 'data-engineers': 2 }
            }, {
                id: 'b',
                group: '2',
                title: 'Service Action B',
                start: moment(startMoment).add(1, 'day').valueOf(),
                end: moment(startMoment).add(2, 'day').valueOf(),
                itemProps: { 'data-engineers': 3 }
            }, {
                id: 'c',
                group: '3',
                title: 'Service Action C',
                start: moment(startMoment).add(2, 'day').valueOf(),
                end: moment(startMoment).add(3, 'day').add(12, 'hour').valueOf(),
                itemProps: { 'data-engineers': 2 }
            }, {
                id: 'd',
                group: '1',
                title: 'Service Action D',
                start: moment(startMoment).add(3, 'day').valueOf(),
                end: moment(startMoment).add(5, 'day').valueOf(),
                itemProps: { 'data-engineers': 5 }
            }, {
                id: 'e',
                group: '2',
                title: 'Service Action E',
                start: moment(startMoment).add(4, 'day').valueOf(),
                end: moment(startMoment).add(4, 'day').add(12, 'hour').valueOf(),
                itemProps: { 'data-engineers': 4 }
            },
        ]
    }
}