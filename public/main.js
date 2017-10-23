const times = areas =>
  areas.map(zone => ({
    zone: zone.split('/')[1].replace('_', ' '),
    time: moment()
      .tz(zone)
      .format('hh:mm:ssa')
  }))

const render = time =>
  (($time, $value) => {
    $time.classList.add('time')
    $value.textContent = `${time.zone} ${time.time}`
    $value.classList.add('value')
    return $time.appendChild($value).parentNode
  })(document.createElement('div'), document.createElement('div'))

const timezones = () => {
  return fetch('/times').then(res => res.json())
}

setInterval(() => {
  const welcome = moment().format('dddd, MMMM Do, YYYY')
  document.querySelector('#date').innerHTML = ''
  document.querySelector('#date').textContent = `Welcome today is ${welcome}`
}, 16)

setInterval(() => {
  timezones()
    .then(data => times(data))
    .then(data => data.map(render))
    .then(data => {
      document.querySelector('#times').innerHTML = ''
      data.forEach(element => {
        document.querySelector('#times').appendChild(element)
      })
    })
}, 16)
