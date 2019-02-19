import React, { Component } from 'react';
import axios from 'axios'
import Togglable from './Togglable'
import apiKey from './apiKey'

class App extends Component {
  constructor() {
    super()
    this.state = {
      iltalehti: [],
      cnn: [],
      bbc: [],
      bbcSport: [],
      nyTimes: []
    }
  }

  componentDidMount() {
    const iltalehtiUrl = "https://api.il.fi/v1/articles/iltalehti/lists/latest?limit=40&categories[]=uutiset"
    const cnnUrl = `https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=${apiKey}`
    const bbcUrl = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`
    const bbcSportUrl = `https://newsapi.org/v2/top-headlines?sources=bbc-sport&apiKey=${apiKey}`
    const nyTimesUrl = `https://newsapi.org/v2/top-headlines?sources=the-new-york-times&apiKey=${apiKey}`

    axios.all([axios.get(iltalehtiUrl), axios.get(cnnUrl), axios.get(bbcUrl), axios.get(bbcSportUrl), axios.get(nyTimesUrl)])
         .then(axios.spread((iltalehtiUrl, cnnUrl, bbcUrl, bbcSportUrl, nyTimesUrl) => {
           for(let i = 0; i < 3; i++) {
            const newsObjectIltalehti = {
              title: iltalehtiUrl.data.response[i].title,
              lead: iltalehtiUrl.data.response[i].lead
            }

            const newsObjectCnn = {
              title: cnnUrl.data.articles[i].title,
              desc: cnnUrl.data.articles[i].description,
              url: cnnUrl.data.articles[i].url
            }

            const newsObjectBbc = {
              title: bbcUrl.data.articles[i].title,
              desc: bbcUrl.data.articles[i].description,
              url: bbcUrl.data.articles[i].url
            }

            const newsObjectBbcSport = {
              title: bbcSportUrl.data.articles[i].title,
              desc: bbcSportUrl.data.articles[i].description,
              url: bbcSportUrl.data.articles[i].url
            }

            const newsObjectNyTimes = {
              title: nyTimesUrl.data.articles[i].title,
              desc: nyTimesUrl.data.articles[i].description,
              url: nyTimesUrl.data.articles[i].url
            }

            this.setState({
              iltalehti: this.state.iltalehti.concat(newsObjectIltalehti),
              cnn: this.state.cnn.concat(newsObjectCnn),
              bbc: this.state.bbc.concat(newsObjectBbc),
              bbcSport: this.state.bbcSport.concat(newsObjectBbcSport),
              nyTimes: this.state.nyTimes.concat(newsObjectNyTimes)
            })
           }
         }))
         .catch(error => console.log(error)) 
  }

  render() {
    return (
      <div className="App">
        <h1 className="mainTitle">Recent news</h1>
        <p className="powered">Powered by <a href="https://newsapi.org" target="_blank">newsapi.org</a></p>
        <div id="iltalehti">
          <Togglable title="Iltalehti" className="iltalehtiHeader">
            {this.state.iltalehti.map(elem => <div id="newsText" key={elem.title}><h2>{elem.title}</h2><p>{elem.lead}</p></div>)}
          </Togglable>
        </div>
        <div id="cnn">
          <Togglable title="CNN" className="cnnHeader">
            {this.state.cnn.map(elem => <div id="newsText" key={elem.desc}><a href={elem.url} target="_blank"><h2>{elem.title}</h2></a><p>{elem.desc}</p></div>)}
          </Togglable>
        </div>
        <div id="bbc">
          <Togglable title="BBC" className="bbcHeader">
            {this.state.bbc.map(elem => <div id="newsText" key={elem.desc}><a href={elem.url} target="_blank"><h2>{elem.title}</h2></a><p>{elem.desc}</p></div>)}
          </Togglable>
        </div>
        <div id="bbcSport">
          <Togglable title="BBC Sport" className="bbcSportHeader">
            {this.state.bbcSport.map(elem => <div id="newsText" key={elem.desc}><a href={elem.url} target="_blank"><h2>{elem.title}</h2></a><p>{elem.desc}</p></div>)}
          </Togglable>
        </div>
        <div id="nyTimes">
          <Togglable title="New York Times" className="nyTimesHeader">
            {this.state.nyTimes.map(elem => <div id="newsText" key={elem.desc}><a href={elem.url} target="_blank"><h2>{elem.title}</h2></a><p>{elem.desc}</p></div>)}
          </Togglable>
        </div>
      </div>
    );
  }
}

export default App
