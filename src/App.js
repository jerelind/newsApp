import React, { Component } from 'react';
import axios from 'axios'
import Togglable from './Togglable'

class App extends Component {
  constructor() {
    super()
    this.state = {
      iltalehti: [],
      cnn: [],
      bbc: [],
    }
  }

  componentDidMount() {
    const iltalehtiUrl = "https://api.il.fi/v1/articles/iltalehti/lists/latest?limit=40&categories[]=uutiset"
    const cnnUrl = "https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=4234ddd9eba8479c8f49bb5625f26a38"
    const bbcUrl = "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=4234ddd9eba8479c8f49bb5625f26a38"

    axios.all([axios.get(iltalehtiUrl), axios.get(cnnUrl), axios.get(bbcUrl)])
         .then(axios.spread((iltalehtiUrl, cnnUrl, bbcUrl) => {
           for(let i = 0; i < 3; i++) {
            const newsObjectIltalehti = {
              title: iltalehtiUrl.data.response[i].title,
              lead: iltalehtiUrl.data.response[i].lead
            }

            const newsObjectCnn = {
              desc: cnnUrl.data.articles[i].description,
              url: cnnUrl.data.articles[i].url
            }

            const newsObjectBbc = {
              desc: bbcUrl.data.articles[i].description,
              url: bbcUrl.data.articles[i].url
            }
            this.setState({
              iltalehti: this.state.iltalehti.concat(newsObjectIltalehti),
              cnn: this.state.cnn.concat(newsObjectCnn),
              bbc: this.state.bbc.concat(newsObjectBbc)
            })
           }
         }))
         .catch(error => console.log(error)) 
  }

  render() {
    return (
      <div className="App">
        <h1 className="mainTitle">Recent news</h1>
        <p className="mainTitle">Powered by <a href="https://newsapi.org" target="_blank">newsapi.org</a></p>
        <div id="iltalehti">
          <Togglable title="Iltalehti" className="iltalehtiHeader">
            {this.state.iltalehti.map(elem => <div id="newsText" key={elem.title}><h2>{elem.title}</h2><p>{elem.lead}</p></div>)}
          </Togglable>
        </div>
        <div id="cnn">
          <Togglable title="CNN" className="cnnHeader">
            {this.state.cnn.map(elem => <div id="newsText" key={elem.desc}><a href={elem.url} target="_blank"><h2>{elem.desc}</h2></a></div>)}
          </Togglable>
        </div>
        <div id="bbc">
          <Togglable title="BBC" className="bbcHeader">
            {this.state.bbc.map(elem => <div id="newsText" key={elem.desc}><a href={elem.url} target="_blank"><h2>{elem.desc}</h2></a></div>)}
          </Togglable>
        </div>
      </div>
    );
  }
}

export default App;
