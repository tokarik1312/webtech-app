import React from 'react';
import './EventsGrid.css';
import Event from '../Event/Event';

class EventsGrid extends React.Component {



  render() {

    if (this.props.conditionToChange === false) {
      return (
        <div className="container-sm">
          <div className="row">
            {
              this.props.published.map((publishedEvent) => {
                return <Event key={publishedEvent.id} publishedEvent={publishedEvent} deletePublishedEvent={this.props.deletePublishedEvent} editPublishedEvent={this.props.editPublishedEvent} setUnpublishedEvent={this.props.setUnpublishedEvent} conditionToChange={this.props.conditionToChange} timeZone={this.props.timeZone}></Event>
              })
            }
          </div>
        </div>
      )
    } else {
      return (
        <div className="container-sm">
          <div className="row">
            {
              this.props.unpublished.map((unpublishedEvent) => {
                return <Event key={unpublishedEvent.id} unpublishedEvent={unpublishedEvent} deleteUnpublishedEvent={this.props.deleteUnpublishedEvent} editUnpublishedEvent={this.props.editUnpublishedEvent} conditionToChange={this.props.conditionToChange} setPublishedEvent={this.props.setPublishedEvent} timeZone={this.props.timeZone}></Event>
              })
            }
          </div>
        </div>
      )
    }
  }
}


EventsGrid.propTypes = {};

EventsGrid.defaultProps = {};

export default EventsGrid;
