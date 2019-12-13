import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Timeline, {TimelineHeaders, DateHeader} from 'react-calendar-timeline';
import PropTypes from 'prop-types';
import {defaultTimeStart, defaultTimeEnd, interval} from '../config';

import {generateEngineerItems} from '../helpers/generate-engineer-items';
import {updateItems} from '../redux/actions';

var keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end',
  groupLabelKey: 'title',
};

const ASMLTimeline = ({groups, items, updateItemsFunc}) => {
  const [engineerCountItems, setEngineerCountItems] = useState(
    generateEngineerItems(items),
  );
  useEffect(() => {
    setEngineerCountItems(generateEngineerItems(items));
  }, items);
  const defaultZoom = 7 * 24 * 60 * 60 * 1000;

  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const group = groups[newGroupOrder];
    const updatedItems = items.map(item =>
      item.id === itemId
        ? {
            ...item,
            start: dragTime,
            end: dragTime + (item.end - item.start),
            group: group.id,
          }
        : item,
    );
    updateItemsFunc(updatedItems);
    setEngineerCountItems(generateEngineerItems(updatedItems));
  };

  const handleItemResize = (itemId, time, edge) => {
    const updatedItems = items.map(item =>
      item.id === itemId
        ? {
            ...item,
            start: edge === 'left' ? time : item.start,
            end: edge === 'left' ? item.end : time,
          }
        : item,
    );
    updateItemsFunc(updatedItems);
    setEngineerCountItems(generateEngineerItems(updatedItems));
  };

  const invalidInput = (input, currentValue) =>
    !input ||
    isNaN(Number(input)) ||
    Number(input) === currentValue ||
    Number(input) === 0;

  const updateEngineerCount = itemId => {
    const item = items.reduce((selected, item) => {
      if (selected) return selected;
      return item.id === itemId ? item : null;
    }, null);
    if (!item) return;

    const currentValue = item.itemProps['data-engineers'];
    const message = `Currently ${currentValue} engineer${
      currentValue === 1 ? ' is' : 's are'
    } needed for ${item.title}. Update the number below to make a change.`;
    const input = prompt(message, currentValue);
    if (!input || invalidInput(input, currentValue)) {
      return;
    }

    const engineerCount = Number(input);
    const updatedItems = items.map(item =>
      item.id === itemId
        ? {
            ...item,
            itemProps: {
              ...item.itemProps,
              'data-engineers': Number(engineerCount),
            },
          }
        : item,
    );
    updateItemsFunc(updatedItems);
    setEngineerCountItems(generateEngineerItems(updatedItems));
  };

  return (
    <div>
      <Timeline
        groups={groups}
        items={[...engineerCountItems, ...items]}
        keys={keys}
        fullUpdate
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        canMove
        canResize={'both'}
        defaultTimeStart={defaultTimeStart.toDate()}
        defaultTimeEnd={defaultTimeEnd.toDate()}
        onItemMove={handleItemMove}
        onItemResize={handleItemResize}
        timeSteps={{hour: 12}}
        dragSnap={interval}
        minZoom={defaultZoom}
        maxZoom={defaultZoom}
        onItemDoubleClick={updateEngineerCount}
        lineHeight={50}
      >
        <TimelineHeaders>
          <DateHeader unit="primaryHeader" />
          <DateHeader
            unit="hour"
            labelFormat="hh:mm"
            style={{height: 50, color: '#999999'}}
          />
        </TimelineHeaders>
      </Timeline>
    </div>
  );
};

const mapStateToProps = state => ({
  groups: state.groups,
  items: state.items,
});

const mapDispatchToProps = {
  updateItemsFunc: updateItems,
};

ASMLTimeline.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({})),
  items: PropTypes.arrayOf(PropTypes.shape({})),
  updateItemsFunc: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ASMLTimeline);
