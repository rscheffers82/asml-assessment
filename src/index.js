import React from 'react'
import { render } from 'react-dom'
import ASMLTimeline from './components/ASMLTimeline'
import 'react-calendar-timeline/lib/Timeline.css'
import { Provider } from 'react-redux'
import store from './redux/store'

import './styles/style.css'

const App = () => (
  <Provider store={store}>
    <ASMLTimeline />
  </Provider>
)

render(<App />, document.getElementById('root'))
