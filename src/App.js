import React, { Component } from 'react'
import getZen from "./api/fetch-zen"
import "./App.css"

let sentence = []
let i = -1
export default class App extends Component {
  constructor(props) {
        super(props)
  this.state = {
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
    if(sentence.length <= 13){
    this.setState({
      isActive: false
    }, () => {
          getZen()
          .then((response) => {
            if(!sentence.includes(response)){
              i = sentence.length
              sentence.push(response)
              this.setState({
                text: sentence[i],
                loading:false,
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
    } if(sentence.length === 13) {
      setTimeout(() => {
        this.setState({
          limit: true
        })

      }, 500)
    }
  }
  previous = () => {
    if(i >= 1){
    this.setState({
      isActive: !this.state.isActive
    }, () => {
      i--
      setTimeout(()=>{this.setState({
        text: sentence[i],
        loading:false,
        isActive: !this.state.isActive
      })}, 300)
      }
    )}
  }
  next = () => {
    if(!(i === sentence.length-1)){
    this.setState({
      isActive: !this.state.isActive
    }, () => {
      i++
      setTimeout(()=>{this.setState({
        text: sentence[i],
        loading:false,
        isActive: !this.state.isActive
      })}, 300)
      }
    )}
  }
    render() {
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
                    {i >= 1 &&
                      <button className="buttons" onClick={this.previous}>Previous</button>
                    }
                  </div>
                  <div className="secondBoxText">
                    <p className={this.state.isActive ? 'showText' : 'hideText'}>
                      Zen precept N°{i + 1} <br />
                      {this.state.text}
                    </p>
                  </div>
                  <div className="secondBoxButtons">
                    {!(i === sentence.length-1) &&
                      <button className="buttons" onClick={this.next}>Next</button>
                    }
                  </div>
                  </div>
                  <div className="thirdBox">
                    <div>
                      {sentence.length <=13 &&
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
