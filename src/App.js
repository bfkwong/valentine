import { useEffect, useState } from "react";
import rose from "./rose.png";
import minion from "./minion.jpeg";
import "./App.css";

function Rose() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, []);

  if (!show) return <div />;

  return (
    <>
      <div className="curtain">
        <img className="rose" src={rose} alt="rose" />
      </div>
    </>
  );
}

const QUIZ_CONFIG = [
  {
    question: "what k-drama did we watch when we were in the hotel in SLO?",
    answer: {
      0: "moving",
      1: "marry my husband",
      2: "sweet home",
      3: "gyeongseong creature"
    },
    correct: "1"
  },
  {
    question: "what artist do i play do 'summon' you?",
    answer: {
      0: "Neil Diamond",
      1: "Takayoshi",
      2: "Lizzo",
      3: "Niki"
    },
    correct: "3"
  },
  {
    question: "what was our favorite pizza shop in new york?",
    answer: {
      0: "lucia's",
      1: "joe's",
      2: "applebee's",
      3: "pizza hut"
    },
    correct: "0"
  },
  {
    question: "what was the first movie we ever watched together?",
    answer: {
      0: "midnight in paris",
      1: "50 first dates",
      2: "midsommar",
      3: "transformers age of extinction"
    },
    correct: "2"
  },
  {
    question: "what is my favorite ibs meal?",
    answer: {
      0: "plain tortillas",
      1: "chipotle burritos",
      2: "rice and chicken",
      3: "pepto bismol tablet and beer"
    },
    correct: "0"
  },
  {
    question: "when did we first say 'i love you' to each other?",
    answer: {
      0: "1/3/2024: when we first made it official",
      1: "2/14/2024: valentine's day",
      2: "2/16/2024: the weekend of valentine's day",
      3: "12/7/1941: the day that japan attacked pearl harbor"
    },
    correct: "2"
  }
];

function Ask(props) {
  const [showError, setShowError] = useState(false);

  return (
    <>
      <h4>Will you be my valentine's</h4>
      {showError && (
        <div
          style={{ width: "100%", border: "2px solid #A61723", borderRadius: 5, color: "#A61723", marginBottom: 30 }}>
          <p>sorry there was a problem processing your request, please try again later </p>
        </div>
      )}
      <button
        onClick={() => props.onComplete("LETTER")}
        style={{
          width: "100%",
          padding: "12px 40px 12px 40px",
          backgroundColor: "#A61723",
          color: "white",
          border: "0px",
          borderRadius: "5px",
          fontSize: 18
        }}>
        Yes
      </button>
      <button
        onClick={() => setShowError(true)}
        style={{
          marginTop: 20,
          border: "1px solid #A61723",
          color: "white",
          backgroundColor: "#f285a2",
          borderRadius: "5px",
          fontSize: 10
        }}>
        No
      </button>
    </>
  );
}

function Quiz(props) {
  const [qIndex, setQIndex] = useState(0);
  const [showError, setShowError] = useState(false);
  const config = QUIZ_CONFIG[qIndex];

  useEffect(() => {
    if (!config) {
      props.onComplete();
    }
  }, [config, props]);

  if (!config) {
    return <div />;
  }

  return (
    <>
      <h4>Question {qIndex + 1}</h4>
      {showError && (
        <div style={{ width: "100%", border: "2px solid #A61723", borderRadius: 5, color: "#A61723" }}>
          <p>noooooo 😡</p>
        </div>
      )}
      <p>{config.question}</p>
      {Object.entries(config?.answer ?? {}).map(([answerId, answer]) => (
        <button
          onClick={() => {
            if (config.correct === answerId) {
              setShowError(false);
              setQIndex(qIndex + 1);
            } else {
              setShowError(true);
            }
          }}
          style={{
            marginTop: "20px",
            padding: "12px 40px 12px 40px",
            width: "100%",
            backgroundColor: "#A61723",
            color: "white",
            border: "0px",
            borderRadius: "5px",
            fontSize: 18
          }}>
          {answer}
        </button>
      ))}
    </>
  );
}

function App() {
  const [step, setStep] = useState("START");

  const letterContent = (
    <>
      <h4>Dear Jasmine</h4>
      <p>
        I remember last valentine's day as the first time we said I love you to each other. We were laying together on
        the bed in San Diego reading each other's letter.
      </p>
      <p>
        My heart was pounding, I was scared because I had written those words, not knowing if you had wrote the same as
        well, but as I read the letter, I got my answer. And I was happy, to love you, and to be loved by you.
      </p>
      <p>
        It has been a year since that time, and we have learned and experienced so much together during that time. And I
        cannot be more glad that it's been with you.
      </p>
      <p>
        Thank you for being there for me when I need it most, thank you for loving me the way that you do. I really
        really really really love you a lot a lot.
      </p>
      <h1>❤️</h1>
    </>
  );

  const startContent = (
    <>
      <h4>Oh hi cutie</h4>
      <p>
        Remember how last valentine you made me solve a puzzle in order for me to read your letter, so I thought I would
        do this same
      </p>
      <h1>😈</h1>
      <button
        onClick={() => setStep("QUIZ")}
        style={{
          padding: "12px 40px 12px 40px",
          backgroundColor: "#A61723",
          color: "white",
          border: "0px",
          borderRadius: "5px",
          fontSize: 18
        }}>
        Start
      </button>
    </>
  );

  const curTime = new Date();
  const targetTime = new Date("2025-02-14T00:00:00");

  return (
    <div className="App">
      <Rose />
      <div className="letter-container">
        <div className="letter-content">{step === "START" && startContent}</div>
        <div className="letter-content">{step === "QUIZ" && <Quiz onComplete={() => setStep("ASK")} />}</div>
        <div className="letter-content">{step === "ASK" && <Ask onComplete={() => setStep("LETTER")} />}</div>
        <div className="letter-content">{step === "LETTER" && +curTime > +targetTime && letterContent}</div>
        <div className="letter-content">
          {step === "LETTER" && +curTime <= +targetTime && (
            <>
              <h4>Letter will arrive on valentine's day...</h4>
              <h1>📭</h1>
              <img style={{ width: "90%", marginTop: 10 }} src={minion} alt="minion" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
