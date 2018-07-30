import React, { Component } from 'react'
import getZen from "./api/fetch-zen"
import "./App.css"

export default class App extends Component {
  constructor(props) {
        super(props)
  this.state = {
        sentence: [],
        i: 0,
        text: "",
        limit: false,
        loading: true,
        isActive: false
        }
  }
  componentWillMount(){
    this.new()
  }
  new =() => {
    let sentenceState = this.state.sentence
    if(sentenceState.length <= 13){
    this.setState({
      isActive: false
    }, () => {
          getZen()
          .then((response) => {
            if(!(sentenceState.includes(response))){
                this.setState({
                  sentence: [...sentenceState, response],
                  i: sentenceState.length,
                  text: response,
                  loading: false,
                  isActive: !this.state.isActive
              })
            } else {
                this.setState({
                  loading: true
                })
                this.new()
            }
          })
      })
    } if(sentenceState.length === 13) {
      setTimeout(() => {
        this.setState({
          limit: true
        })

      }, 500)
    }
  }
  previous = () => {
    let index = this.state.i
    let sentenceState = this.state.sentence
    if(index >= 1){
    this.setState({
      isActive: !this.state.isActive
    }, () => {
      setTimeout(()=>{this.setState({
        i: index -1,
        text: sentenceState[index],
        loading:false,
        isActive: !this.state.isActive
      })}, 300)
      }
    )}
  }
  next = () => {
    let index = this.state.i
    let sentenceState = this.state.sentence
    if(!(index === sentenceState.length)){
    this.setState({
      isActive: !this.state.isActive
    }, () => {
      setTimeout(()=>{this.setState({
        i: index +1,
        text: sentenceState[index],
        loading:false,
        isActive: !this.state.isActive
      })}, 300)
      }
    )}
  }
    render() {
      let index = this.state.i
      let sentenceLength = this.state.sentence.length
      return (
          <div className="App">
            {this.state.loading &&
              <div className="LoadingContainer">
                <div className="spinner">
                </div>
                <p className="Meditating">Meditating</p>
              </div>
            }
            {!this.state.loading &&
              <div  className="App">
                <div className="firstBox">
                  {this.state.limit &&
                    <div className="flexCenter">
                      <p>This is all the wisdom you need, remember:</p>
                      <p>Anything added dilutes everything else</p>
                    </div>
                  }
                </div>
                <div className="secondBox">
                  <div className="secondBoxButtons">
                    {index >= 1 &&
                      <button className="buttons" onClick={this.previous}>Previous</button>
                    }
                  </div>
                  <div className="secondBoxText">
                    <p className={this.state.isActive ? 'showText' : 'hideText'}>
                      Zen precept N°{index +1} <br />
                      {this.state.text}
                    </p>
                  </div>
                  <div className="secondBoxButtons">
                    {!(index === sentenceLength -1) &&
                      <button className="buttons" onClick={this.next}>Next</button>
                    }
                  </div>
                  </div>
                  <div className="thirdBox">
                    <div>
                      {sentenceLength <= 13 &&
                      <button className="buttons" onClick={this.new}>Get more wisdom</button>
                      }
                    </div>
                  </div>
              </div>
            }
        </div>
      )
    }
}
