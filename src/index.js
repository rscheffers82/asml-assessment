import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import ASMLTimeline from './components/ASMLTimeline';
import Intro from './components/Intro';

import 'react-calendar-timeline/lib/Timeline.css';
import './styles/style.css';

const App = () => (
  <Provider store={store}>
    <Intro />
    <ASMLTimeline />
  </Provider>
);

render(<App />, document.getElementById('root'));
