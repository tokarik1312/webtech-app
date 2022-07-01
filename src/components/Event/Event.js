import React from 'react';
import './Event.css';

let moment = require('moment-timezone')

moment.suppressDeprecationWarnings = true


let timePublished = 0
let timeUnpublished = 0

class Event extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
      visibility: {
        display: "none"
      },
      editStyle: {
        display: "none"
      },
      text: ''
    }

    this.handleOnClick = this.handleOnClick.bind(this)
    this.onHandleChange = this.onHandleChange.bind(this)

    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onBack = this.onBack.bind(this)
    this.unpublish = this.unpublish.bind(this)
    this.publish = this.publish.bind(this)

  }

  handleOnClick() {
    if (this.state.active === false) {
      this.setState({
        active: true,
        visibility: {
          display: "block"
        }
      })
    } else {
      this.setState({
        active: false,
        visibility: {
          display: "none"
        }
      })
    }
  }


  onHandleChange(e) {
    this.setState({
      text: e.target.value
    })
  }


  onEdit() {
    this.setState({
      visibility: {
        display: "none"
      },
      editStyle: {
        display: "flex"
      }
    })
  }

  onDelete() {


    if (this.props.conditionToChange === false) {
      this.props.deletePublishedEvent(this.props.publishedEvent.id)
    } else {
      this.props.deleteUnpublishedEvent(this.props.unpublishedEvent.id)
    }
    window.location.reload()
  }

  onSave() {

    if (this.props.conditionToChange === false) {
      this.props.editPublishedEvent(this.props.publishedEvent.id, {
        text: this.state.text,
        date: moment.utc().format()
      })
    } else {
      this.props.editUnpublishedEvent(this.props.unpublishedEvent.id, {
        text: this.state.text,
        date: moment.utc().format()
      })
    }

    this.setState({
      active: false,
      visibility: {
        display: "none"
      },
      editStyle: {
        display: "none"
      },
      text: ''
    })
    window.location.reload()
  }

  onBack() {
    this.setState({
      active: false,
      visibility: {
        display: "none"
      },
      editStyle: {
        display: "none"
      },
    })
  }

  unpublish() {
    let newEvent = {
      text: this.props.publishedEvent.text,
      date: this.props.publishedEvent.date
    }

    this.props.setUnpublishedEvent(newEvent, this.props.publishedEvent.id)
    window.location.reload()
  }

  publish() {
    let newEvent = {
      text: this.props.unpublishedEvent.text,
      date: this.props.unpublishedEvent.date
    }

    this.props.setPublishedEvent(newEvent, this.props.unpublishedEvent.id)
    window.location.reload()
  }



  render() {

    if (this.props.conditionToChange === false) {

      switch (this.props.timeZone) {
        case "ET":
          timePublished = moment.tz(`${this.props.publishedEvent.date}`, "America/New_York").format('h:mm a * D MMM YYYY')
          break;
        case "EET":
          timePublished = moment.tz(`${this.props.publishedEvent.date}`, "Europe/Helsinki").format('h:mm a * D MMM YYYY')
          break;
        case "CET":
          timePublished = moment.tz(`${this.props.publishedEvent.date}`, "Europe/Berlin").format('h:mm a * D MMM YYYY')
          break;
        case "UTC":
          timePublished = moment.tz(`${this.props.publishedEvent.date}`, "Etc/UTC").format('h:mm a * D MMM YYYY')
          break;
        default:

      }

      return (
        <div className="col-sm-12 col-md-4 mb-3">
          <div className="card px-2">
            <div className="card-body">
              <p className="card-text">{this.props.publishedEvent.text}</p>
              <div style={this.state.editStyle} className="justify-content-center align-items-center flex-column">
                <div className="input-group mb-3">
                  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={this.onHandleChange}></input>
                </div>
                <button type="button" className="btn btn-info mb-2" onClick={this.onSave}>Save</button>
                <button type="button" className="btn btn-warning mb-2" onClick={this.onBack}>Back</button>
              </div>
              <div className="d-flex justify-content-between">
                <i className="bi bi-gear" onClick={this.handleOnClick}></i>
                <div className="date mt-1">
                  {timePublished}
                </div>
              </div>
            </div>
          </div>
          <div style={this.state.visibility} className="options">
            <div className="option d-flex px-2">
              <i className="bi bi-pen"></i>
              <div className="ms-2" onClick={this.onEdit}>
                Edit
              </div>
            </div>
            <div className="option d-flex px-2">
              <i className="bi bi-cloud-download"></i>
              <div className="ms-2" onClick={this.unpublish}>
                Unpublish
              </div>
            </div>
            <div className="option d-flex px-2">
              <i className="bi bi-trash3"></i>
              <div className="ms-2" onClick={this.onDelete}>
                Delete
              </div>
            </div>
          </div>
        </div>
      )

    } else {

      switch (this.props.timeZone) {
        case "ET":
          timeUnpublished = moment.tz(`${this.props.unpublishedEvent.date}`, "America/New_York").format('h:mm a * D MMM YYYY')
          break;
        case "EET":
          timeUnpublished = moment.tz(`${this.props.unpublishedEvent.date}`, "Europe/Helsinki").format('h:mm a * D MMM YYYY')
          break;
        case "CET":
          timeUnpublished = moment.tz(`${this.props.unpublishedEvent.date}`, "Europe/Berlin").format('h:mm a * D MMM YYYY')
          break;
        case "UTC":
          timeUnpublished = moment.tz(`${this.props.unpublishedEvent.date}`, "Etc/UTC").format('h:mm a * D MMM YYYY')
          break;
        default:

      }

      return (
        <div className="col-sm-12 col-md-4 mb-3">
          <div className="card px-2">
            <div className="card-body">
              <p className="card-text">{this.props.unpublishedEvent.text}</p>
              <div style={this.state.editStyle} className="justify-content-center align-items-center flex-column">
                <div className="input-group mb-3">
                  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={this.onHandleChange}></input>
                </div>
                <button type="button" className="btn btn-info mb-2" onClick={this.onSave}>Save</button>
                <button type="button" className="btn btn-warning mb-2" onClick={this.onBack}>Back</button>
              </div>
              <div className="d-flex justify-content-between">
                <i className="bi bi-gear" onClick={this.handleOnClick}></i>
                <div className="date mt-1">
                  {timeUnpublished}
                </div>
              </div>
            </div>
          </div>
          <div style={this.state.visibility} className="options">
            <div className="option d-flex px-2">
              <i className="bi bi-pen"></i>
              <div className="ms-2" onClick={this.onEdit}>
                Edit
              </div>
            </div>
            <div className="option d-flex px-2">
              <i className="bi bi-cloud-upload"></i>
              <div className="ms-2" onClick={this.publish}>
                Publish
              </div>
            </div>
            <div className="option d-flex px-2">
              <i className="bi bi-trash3"></i>
              <div className="ms-2" onClick={this.onDelete}>
                Delete
              </div>
            </div>
          </div>
        </div>
      )
    }
  }


}

Event.propTypes = {};

Event.defaultProps = {};

export default Event;
