/**
 * A File with app constants
 */

const APP_TITLE = "Dev Quiz";

let API_url = "https://quizapi.io/api/v1/questions?apiKey=HjbDQSgvf6ssLkNubrvO0WuU3k4Ynf8LSTWdL8tA&";

const slider = document.getElementById("sliderRange");
const output = document.getElementById("output");

const submitBtn = document.getElementById('submitBtn');
const paramLink = document.getElementById('paramLink');
const selectDifficulty = document.getElementById('ddd');
const selectCategory = document.getElementById('ddc');

const questionNumber = document.getElementById('number');
const questionsContainer = document.querySelector('.questionsContainer');
const api = sessionStorage.getItem('API-url');
const selectedLimit = sessionStorage.getItem('limit');
const limit = JSON.parse(selectedLimit);
const timer = document.getElementById('timer');
const btnStopQuiz = document.getElementById('stopQuiz');

const getQuestions = localStorage.getItem('QuestionArray');
const getMCA = localStorage.getItem('MTCArr');
const getCorrectAnswers = localStorage.getItem('CorrectAnswersArr');
const getSelectedAnswers = localStorage.getItem('SelectedAnswer');
const getAllAnswers = localStorage.getItem('AllAnswers');
const overviewDiv = document.getElementById('overviewDiv');
const btnStartAgain = document.getElementById('startAgain');
const numberOfQuestionsCorrect = document.getElementById('numberOfCorrectQuestions');


export { APP_TITLE };
export { API_url };
export { slider };
export { output };
export { submitBtn };
export { selectDifficulty };
export { selectCategory };
export { limit };
export { questionsContainer };
export { questionNumber };
export { api };
export { timer };
export { paramLink };
export { btnStopQuiz };
export { getQuestions };
export { getMCA };
export { getCorrectAnswers };
export { getSelectedAnswers };
export { getAllAnswers };
export { overviewDiv };
export { btnStartAgain };
export { numberOfQuestionsCorrect };