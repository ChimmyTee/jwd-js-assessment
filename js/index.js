/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
  let submittedQuiz = false; // This is a global variable used to terminate startTimer() when true;
  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
    startTimer();
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: 'Which animal is NOT an Australian animal?',
      o: ['Koala', 'Kangaroo', 'Camel', 'Dingo'],
      a: 2,
    },
    {
      q: 'Which is a snack from Australia?',
      o: ['Minties', 'Twinkies', 'Butterfinger', 'Tootsie Rolls'],
      a: 0,
    },
  ];

  // function to display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score and display the score.
  const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector('#' + li);
        radioElement = document.querySelector('#' + r);

        if (quizItem.a == i) {
          //change background color of li element here
          liElement.style.backgroundColor = 'lightgreen';
        }

        // changed the if statement to include checking correct answer
        // for every score checked correctly, increment score by 1;
        if (radioElement.checked && quizItem.a == i) {
          score++;
        }
      }
    });
    // submit quiz and display score.
    submittedQuiz = true;
    const result = document.querySelector('#score');
    result.innerText = `\n Your score is ${score}/${quizArray.length}`;
    result.style.fontSize = "2em";
  };

  // call the displayQuiz function
  displayQuiz();

  // startTimer function starts the timer of the quiz, timeLimit variable is the default starting value in seconds.
  // startTimer function also converts the time format from seconds to minutes:seconds format.
  const startTimer = () => {
    const timeLimit = 30; // maximum time allocated to quiz, value is in seconds.
    let elasped = 0; // value is in seconds
    displayTimerAtStart(timeLimit);

    // timer is using javascript's setInterval built-in method which ticks every 1 second.
    const timer = setInterval(function () {
      if (submittedQuiz == true) { // checks if quiz has been submitted, to prevent double result calculation.
        clearInterval(timer);
      }

      let timeLeft = timeLimit - elasped;
      if (timeLeft >= 0) { // this if statement allows the timer display 00:00 when time's up, checks if there's time left AND gives the student 1 extra second.
        let mins = Math.floor(timeLeft / 60);
        let secs = Math.floor(timeLeft % 60);

        // if statements to display time format as 00:00
        if (mins < 10) {
          mins = `0${mins}`;
        }
        if (secs < 10) {
          secs = `0${secs}`;
        }
        //console.log(mins, secs);
        elasped++;
        const updateTime = document.querySelector('#time');
        updateTime.innerHTML = `${mins}:${secs}`;

      } else { // else time is up, calculate score and terminate timer.
        calculateScore();
        clearInterval(timer);
      }
    }, 1000);
  }

  // instead of displaying default time in html. This function dynamically display the quiz's time limit as specified in startTimer().
  const displayTimerAtStart = (time) => {
    let mins = Math.floor(time / 60);
    let secs = Math.floor(time % 60);
    if (mins < 10) {
      mins = `0${mins}`;
    }
    if (secs < 10) {
      secs = `0${secs}`;
    }
    const updateTime = document.querySelector('#time');
    updateTime.innerHTML = `${mins}:${secs}`;
  }


  // submit button event, when clicked, quiz results are submitted, score will be shown and correct answers will highlight.
  const submitQuiz = document.querySelector('#btnSubmit');
  submitQuiz.addEventListener('click', calculateScore);

  // reset button event, refresh the page to the start.
  const resetQuiz = document.querySelector('#btnReset');
  resetQuiz.addEventListener('click', function (e) {
    window.location.reload();
  });
});
