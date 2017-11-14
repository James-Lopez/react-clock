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
      <div className="time">
        <div className="value">
          {zone.zone} {''} {zone.time}
        </div>
      </div>
    ))
  }
}

ReactDOM.render(<WorldClocks />, document.querySelector('#times'))
