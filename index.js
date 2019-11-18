let questionNumber = 1;

let correctNumber = 0;

const questionsAndAnswers = [
  {
    number: 1,
    text: "What is Matthew's favorite movie?",
    answer1: "Star Wars: A New Hope",
    answer2: "Jurassic Park",
    answer3: "Saving Private Ryan",
    answer4: "All of the above, he's terrible at picking favorites"
  },
  {
    number: 2,
    text: "What was Matthew's first job?",
    answer1: "DJ at a skating rink",
    answer2: "Program salesman at college football stadium",
    answer3: "Contruction worker at nuclear facility",
    answer4: "Space Manager"
  },
  {
    number: 3,
    text: "What does Matthew love the most? ",
    answer1: "Javascript",
    answer2: "React",
    answer3: "Node",
    answer4: "All of the above, he's terrible at picking favorites"
  },
  {
    number: 4,
    text: "Why should you give Matthew a job?",
    answer1: "Because he's awesome!",
    answer2: "Because he's a hard worker!",
    answer3: "Because he's loyal!",
    answer4: "Because he's wasting his talent making this stupid quiz!"
  },
  {
    number: 5,
    text: "What's the purpose of this quiz'?",
    answer1: "To show potential employers Matthew can use jQuery",
    answer2: "To show potential employers Matthew can code a quiz if need be",
    answer3: "Because Matthew was bored one Monday and wanted more content for his portfolio",
    answer4: "It serves no purpose"
  },
];

const rightAnswers = [
  "All of the above, he's terrible at picking favorites",
  "DJ at a skating rink",
  "All of the above, he's terrible at picking favorites",
  "Because he's wasting his talent making this stupid quiz!",
  "It serves no purpose"
];

function questionLayout(correctNumber, question, questionsDone) {
  return `
    <section id="questionSetUp" role="main">
    <h2 id="question">${question.text}</h2> 
    <form>
      <fieldset id="questionsApperance">
        <label>
          <input class="answer" type="radio" name="option" checked></input>
          <span>${question.answer1}</span>
        </label>
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.answer2}</span>
        </label> 
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.answer3}</span>
        </label>
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.answer4}</span>
        </label>
      </fieldset>  
      <button id="submitButton">Submit</button>
    </form>
  </section>
  `
  ;
}

function startQuiz() {
  $('#startButton').click(function(event) {
    nextQuestion();
  });
}

function nextQuestion() {
  const question = questionsAndAnswers[questionNumber - 1];
  const questionsDone = questionNumber - 1;
  $('#container').html(questionLayout(correctNumber, question, questionsDone));
}

function buttonForNextQuestion() {
  $('#container').on('click', '#nextButton', function(event) {
    if(questionNumber === 5) {
      finalPage(correctNumber);
    } else {
      addOneMoveToNextQuestion();
      nextQuestion();
  }
  });
}

function submitAnswer() {
  $('#container').on('click', '#submitButton', function(event) {
    event.preventDefault()
    const answer = $('input:checked').siblings('span');
    const rightAnswerPicked = checkIfCorrect(answer);
    if(rightAnswerPicked) {
      showRightAnswerPage();
    } else {
      showWrongAnswerPage();
    }
  });
}

function checkIfCorrect(answer) {
  if(answer.text() === rightAnswers[questionNumber - 1]) {
    return true;
  } else {
    return false;
  }
}

function showRightAnswerPage() {
  $('#container').html(goodJob);
  totalScore();
}

const goodJob = `
  <section role="main">
    <h2>Correct!</h2>
    <button id="nextButton">Next</button>
  </section>
`
;

function showWrongAnswerPage() {
  $('#container').html(wrongAnswer(questionNumber));
}

function totalScore() {
  correctNumber++;
}

function wrongAnswer(questionNumber) {
  return `
    <section role="main">
      <h2>Wrong! The correct answer was ${rightAnswers[questionNumber - 1]}!</h2>
      <button id="nextButton">Next</button>
    </section>
`
;
}

function addOneMoveToNextQuestion() {
  questionNumber++;
}

function finalPage(correctNumber) {
  $('#container').html(`
    <section>
      <h2>You got ${correctNumber} out of 5!</h2>
      <h2>Now hurry up and hire Matthew before he makes another stupid quiz</h2>
      <button id="restartButton" value="Refresh Page" onClick="history.go(0)"> Try Again? </button>
    </section>
  `);
}

function pleaseWork() {
  startQuiz();
  submitAnswer();
  buttonForNextQuestion();
}

pleaseWork();
