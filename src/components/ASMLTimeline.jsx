import React from "react"
import { connect } from 'react-redux'
import Timeline from "react-calendar-timeline"
import { defaultTimeStart, defaultTimeEnd, interval } from '../config'

import { generateEngineerItems } from "../helpers/generate-engineer-items"
import { updateItems } from "../redux/actions"

var keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title"
};

const ASMLTimeline = ({ groups, items, updateItemsFunc }) => {
  const defaultZoom = 7 * 24 * 60 * 60 * 1000;

  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const group = groups[newGroupOrder];
    const updatedItems = items.map(item =>
        item.id === itemId
          ? {
              ...item,
              start: dragTime,
              end: dragTime + (item.end - item.start),
              group: group.id
            }
          : item
      );
    updateItemsFunc(updatedItems);
  };

  const handleItemResize = (itemId, time, edge) => {
    const updatedItems = items.map(item =>
      item.id === itemId
        ? {
            ...item,
            start: edge === "left" ? time : item.start,
            end: edge === "left" ? item.end : time
          }
        : item
    );
    updateItemsFunc(updatedItems);
  };

  const engineerCountItems = generateEngineerItems(items);

  return (
    <div>
      <Timeline
        groups={groups}
        items={[
          ...engineerCountItems,
          ...items
        ]}
        keys={keys}
        fullUpdate
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        canMove
        canResize={"both"}
        defaultTimeStart={defaultTimeStart.toDate()}
        defaultTimeEnd={defaultTimeEnd.toDate()}
        onItemMove={handleItemMove}
        onItemResize={handleItemResize}
        timeSteps={{ hour: 12 }}
        dragSnap={interval}
        minZoom={defaultZoom}
        maxZoom={defaultZoom}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  groups: state.groups,
  items: state.items,
});

const mapDispatchToProps = {
  updateItemsFunc: updateItems,
}

export default connect(mapStateToProps, mapDispatchToProps)(ASMLTimeline);
