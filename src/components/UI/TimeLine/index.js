import React from "react";
import "./style.css";
import FormatDate from "../FormatDate";

/**
 * @author
 * @function TimeLine
 **/

const TimeLine = (props) => {
  const listChange = (diffObject) => {
    let arrayField = Object.keys(diffObject).filter(
      (field) => field != "updatedAt"
    );
    let returnArr = arrayField.map((event) => {
      return (
        <div>
          <span>
            <b>{event}: </b>
          </span>
          {diffObject[event][0]} to {diffObject[event][1]}
        </div>
      );
    });
    return returnArr;
  };
  return (
    <div className='uk-container uk-padding'>
      {props.events.reverse().map((event) => {
        return (
          <div className='uk-timeline'>
            <div className='uk-timeline-item'>
              <div className='uk-timeline-icon'>
                <span className='uk-badge'>
                  <span uk-icon='check'></span>
                </span>
              </div>
              <div className='uk-timeline-content'>
                <div className='uk-card uk-card-default uk-margin-medium-bottom uk-overflow-auto'>
                  <div className='uk-card-header'>
                    <div className='uk-grid-small uk-flex-middle' uk-grid>
                      <h4 className='uk-card-title'>
                        <FormatDate date={event.diff.updatedAt[1]} />
                      </h4>
                    </div>
                  </div>
                  <div className='uk-card-body'>{listChange(event.diff)}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimeLine;
