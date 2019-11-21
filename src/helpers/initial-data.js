import moment from "moment"
import * as config from '../config'

export default function() {
    const { defaultTimeStart } = config;

    return {
        groups: [
            {id: '0', title: 'Total engineers'},
            {id: '1', title: 'Machine 1'},
            {id: '2', title: 'Machine 2'},
            {id: '3', title: 'Machine 3'},
          ],
          items: [
            {
                id: "a",
                group: "1",
                title: 'Service Action A',
                start: defaultTimeStart.valueOf(),
                end: moment(defaultTimeStart).add(12, 'hours').valueOf(),
                itemProps: { 'data-engineers': 2 },
                className: "machine_1",
            }, {
                id: 'b',
                group: '2',
                title: 'Service Action B',
                start: moment(defaultTimeStart).add(1, 'day').valueOf(),
                end: moment(defaultTimeStart).add(2, 'day').valueOf(),
                itemProps: { 'data-engineers': 3 },
                className: "machine_2",
            }, {
                id: 'c',
                group: '3',
                title: 'Service Action C',
                start: moment(defaultTimeStart).add(2, 'day').valueOf(),
                end: moment(defaultTimeStart).add(3, 'day').add(12, 'hour').valueOf(),
                itemProps: { 'data-engineers': 2 },
                className: "machine_3",
            }, {
                id: 'd',
                group: '1',
                title: 'Service Action D',
                start: moment(defaultTimeStart).add(3, 'day').valueOf(),
                end: moment(defaultTimeStart).add(5, 'day').valueOf(),
                itemProps: { 'data-engineers': 5 },
                className: "machine_4",
            }, {
                id: 'e',
                group: '2',
                title: 'Service Action E',
                start: moment(defaultTimeStart).add(4, 'day').valueOf(),
                end: moment(defaultTimeStart).add(4, 'day').add(12, 'hour').valueOf(),
                itemProps: { 'data-engineers': 4 },
                className: "machine_5",
            },
        ]
    }
}