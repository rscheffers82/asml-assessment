import React, { Component } from "react";
import Timeline from "react-calendar-timeline";
import { defaultTimeStart, defaultTimeEnd, interval } from '../config';

import initialData from '../helpers/initial-data';
import { generateEngineerItems } from "../helpers/generate-engineer-items";

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

export default class ASMLTimeline extends Component {
  constructor(props) {
    super(props);
    const { groups, items } = initialData();

    this.state = {
      groups,
      items,
      defaultZoom: 7 * 24 * 60 * 60 * 1000,
    };
  }

  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = this.state;

    const group = groups[newGroupOrder];

    this.setState({
      items: items.map(item =>
        item.id === itemId
          ? {
              ...item,
              start: dragTime,
              end: dragTime + (item.end - item.start),
              group: group.id
            }
          : item
      )
    });
  };

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state;

    this.setState({
      items: items.map(item =>
        item.id === itemId
          ? {
              ...item,
              start: edge === "left" ? time : item.start,
              end: edge === "left" ? item.end : time
            }
          : item
      )
    });
  };

  render() {
    const { groups, items, defaultZoom } = this.state;
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
          onItemMove={this.handleItemMove}
          onItemResize={this.handleItemResize}
          timeSteps={{ hour: 12 }}
          dragSnap={interval}
          minZoom={defaultZoom}
          maxZoom={defaultZoom}
        />
      </div>
    );
  }
}
