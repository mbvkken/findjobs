import React from 'react';
import './App.css';

import Overview from './components/Overview';
import Details from './components/Details';
import Add from './components/Add';
import Edit from './components/Edit';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: '',
      params: {}
    };
  }

  handleChangeView(view = '', params = {}) {
    this.setState({ view, params });
  }

  render() {
    const { view, params } = this.state;

    let ActiveView;

    switch (view) {
      case 'details':
        ActiveView = Details;
        break;

      case 'add':
        ActiveView = Add;
        break;

      case 'edit':
        ActiveView = Edit;
        break;

        default:
          ActiveView = Overview;
    }
    
    return (
      <div>
          <div className="headline">
            <h1>Job Board</h1>
            <p>Find your dream job or post an available position at your company!</p>
          </div>
          <div>
              <ActiveView
                {...params}
                changeView={this.handleChangeView.bind(this)}
              />
          </div>
      </div>
    )
  }
}

export default App;
