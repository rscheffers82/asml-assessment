import React from 'react'
import { render } from 'react-dom'
import ASMLTimeline from './components/ASMLTimeline'
import 'react-calendar-timeline/lib/Timeline.css'
import './styles/style.css';

const App = () => (
  <div>
    <ASMLTimeline />
  </div>
)

render(<App />, document.getElementById('root'))
