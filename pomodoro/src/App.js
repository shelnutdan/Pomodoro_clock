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
    /*Initial states*/
    this.state= {
      countdown:30,
      breakCountdown:30,
      breakSession:30,
      session: 30,
      break:30,
      active: 0

    }
    /*Bind functions*/
    this.convertTime=this.convertTime.bind(this);
    this.incrementSession=this.incrementSession.bind(this);
    this.decrementSession=this.decrementSession.bind(this);
    this.incrementBreak=this.incrementBreak.bind(this);
    this.decrementBreak=this.decrementBreak.bind(this);
    this.resetButton=this.resetButton.bind(this);

    this.startTimer= this.startTimer.bind(this);
    this.startBreak =this.startBreak.bind(this)
  }
  convertTime = () =>{
    let min= ((this.state.session)/1000)/60
    let sec = (this.state.session/1000)%60;
    this.setState({
      minutes:min,
      seconds:sec
    })

  }
  /*Increment and decrement both increase and decrease the session and coutdown length */
  incrementSession = () =>{
    if (this.state.session >=3600){
      this.setState({session:3600})
    } else{
      this.setState({ session: this.state.session+60})
      this.setState({ countdown:this.state.countdown+60})
    }
  }
  decrementSession = () =>{
    if(this.state.session <=0){
    this.setState({session:0})
  } else{
    this.setState({ session: this.state.session-60})
    this.setState({ countdown:this.state.countdown-60})
  }

  }
  /*Increment and decrement the length of a break length*/
  incrementBreak = () =>{
    if (this.state.break >=3600){
      this.setState({break:3600})
      this.setState({breakCountdown:3600})

    } else{
      this.setState({ break: this.state.break+60})
      this.setState({ breakCountdown: this.state.breakCountdown+60})
    }
  }
  decrementBreak= () =>{
    if(this.state.break <=0){
      this.setState({break:0})
      this.setState({breakCountdown:0})
    } else{
      this.setState({ break: this.state.break-60})
      this.setState({ breakCountdown: this.state.breakCountdown-60})
    }
  }
  /*Reinitialize state properties*/
  resetButton =() =>{ this.setState({ session: 150, break:300, countdown: 150, breakCountdown:300})
  }
 /*Start time when the button is clicked*/
  startTimer=() =>{

        if(this.state.active==0){
          this.timer =setInterval( () => this.setState(prevState =>{
            if (prevState.countdown<=0){
               return {
                 breakCountdown: prevState.breakCountdown-1
               }
            } else {
              return {
                countdown: prevState.countdown-1
              }
            }
          }
        ),1000)
        }

      else if (this.state.active==1){
        clearInterval(this.timer)
      }
      
      if(this.state.active==0){
        this.setState({
          active: 1
        })
      }
      else {
        this.setState({
          active:0
        })
      }
    }





  startBreak =()=>{
    this.timer =setInterval( () => this.setState(prevState =>{
      if (prevState.breakCountdown===0){
         console.log("The break has ended, Hit reset to start the pomodoro session again")
      } else {
        return {
          breakCountdown: prevState.breakCountdown-1
        }
      }
    }
  ),1000)
  }

playAudio =() =>{

}
  render() {
    /*Translate the raw state property and turn into a time display with a MM:SS format*/
    let countDown;
    let sessionDisplay;
    let breakDisplay;
    let breakTime;
    if(this.state.countdown % 60 >= 10) {
      countDown = Math.floor(this.state.countdown /60)+":"+this.state.countdown%60
    }
    if(this.state.session % 60 >= 10) {
      sessionDisplay = Math.floor(this.state.session /60)+":"+this.state.session%60
      }
    if(this.state.break % 60 >= 10) {
      breakDisplay = Math.floor(this.state.break /60)+":"+(this.state.break%60)
    }


    if(this.state.breakCountdown % 60 >= 10) {
        breakTime = Math.floor(this.state.breakCountdown /60)+":"+(this.state.breakCountdown%60)
    }


    /* Rendor the displays for the Pomodoro clock*/
    return (
      <div className="App">
        <header className="App-header">

          <h1>Pomodoro Clock</h1>
          <div id='timer-label'>
            <p>Session </p>
            <div id='time-left'>
              {countDown}
              <br />
              <FontAwesomeIcon onClick={this.startTimer} id='start_stop' icon={ faPlay } />
              <FontAwesomeIcon onClick={this.resetButton} id='reset' icon={ faRedo } />
              <br />
              <p>Break</p>
              {breakTime}

            </div>

          </div>
        </header>

        <div id="session-label">
          <p>Session Length</p>
          <FontAwesomeIcon onClick={this.decrementSession} id='session-decrement' icon={faMinus} />

          {sessionDisplay}

          <FontAwesomeIcon onClick={this.incrementSession} id='session-increment' icon={faPlus} />

        </div>
        <div id='break-label'>

          <p>Break length</p>
          <FontAwesomeIcon onClick={this.decrementBreak} id='break-decrement' icon={faMinus} />
          {breakDisplay}
          <FontAwesomeIcon onClick={this.incrementBreak} id='break-increment' icon={faPlus} />
          <p>{this.state.active}</p>
        </div>
        <div>
        {this.state.countdown <=0 && <div>
          <h1>The Break Has started!</h1>
          <audio id="beep" preload="auto"
        src="https://goo.gl/65cBl1"  autoPlay />
          </div>}
        </div>
        <div>

          {this.state.breakCountdown<=0 ? <div>
            <h1>The break has ended!</h1>
            <audio id="beep" preload="auto"
          src="https://goo.gl/65cBl1"  autoPlay loop/>
            {this.breakCountdown}
            </div>: <h1>Break has not started</h1>}</div>
      </div>
    );
  }
}

export default App;
