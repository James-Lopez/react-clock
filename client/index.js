import React from 'react'
import ReactDOM from 'react-dom'

class WorldClocks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      zones: []
    }
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tock(), 1000)
  }
  componentWillUnmount() {
    clearInterval(this.intervalID)
  }
  tock() {
    fetch('/times')
      .then(res => res.json())
      .then(areas =>
        areas.map(zone => ({
          zone: zone.split('/')[1].replace('_', ' '),
          time: moment()
            .tz(zone)
            .format('hh:mm:ssa')
        }))
      )
      .then(data => this.setState({ zones: data }))
  }
  render() {
    return this.state.zones.map(zone => (
      <div className="time" key={zone.zone}>
        <div className="value">
          {zone.zone} {''} {zone.time}
        </div>
      </div>
    ))
  }
}

ReactDOM.render(<WorldClocks />, document.querySelector('#times'))

class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: new Date(),
      date: moment().format('dddd, MMMM Do, YYYY')
    }
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000)
  }
  componentWillUnmount() {
    clearInterval(this.intervalID)
  }
  tick() {
    this.setState({ time: new Date() })
  }
  render() {
    return (
      <div>
        Today is {this.state.date} local time is{' '}
        {this.state.time.toLocaleTimeString()}
      </div>
    )
  }
}

ReactDOM.render(<Welcome />, document.querySelector('#welcome'))
