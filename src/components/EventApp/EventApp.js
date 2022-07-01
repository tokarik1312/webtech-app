import React from 'react';
import './EventApp.css';
import axios from 'axios';
import Header from '../Header/Header'
import Menu from '../Menu/Menu'
import EventsGrid from '../EventsGrid/EventsGrid';


const URL1 = 'http://localhost:3000/published/'
const URL2 = 'http://localhost:3000/unpublished/'


class EventApp extends React.Component {
  constructor() {
    super()
    this.state = {
      published: [],
      unpublished: [],
      conditionToChange: false,
      timeZone: "ET"
    }

    this.getPublishedEvents = this.getPublishedEvents.bind(this)
    this.setPublishedEvent = this.setPublishedEvent.bind(this)
    this.deletePublishedEvent = this.deletePublishedEvent.bind(this)
    this.editPublishedEvent = this.editPublishedEvent.bind(this)

    this.changeCondition = this.changeCondition.bind(this)

    this.getUnpublishedEvents = this.getUnpublishedEvents.bind(this)
    this.setUnpublishedEvent = this.setUnpublishedEvent.bind(this)
    this.deleteUnpublishedEvent = this.deleteUnpublishedEvent.bind(this)
    this.editUnpublishedEvent = this.editUnpublishedEvent.bind(this)

    this.setTimeZone = this.setTimeZone.bind(this)

  }

  componentDidMount() {
    this.getPublishedEvents()
    this.getUnpublishedEvents()
  }


  getPublishedEvents() {
    axios.get(URL1)
      .then((response) => {
        this.setState({
          published: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  setPublishedEvent(newEvent, id) {

    axios.post(URL1, newEvent)
      .then((response) => {
      })
      .catch(function (error) {
        console.log(error);
      });

    window.location.reload()

    axios.delete(`${URL2}/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

    window.location.reload()
  }

  deletePublishedEvent(id) {
    axios.delete(`${URL1}/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }


  editPublishedEvent(id, editedEvent) {
    axios.put(`${URL1}/${id}`, {
      text: editedEvent.text,
      date: editedEvent.date
    })
      .then(function (response) {
        this.getEvents()
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  changeCondition(newCondition) {
    this.setState({
      conditionToChange: newCondition
    })
  }

  getUnpublishedEvents() {
    axios.get(URL2)
      .then((response) => {
        this.setState({
          unpublished: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  setUnpublishedEvent(newEvent, id) {

    axios.post(URL2, newEvent)
      .then((response) => {
      })
      .catch(function (error) {
        console.log(error);
      });

    window.location.reload()

    axios.delete(`${URL1}/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

    window.location.reload()
  }


  deleteUnpublishedEvent(id) {
    axios.delete(`${URL2}/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }


  editUnpublishedEvent(id, editedEvent) {
    axios.put(`${URL2}/${id}`, {
      text: editedEvent.text,
      date: editedEvent.date
    })
      .then(function (response) {
        this.getEvents()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setTimeZone(time) {
    this.setState({
      timeZone: time
    })
  }


  render() {
    return (
      <div className="container">
        <Header setTimeZone={this.setTimeZone}></Header>
        <Menu setPublishedEvent={this.setPublishedEvent} changeCondition={this.changeCondition}></Menu>
        <EventsGrid published={this.state.published} unpublished={this.state.unpublished} timeZone={this.state.timeZone} deletePublishedEvent={this.deletePublishedEvent} editPublishedEvent={this.editPublishedEvent} conditionToChange={this.state.conditionToChange} setUnpublishedEvent={this.setUnpublishedEvent} deleteUnpublishedEvent={this.deleteUnpublishedEvent} setPublishedEvent={this.setPublishedEvent} editUnpublishedEvent={this.editUnpublishedEvent}></EventsGrid>
      </div>
    )
  }
}

EventApp.propTypes = {};

EventApp.defaultProps = {};

export default EventApp;
