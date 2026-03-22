const questions = [
  {
    prompt: "What is your official birthday queen energy level today?",
    note: "Choose the option that best captures your glorious chaos.",
    answers: [
      { label: "Maximum sparkle", detail: "Visible from space.", reaction: "Correct. NASA has reported unusual fabulousness." },
      { label: "Cake-powered legend", detail: "Fueled by frosting and compliments.", reaction: "Also correct. Cake is a scientifically valid fuel source today." },
      { label: "Mildly feral but cute", detail: "Running on vibes alone.", reaction: "Honestly, iconic birthday behavior." }
    ]
  },
  {
    prompt: "If your birthday had a soundtrack, what would it sound like?",
    note: "No wrong answers, only dramatic ones.",
    answers: [
      { label: "A royal trumpet intro", detail: "Everyone rises as you enter the room.", reaction: "Naturally. Even the snacks stand at attention." },
      { label: "A dance bop", detail: "Impossible not to wiggle immediately.", reaction: "The living room has officially become a concert venue." },
      { label: "A villain theme", detail: "But in a hot, fashionable way.", reaction: "Power move. The candles are trembling respectfully." }
    ]
  },
  {
    prompt: "Which birthday snack best represents your personality?",
    note: "Please answer responsibly. This is almost serious.",
    answers: [
      { label: "Extra cheesy pizza", detail: "Comforting, chaotic, universally loved.", reaction: "An elite answer. Cheesy excellence never fails." },
      { label: "Chocolate cake", detail: "Sweet, dramatic, and impossible to ignore.", reaction: "Big main-character energy. Approved." },
      { label: "Fries stolen from other plates", detail: "Bold and suspiciously confident.", reaction: "A tiny crime, but with charisma." }
    ]
  },
  {
    prompt: "What birthday superpower should you unlock this year?",
    note: "Use this power only for fun and mild flexing.",
    answers: [
      { label: "Teleport to dessert", detail: "No walking required.", reaction: "Efficiency meets genius. A true innovator." },
      { label: "Instant perfect selfies", detail: "Every angle is your angle.", reaction: "The camera roll would become a museum." },
      { label: "Summon money from nowhere", detail: "A practical queen.", reaction: "Responsible and hilarious. We respect the vision." }
    ]
  },
  {
    prompt: "Final question: what do you deserve most today?",
    note: "Hint: all of the above, but pick your favorite flavor.",
    answers: [
      { label: "Unlimited love", detail: "Wrapped in hugs and compliments.", reaction: "Absolutely. Non-negotiable." },
      { label: "Ridiculous amounts of cake", detail: "A structurally ambitious dessert tower.", reaction: "Correct, and maybe with extra frosting." },
      { label: "The best year ever", detail: "With zero unnecessary nonsense.", reaction: "Manifested. Signed, sealed, delivered." }
    ]
  }
];

const questionText = document.getElementById("question-text");
const questionNote = document.getElementById("question-note");
const answersContainer = document.getElementById("answers");
const reaction = document.getElementById("reaction");
const nextButton = document.getElementById("next-button");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const quizCard = document.getElementById("quiz-card");
const finalScreen = document.getElementById("final-screen");
const finalMessage = document.getElementById("final-message");
const answerRecap = document.getElementById("answer-recap");
const restartButton = document.getElementById("restart-button");

let currentQuestionIndex = 0;
let selectedAnswers = [];

function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.prompt;
  questionNote.textContent = currentQuestion.note;
  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  progressFill.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
  reaction.textContent = "";
  nextButton.hidden = true;
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.innerHTML = `<strong>${answer.label}</strong><span>${answer.detail}</span>`;
    button.setAttribute("role", "listitem");
    button.addEventListener("click", () => handleAnswerClick(index, button));
    answersContainer.appendChild(button);
  });
}

function handleAnswerClick(answerIndex, buttonElement) {
  const buttons = answersContainer.querySelectorAll(".answer-button");
  buttons.forEach((button) => button.classList.remove("selected"));
  buttonElement.classList.add("selected");

  const selectedAnswer = questions[currentQuestionIndex].answers[answerIndex];
  selectedAnswers[currentQuestionIndex] = selectedAnswer.label;
  reaction.textContent = selectedAnswer.reaction;
  nextButton.hidden = false;

  if (currentQuestionIndex === questions.length - 1) {
    nextButton.textContent = "See your birthday surprise ✨";
  } else {
    nextButton.textContent = "Next ridiculous question →";
  }
}

function showFinalScreen() {
  quizCard.classList.add("hidden");
  finalScreen.classList.remove("hidden");

  finalMessage.textContent = `You answered every question with elite birthday-sister energy. Today is officially about laughter, love, cake, and celebrating the absolute legend that is you.`;
  answerRecap.innerHTML = selectedAnswers
    .map((answer, index) => `<li><strong>Q${index + 1}:</strong> ${answer}</li>`)
    .join("");
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
    return;
  }

  showFinalScreen();
});

restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  selectedAnswers = [];
  finalScreen.classList.add("hidden");
  quizCard.classList.remove("hidden");
  renderQuestion();
});

renderQuestion();
