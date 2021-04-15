import React, { useRef } from "react";

const DisplayWordsComponent = (props) => {
  const wordsElement = useRef(null);

  try{

    let res = props.displayWords.map((elem: any, index: number) => {
      if(elem === undefined) return;
      return (
        <div key={index} 
          data-value={elem.word}
          className="random-word"
          onClick={elem => props.checkWord(elem)}
          onMouseDown={func} >
            {elem.wordTranslate}
        </div>
      )
    })

    function func() {
      if(props.counter >= 9) return;
      
      setTimeout(() => {
        wordsElement.current.classList.add('go-transform');
        // console.log(wordsElement.current)
      }, 1000)
      
      setTimeout(() => {
        wordsElement.current.classList.remove('go-transform');
      }, 3000)

      // console.log(wordsElement.current)
    }

  }catch(error){
    console.log(error)
  }

  return (
    <div className="audiocall-words-container">
      <div className="random-words" ref={wordsElement}>
        {res}
      </div>
    </div>

  );
};

export default DisplayWordsComponent;
