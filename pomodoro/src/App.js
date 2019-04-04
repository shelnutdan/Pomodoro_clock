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
      this.setState({ breakSession: this.state.breakSession+60})
      this.setState({ breakCountdown: this.state.breakCountdown+60})
    }
  }
  decrementBreak= () =>{
    if(this.state.break <=0){
      this.setState({breakSession:0})
      this.setState({breakCountdown:0})
    } else{
      this.setState({ breakSession: this.state.break-60})
      this.setState({ breakCountdown: this.state.breakCountdown-60})
    }
  }
  /*Reinitialize state properties*/
  resetButton =() =>{
    clearInterval(this.timer)
      this.setState({
        active:0,
        session: 150,
        break:300,
        countdown: 150,
        breakCountdown:300
      })
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
    let countDown,sessionDisplay, breakDisplay, breakTime, minutes, seconds;

    if(this.state.countdown % 60 >= 0) {
      minutes=Math.floor(this.state.countdown/60);
      seconds= this.state.countdown%60;
      countDown=(minutes<10? '0'+minutes:minutes)+":"+(seconds<10?'0'+seconds:seconds)

    }
    if(this.state.session % 60 >= 0) {
      minutes=Math.floor(this.state.session/60);
      seconds= this.state.session%60;
      sessionDisplay=(minutes<10? '0'+minutes:minutes)+":"+(seconds<10?'0'+seconds:seconds)

      }
    if(this.state.breakSession % 60 >= 0) {
      minutes=Math.floor(this.state.breakSession/60);
      seconds= this.state.breakSession%60;
      breakDisplay=(minutes<10? '0'+minutes:minutes)+":"+(seconds<10?'0'+seconds:seconds)

    }

    if(this.state.breakCountdown % 60 >= 0) {
      minutes=Math.floor(this.state.breakCountdown/60);
      seconds= this.state.breakCountdown%60;
      breakTime=(minutes<10? '0'+minutes:minutes)+":"+(seconds<10?'0'+seconds:seconds)

    }

    /* Rendor the displays for the Pomodoro clock*/
    return (
      <div>
      <div className="App">

        <header className="App-header">

          <h1>Pomodoro Clock</h1>
          <div id='timer-label'>
            {this.state.countdown>0 ? <div id='time-left'><p>Session </p>{countDown}</div>:this.state.breakCountdown!=0 ?
            <div id='time-left'>
            <audio id="beep" preload="auto"
          src="https://goo.gl/65cBl1"  autoPlay />
            <p>Break has started</p>
            {breakTime}
            </div>:
            <div id='time-left'>
            <p>Break has ended</p>
            <audio id="beep" preload="auto"
          src="https://goo.gl/65cBl1"  autoPlay loop/>  </div>
          }
            <div id='time-left'>
              <FontAwesomeIcon onClick={this.startTimer} id='start_stop' icon={ faPlay } />
              <FontAwesomeIcon onClick={this.resetButton} id='reset' icon={ faRedo } />

            </div>

          </div>
        </header>
        <div className='timer-container'>
        <h1>Adjust your time here</h1>
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

        </div>
        <div>

        </div>
        <div>

            </div>
            </div>

      </div>
      <div id="description">
        <h1>How to use the Pomodoro Clock</h1>
        <p>The left hand corner displays the length of your pomodoro section for both the work session and the length of your break. Once you hit play the countdown will begina nd when the countdown reached zero your break will start. You will see a new break countdown start ticking down. Once the break countdwon has reached zero an alarm will sound indicating that your break is over. In order to stop the alarm you must click the reset button. Additional note, clcik the play icon after your countdown has started will stop the countdown until clicked again.</p>
        <h1>What is the Pomodoro Technique?</h1>
        <p>The Pomodoro Technique is a time management strategy invented by Francesco Cirillo. Cirillo named it the Pomodoro Technique after a tomato-shaped timer he used in college to keep himself on track as he studied. The idea is to increase productivity by dividing your workday into highly focused chunks separated by short breaks.</p>
        <h1>Reasons to Use the Pomodoro Technique</h1>
        <ul>
          <li>Manage distractions and control your time</li>
          <li>Increase accountability</li>
          <li>Improve weekly and quarterly planning</li>
          <li>Decrease back pain and mental fatigue</li>
          <li>Maintain motivation</li>
        </ul>
        <h1>References</h1>
        <p>https://www.lucidchart.com/blog/5-reasons-to-use-the-pomodoro-technique-at-work</p>

      </div>
      </div>
    );
  }
}

export default App;
