import React from 'react'
import { render } from 'react-dom'
import ASMLTimeline from './ASMLTimeline'
import 'react-calendar-timeline/lib/Timeline.css'

const App = () => (
  <div>
    <ASMLTimeline />
  </div>
)

render(<App />, document.getElementById('root'))
