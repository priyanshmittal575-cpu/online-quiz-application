const questions = [
  {
    q: "Which data structure operates on the LIFO (Last-In, First-Out) principle?",
    options: ["Queue", "Stack", "Linked List", "Binary Tree"],
    answer: 1
  },
  {
    q: "What is the time complexity of binary search on a sorted array of n elements?",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
    answer: 2
  },
  {
    q: "Which Git command stages all modified files for the next commit?",
    options: ["git push", "git commit -m", "git add .", "git status"],
    answer: 2
  },
  {
    q: "In C programming, what is the size of an 'int' on a standard 64-bit GCC compiler?",
    options: ["2 bytes", "4 bytes", "8 bytes", "1 byte"],
    answer: 1
  },
  {
    q: "Which HTML tag is used to link an external JavaScript file?",
    options: ["<js>", "<link>", "<script>", "<javascript>"],
    answer: 2
  },
  {
    q: "What does HTTP status code 404 indicate?",
    options: ["Server Internal Error", "Resource Not Found", "Unauthorized Access", "OK / Success"],
    answer: 1
  }
];

let currentIndex = 0;
let userAnswers = new Array(questions.length).fill(null);

const questionText = document.getElementById("questionText");
const optionsList = document.getElementById("optionsList");
const feedbackMsg = document.getElementById("feedbackMsg");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const quizBody = document.getElementById("quizBody");
const resultScreen = document.getElementById("resultScreen");

function loadQuestion() {
  const item = questions[currentIndex];
  const selected = userAnswers[currentIndex];

  progressText.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  progressFill.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
  questionText.textContent = `${currentIndex + 1}. ${item.q}`;
  optionsList.innerHTML = "";
  feedbackMsg.textContent = "";

  item.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;

    if (selected !== null) {
      btn.disabled = true;
      if (idx === item.answer) btn.classList.add("correct");
      if (idx === selected && selected !== item.answer) btn.classList.add("wrong");
    }

    btn.addEventListener("click", () => selectOption(idx));
    optionsList.appendChild(btn);
  });

  if (selected !== null) {
    feedbackMsg.textContent = selected === item.answer ? "Correct!" : `Incorrect. Correct answer: ${item.options[item.answer]}`;
    feedbackMsg.style.color = selected === item.answer ? "#16a34a" : "#dc2626";
  }

  prevBtn.disabled = currentIndex === 0;
  nextBtn.textContent = currentIndex === questions.length - 1 ? "Finish Quiz" : "Next";
}

function selectOption(idx) {
  userAnswers[currentIndex] = idx;
  loadQuestion();
}

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  const score = userAnswers.reduce((acc, ans, i) => (ans === questions[i].answer ? acc + 1 : acc), 0);
  quizBody.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  document.getElementById("finalScore").textContent = `${score} / ${questions.length}`;
  document.getElementById("scoreRemark").textContent =
    score >= 5 ? "Great job! Strong CSE fundamentals." : "Good try! Review the missed topics and try again.";
}

document.getElementById("restartBtn").addEventListener("click", () => {
  currentIndex = 0;
  userAnswers.fill(null);
  resultScreen.classList.add("hidden");
  quizBody.classList.remove("hidden");
  loadQuestion();
});

loadQuestion();