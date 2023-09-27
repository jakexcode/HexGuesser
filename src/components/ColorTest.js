import React, { useState, useEffect } from "react";

import "./ColorTest.css";

export default function ColorTest() {
  const [color, setColor] = useState("");
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(undefined);
  const [isVisbible, setIsVisible] = useState(true);
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
    if (value === "select") {
      setTotalColorQuestions();
    } else {
      setTotalColorQuestions(value);
    }
  };

  const startTest = () => {
    setMode("test");
    setResult(undefined);
    setFinalGrade(undefined);
    setEndOfTest(false);
    setCorrectCounter(0);
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
    setColorsClicked(0);
    setTotalColorQuestions(undefined);
    setEndOfTest(true);
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
      {mode === "test" ? (
        <>
          <p className="env-title"> Test</p>
          <p className="question-display">Question {colorsClicked + 1}</p>
        </>
      ) : (
        <p className="env-title">Practice</p>
      )}
      {/* {mode === "practice" ? (
        []
      ) : (
        <p className="question-counter">
          {colorsClicked} / {limit}
        </p>
      )} */}
      <div className="toggle-button">
        {mode === "practice" ? (
          <button onClick={() => handleVisibleClick()}>Toggle Buttons</button>
        ) : (
          []
        )}
      </div>

      <div className="row">
        {mode === "practice" ? (
          <div className="set-questions">
            <label className="label" for="total-color-questions">
              How Many Questions Would You Like?
            </label>

            <select
              className="total-color-questions"
              name="total-color-questions"
              value={totalColorQuestions}
              onChange={handleTotalColorSetChange}
            >
              <option value={"select"}> select </option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
            </select>
          </div>
        ) : (
          []
        )}
        {mode === "test" ? (
          <div className="button-test-area">
            <button className="button__end-test" onClick={endTest}>
              End Test
            </button>
          </div>
        ) : (
          <>
            <div className="button-area">
              {!totalColorQuestions ? (
                <button className="button__start-test_disabled" disabled>
                  Select the Number of Questions
                </button>
              ) : (
                <button className="button__start-test" onClick={startTest}>
                  Start Test
                </button>
              )}
            </div>
          </>
        )}
      </div>
      {endOfTest ? (
        <div className="display-results">
          <p className="final-grade">
            Your Final Grade is{finalGrade && finalGrade * 100}%<br />{" "}
            <span>
              You Got {correctCounter}/{limit} Correct
            </span>
          </p>{" "}
        </div>
      ) : (
        []
      )}

      {mode === "practice" ? (
        <div className="information-area">
          <label className="label" for="guess">
            Enter Guess Here
          </label>
          <input
            className="guess-input"
            type="text"
            id="guess"
            name="guess"
            value={guess}
            onChange={handleGuessChange}
          />
          <button onClick={() => handleSubmit(guess)}>Submit Guess</button>
        </div>
      ) : (
        []
      )}

      <div className="main-square">
        <div className="square" style={{ background: color }}></div>
      </div>
      <div className="hex-selections">
        {answers.map((answer, idx) => (
          <>
            {mode === "practice" ? (
              <button
                className={isVisbible ? "visible" : "hidden"}
                onClick={() => answerClicked(answer)}
                key={idx}
              >
                {answer}
              </button>
            ) : (
              <>
                {colorsClicked === limit - 1 ? (
                  <button className="" onClick={() => endTest(answer)}>
                    {answer}
                  </button>
                ) : (
                  <button
                    className=""
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
      </div>
      {mode === "test" ? (
        []
      ) : (
        <div className="practice-result">
          {result === true && (
            <h2 className="correct-answer">Correct, Good Job!</h2>
          )}
          {result === false && (
            <h2 className="wrong-answer">Sorry, That's Wrong.</h2>
          )}
        </div>
      )}
    </>
  );
}
