import React from 'react';
import './Menu.css';
var moment = require('moment-timezone');


class Menu extends React.Component {
  constructor() {
    super()

    this.state = {
      publishedStyle: {
        backgroundColor: "rgb(15, 162, 247)",
        color: "white"
      },
      unpublishedStyle: {
        backgroundColor: "transparent",
        color: "black"
      },
      text: '',
      date: ''
    }

    this.published = this.published.bind(this)
    this.unpublished = this.unpublished.bind(this)

    this.textEvent = this.textEvent.bind(this)
    this.onSave = this.onSave.bind(this)

  }

  published() {
    this.setState({
      publishedStyle: {
        backgroundColor: "rgb(15, 162, 247)",
        color: "white"
      },
      unpublishedStyle: {
        backgroundColor: "transparent",
        color: "black"
      }
    })

    let newCondition = false
    this.props.changeCondition(newCondition)
  }

  unpublished() {
    this.setState({
      publishedStyle: {
        backgroundColor: "transparent",
        color: "black"
      },
      unpublishedStyle: {
        backgroundColor: "rgb(15, 162, 247)",
        color: "white"
      }
    })
    let newCondition = true
    this.props.changeCondition(newCondition)
  }

  textEvent(e) {
    this.setState({
      text: e.target.value
    })
  }

  onSave() {
    let newEvent = {
      text: this.state.text,
      date: moment.utc().format()
    }
    this.props.setPublishedEvent(newEvent)
    window.location.reload()
  }


  render() {
    return (
      <div className="container">
        <div className="row mt-3 mb-3">
          <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
            <div className="block d-flex justify-content-around align-items-center">
              <button type="button" className="btn" onClick={this.published} style={this.state.publishedStyle}>Published</button>
              <button type="button" className="btn" onClick={this.unpublished} style={this.state.unpublishedStyle}>Unpublished</button>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 onAdd d-flex justify-content-end ">
            <button type="button" className="btn add sticky-sm-bottom d-flex justify-content-center align-items-center px-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              <div className="mx-2"><i className="bi bi-plus-lg"></i></div>
              <div>Add Event</div>
            </button>
          </div>
          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">Write Event</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={this.textEvent}></input>
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={this.onSave}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Menu.propTypes = {};

Menu.defaultProps = {};

export default Menu;
