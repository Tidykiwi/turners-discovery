import React, { useState } from 'react';
import './App.css';

const removePunctuation = require('./Punctuation');

// var passageindex;

// function GeneratePassage(score, text) {
//   passageindex += 1;
//   return (
//     <>
//       <h3>Result {passageindex}</h3>
//       <h4>Score: {score}</h4>
//       <p>Passage: {text}</p>
//     </>
//   )
// }

// function GenerateData(data) {
//   passageindex = 0;

//   return (
//     <>
//       {data.result.passages.map((passage) => GeneratePassage(passage.passage_score, passage.passage_text))}
//     </>
//   )
// }

function App() {

  const [data, setData] = useState(null);
  const [input, setInput] = useState("");

  function handleChange(e)
  {
    setInput(e.target.value);
  }

  // Remove any punctuation from useer query and place in variable
  const query = removePunctuation(input);

  function handleClick()
  {
    fetch(`/api/${query}`, { method: 'POST' })
            .then((res) => res.json())
            .then((data) => setData(data))
            .then((data) => console.log(data));
  }

  // View query that is sent to the server
  console.log('This is my input: ' + input);

  return (
    <>
      {/*SECTION 1*/}
        <div>
          <input type="text" placeholder="Type your question here..." class="w3-block" id="input" onChange={handleChange}></input>
          <br></br>
          <br></br>
          <button class="w3-button w3-round w3-medium w3-block w3-border w3-border-black" id="search-button" onClick={handleClick}><strong>Search</strong></button>
          <p>{JSON.stringify(data)}</p>
      </div>
      
  </>  
  )
}

export default App;

