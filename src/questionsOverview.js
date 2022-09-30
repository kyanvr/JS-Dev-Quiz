import { limit, getQuestions , getAllAnswers, getCorrectAnswers, getMCA, getSelectedAnswers, btnStartAgain, overviewDiv, numberOfQuestionsCorrect  } from "./consts.js";

// Parse all the data from local storage
let allQuestions = JSON.parse(getQuestions);
let MCA = JSON.parse(getMCA);
let correctAnswers = JSON.parse(getCorrectAnswers);
let selectedAnswers = JSON.parse(getSelectedAnswers);
let allAnswers = JSON.parse(getAllAnswers);

// Function to create the overview
const createOverview = () => {
    let numberCount = 0;
    for (let index = 0; index < limit; index++) {
        // Array with all the answers in
        let allAnswersArr = [allAnswers[index].answer_a, allAnswers[index].answer_b, allAnswers[index].answer_c, allAnswers[index].answer_d, allAnswers[index].answer_e, allAnswers[index].answer_f];
        
        // Create DOM elements
        let overviewQuestion = document.createElement('p');
        let overviewQnA = document.createElement('div');
        let overviewQuestionDiv = document.createElement('div');

        overviewQnA.className = "overviewQnA";
        overviewQuestion.innerText = allQuestions[index];
        overviewQuestion.className = "question";
        overviewQuestionDiv.className = "overviewQuestionDiv";
        overviewQuestionDiv.appendChild(overviewQuestion);
        overviewQnA.appendChild(overviewQuestionDiv);

        // Array with correct answers
        let allCorrectAnswersArr = [correctAnswers[index].answer_a_correct, correctAnswers[index].answer_b_correct, correctAnswers[index].answer_c_correct, correctAnswers[index].answer_d_correct, correctAnswers[index].answer_e_correct, correctAnswers[index].answer_f_correct];

        let selectedAnswer = selectedAnswers[index];

        // check if multiple answers is true or not
        if(MCA[index] == 'false') {
            // Create all the answer divs
            for (let k = 0; k < allAnswersArr.length; k++) {
                let overviewAnswer = document.createElement('div');
                
                overviewAnswer.innerText = allAnswersArr[k];
                overviewAnswer.className = "overviewAnswer";

                // Delete the answers with null
                for (let y = 0; y < allAnswersArr.length; y++) {
                    if(allAnswersArr[y] == null) {
                        allAnswersArr.splice(y)
                        y--;
                    }
                }

                // Highlight the correct answer
                if(allCorrectAnswersArr[k] == 'true') {
                    overviewAnswer.classList.add("correctAnswer");
                }

                // Check if your selected answer = the correct answer
                if (allAnswersArr[k] == selectedAnswer) {
                    if(allCorrectAnswersArr[k] == 'true') {
                        numberCount++;
                        overviewAnswer.classList.add("correctAnswer");
                        let correctIcon = document.createElement('div');
                        correctIcon.innerHTML = "<i class=\"fas fa-check-circle fa-lg/\"></i>";
                        correctIcon.style.fontSize = "2rem";

                        overviewQuestionDiv.appendChild(correctIcon);
                    } else {
                        overviewAnswer.classList.add("wrongAnswer");
                        let wrongIcon = document.createElement('div');
                        wrongIcon.innerHTML = "<i class=\"fas fa-times-circle fa-lg\"></i>";
                        wrongIcon.style.fontSize = "2rem";

                        overviewQuestionDiv.appendChild(wrongIcon);
                    }
                }

                overviewQnA.appendChild(overviewAnswer);
            }
        } else {
            // Do this when there are multiple answers
            for (let k = 0; k < allAnswersArr.length; k++) {
                let overviewAnswer = document.createElement('div');
                
                overviewAnswer.innerText = allAnswersArr[k];
                overviewAnswer.className = "overviewAnswer";

                
                for (let y = 0; y < allAnswersArr.length; y++) {
                    if(allAnswersArr[y] == null) {
                        allAnswersArr.splice(y);
                        y--;
                    }
                }

                if(allCorrectAnswersArr[k] == 'true') {
                    overviewAnswer.classList.add("correctAnswer");
                }

                if (allAnswersArr[k] == selectedAnswer) {
                    if(allCorrectAnswersArr[k] == 'true') {
                        numberCount++;
                        overviewAnswer.classList.add("correctAnswer");
                        let correctIcon = document.createElement('div');
                        correctIcon.innerHTML = "<i class=\"fas fa-check-circle fa-lg/\"></i>";
                        correctIcon.style.fontSize = "2rem";

                        overviewQuestionDiv.appendChild(correctIcon);
                    } else {
                        overviewAnswer.classList.add("wrongAnswer");
                        let wrongIcon = document.createElement('div');
                        wrongIcon.innerHTML = "<i class=\"fas fa-times-circle fa-lg\"></i>";
                        wrongIcon.style.fontSize = "2rem";

                        overviewQuestionDiv.appendChild(wrongIcon);
                    }
                }
                
                overviewQnA.appendChild(overviewAnswer);
            }
        }
        // Show how many questions you got correct
        numberOfQuestionsCorrect.innerText = `${numberCount}/${limit}`;
        overviewDiv.appendChild(overviewQnA);
    }

    // Clear session and local storage when starting over
    btnStartAgain.addEventListener('click', () => {
        sessionStorage.clear();
        localStorage.clear();
    })
}

createOverview();