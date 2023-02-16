import React, { useState, useEffect } from "react";

import "./ColorTest.css";

export default function ColorTest() {
  const [color, setColor] = useState("");
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(undefined);
  const [isVisbible, setIsVisible] = useState(false);
  const [guess, setGuess] = useState("#");
  const [correctCounter, setCorrectCounter] = useState(0);
  const [totalColorQuestions, setTotalColorQuestions] = useState(undefined);
  const [mode, setMode] = useState("practice");
  const [limit, setLimit] = useState(undefined);
  const [colorsClicked, setColorsClicked] = useState(0);
  const [finalGrade, setFinalGrade] = useState(undefined);
  const [endOfTest, setEndOfTest] = useState(false);

  const generateColors = () => {
    const correctColor = getRandomColor();
    setColor(correctColor);
    setAnswers(
      [correctColor, getRandomColor(), getRandomColor()].sort(function (a, b) {
        return 0.5 - Math.random();
      })
    );
  };

  useEffect(() => {
    generateColors();
  }, []);

  //Generates a random color
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  //Handles Button Clicked
  const answerClicked = (answer, guess) => {
    if (answer === color || guess === color) {
      setResult(true);
      generateColors();
    } else {
      setResult(false);
    }
  };

  // const renderStatement = () => {
  //   if (result === true) {
  //     <h2 className="correct-answer">Correct, Good Job!</h2>;
  //   } else if (result === false) {
  //     <h2 className="wrong-answer">Sorry, That's Wrong.</h2>;
  //   } else {
  //     <></>;
  //   }
  // };

  const handleVisibleClick = () => {
    if (isVisbible) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  //Handles The button for text input
  const handleSubmit = (guess) => {
    if (guess === color) {
      setResult(true);
      generateColors();
    } else {
      setResult(false);
    }
  };

  const handleGuessChange = (e) => {
    let value = e.target.value;
    setGuess(value);
  };

  const handleTotalColorSetChange = (e) => {
    let value = e.target.value;
    setTotalColorQuestions(value);
  };

  const startTest = () => {
    setMode("test");
    setFinalGrade(undefined);
    setLimit(totalColorQuestions);
  };

  const endTest = (answer) => {
    if (answer !== color) {
      setColorsClicked(colorsClicked + 1);
      generateColors();
    }
    if (answer === color) {
      setCorrectCounter(correctCounter + 1);
      setColorsClicked(colorsClicked + 1);
      generateColors();
    }
    setFinalGrade(correctCounter / totalColorQuestions);
    setCorrectCounter(0);
    setColorsClicked(0);
    setTotalColorQuestions(undefined);
    setMode("practice");
  };

  const pickedAnswer = (answer) => {
    if (answer !== color) {
      setColorsClicked(colorsClicked + 1);
      generateColors();
    }
    if (answer === color) {
      setCorrectCounter(correctCounter + 1);
      setColorsClicked(colorsClicked + 1);
      generateColors();
    }
  };

  console.log("your limit is" + limit);
  console.log("your clicks are" + colorsClicked);
  return (
    <>
      <div>
        {finalGrade && <h1>{finalGrade}</h1>}
        {mode === "practice" ? (
          []
        ) : (
          <h1>
            {correctCounter} / {totalColorQuestions}
          </h1>
        )}
      </div>
      <div>
        <label for="total-color-questions">
          Set number of questions you'd like
        </label>{" "}
        <input
          className="total-color-questions"
          type="number"
          id="total-color-questions"
          name="total-color-questions"
          value={totalColorQuestions}
          onChange={handleTotalColorSetChange}
        />
        {mode === "test" ? (
          <button onClick={endTest}>End Test</button>
        ) : (
          <>
            {!totalColorQuestions ? (
              <button disabled onClick={startTest}>
                Start Test
              </button>
            ) : (
              <button onClick={startTest}>Start Test</button>
            )}
          </>
        )}
      </div>
      <div className="App">
        <div>
          {mode === "practice" ? (
            <>
              <label for="guess">Enter Guess Here</label>
              <input
                className="guess-input"
                type="text"
                id="guess"
                name="guess"
                value={guess}
                onChange={handleGuessChange}
              />
              <button onClick={() => handleSubmit(guess)}>Submit Guess</button>
            </>
          ) : (
            []
          )}

          <div>
            <button onClick={() => handleVisibleClick()}>Toggle Buttons</button>
          </div>
          <div className="square" style={{ background: color }}></div>
          {answers.map((answer, idx) => (
            <>
              {mode === "practice" ? (
                <>
                  <button
                    className={isVisbible ? "visible" : "hidden"}
                    onClick={() => answerClicked(answer)}
                    key={idx}
                  >
                    {answer}
                  </button>
                </>
              ) : (
                <>
                  {colorsClicked === limit - 1 ? (
                    <button onClick={() => endTest(answer)}>{answer}</button>
                  ) : (
                    <button
                      className={isVisbible ? "visible" : "hidden"}
                      onClick={() => pickedAnswer(answer)}
                      key={idx}
                    >
                      {answer}
                    </button>
                  )}
                </>
              )}
            </>
          ))}
          {mode === "test" ? (
            []
          ) : (
            <>
              {result === true && (
                <h2 className="correct-answer">Correct, Good Job!</h2>
              )}
              {result === false && (
                <h2 className="wrong-answer">Sorry, That's Wrong.</h2>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
