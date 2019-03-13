import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state= {
      session: 25,
      break:5
    }
    this.incrementSession=this.incrementSession.bind(this);
    this.decrementSession=this.decrementSession.bind(this);
    this.incrementBreak=this.incrementBreak.bind(this);
    this.decrementBreak=this.decrementBreak.bind(this);
    this.resetButton=this.resetButton.bind(this);
  }
  incrementSession = () =>{
    if (this.state.session >=60){
      this.setState({session:60})
    } else{
      this.setState({ session: this.state.session+1})
    }
  }
  decrementSession = () =>{
    if(this.state.session <=0){
    this.setState({session:0})
  } else{
    this.setState({ session: this.state.session-1})
  }

  }
  incrementBreak = () =>{
    if (this.state.break >=60){
      this.setState({break:60})
    } else{
      this.setState({ break: this.state.break+1})
    }
  }
  decrementBreak= () =>{
    if(this.state.break <=0){
      this.setState({break:0})
    } else{
      this.setState({ break: this.state.break-1})
    }
  }
  resetButton =() =>{ this.setState({ session: 25, break:5})
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">

          <h1>Pomodoro Clock</h1>
          <div id='timer-label'>
            <p>Session</p>
            <div id='time-left'>
              {this.state.session}:00

            </div>
              <FontAwesomeIcon onClick={()=>console.log('starting countdown')} id='start_stop' icon={ faPlay } />
              <FontAwesomeIcon onClick={this.resetButton} id='reset' icon={ faRedo } />
          </div>
        </header>

        <div id="session-label">
          <p>Session Length</p>
          <FontAwesomeIcon onClick={this.decrementSession} id='session-decrement' icon={faMinus} />

          {this.state.session}
          <FontAwesomeIcon onClick={this.incrementSession} id='session-increment' icon={faPlus} />

        </div>
        <div id='break-label'>

          <p>Break length</p>
          <FontAwesomeIcon onClick={this.decrementBreak} id='break-decrement' icon={faMinus} />
          {this.state.break}
          <FontAwesomeIcon onClick={this.incrementBreak} id='break-increment' icon={faPlus} />
        </div>

      </div>
    );
  }
}

export default App;
