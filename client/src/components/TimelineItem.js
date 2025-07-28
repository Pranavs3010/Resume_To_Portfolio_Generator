// client/src/components/TimelineItem.js
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const TimelineItem = ({ data }) => (
  <div className="timeline-item">
    <div className="timeline-dot"></div>
    <div className="timeline-content">
      <h3 className="timeline-title">{data.title}</h3>
      {data.date && (
        <p className="timeline-date">
          <FaCalendarAlt /> {data.date}
        </p>
      )}
      <p className="timeline-description">{data.description}</p>
    </div>
  </div>
);

export default TimelineItem;
