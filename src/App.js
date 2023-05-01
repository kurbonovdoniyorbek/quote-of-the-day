import './App.css';
import { BsTwitter } from 'react-icons/bs'
import { RiVoiceprintLine } from 'react-icons/ri'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import { IoCopyOutline } from 'react-icons/io5'
import axios from 'axios'
import { useState } from 'react';

function App() {
  const [data, setData] = useState()
  const [title, setTitle] = useState("New Quote")


  function newQuote() {
    setTitle("Loading Quote...")
    axios.get(`http://api.quotable.io/random`)
      .then(res => {
        setData(res.data)
        setTitle("New Quote")
      }).catch(err => console.log(err))
  }
  function soundFunc() {
    let utterance = new SpeechSynthesisUtterance(`${data.content
      } by ${data.author}`)
    speechSynthesis.speak(utterance)
  }

  function copyFunc() {
    navigator.clipboard.writeText(data.content)
  }

  function twitterFunc() {
    let twitterUrl = `https://twitter.com/intent/tweet?url=${data.content}`
    window.open(twitterUrl, "_blank")
  }


  return (
    <div className='main'>
      <div className="quote_box">
        <header className='main_text'>
          Quote of the day
        </header>
        <div className="content">
          <div className="quote_area">
            <FaQuoteLeft />
            <p className="quote">
              {
                data === undefined ?
                  "The only way to get smarter is by playing a smarter opponent"
                  :
                  data.content
              }
            </p>
            <FaQuoteRight />
          </div>
          <div className="author">
            <span>__</span>
            <span className='author_name'>{
              data === undefined ?
                "Fundamentals of Chess 1883" :
                data.author
            }</span>
          </div>
        </div>
        <hr />
        <div className="last_part">
          <ul className="icons_collection">
            <li className="icons" onClick={soundFunc}><RiVoiceprintLine /></li>
            <li className="icons" onClick={copyFunc}><IoCopyOutline /></li>
            <li className="icons" onClick={twitterFunc}><BsTwitter /></li>
          </ul>
          <button className='new_quote' onClick={newQuote}>{title}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
