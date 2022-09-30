import { limit, timer, api, questionNumber, questionsContainer, btnStopQuiz } from "./consts.js";

// Clear local and session storage when quit
btnStopQuiz.addEventListener('click', () => {
    localStorage.clear();
    sessionStorage.clear();
});

// Get the data from API
async function getQuestions() {
    const fetchedData = await fetch(api);
    return await fetchedData.json();
}
  
getQuestions().then(data => {  
    // A timeout for setTimeout()
    let timeout = 2000;

    // Make a loader
    const loader = () => {
        const loaderDiv = document.createElement('div');
        loaderDiv.classList.add('loader');
        questionsContainer.appendChild(loaderDiv);
        setTimeout(() => {
            loaderDiv.remove('loader');
        }, timeout);
    }
    loader();

    // Create arrays to store the data
    let questionArr = [];
    let multipleCorrectAnswersArr = [];
    let correctAnswersArr = [];
    let selectedAnswerArr = [];
    let AllAnswers = [];

    // Put every question in Local Storage
    for (let q = 0; q < limit; q++) {
        questionArr.push(data[q].question);
        multipleCorrectAnswersArr.push(data[q].multiple_correct_answers);
        correctAnswersArr.push(data[q].correct_answers);
        AllAnswers.push(data[q].answers);

        localStorage.setItem('QuestionArray', JSON.stringify(questionArr));
        localStorage.setItem('MTCArr', JSON.stringify(multipleCorrectAnswersArr));
        localStorage.setItem('CorrectAnswersArr', JSON.stringify(correctAnswersArr));
        localStorage.setItem('AllAnswers', JSON.stringify(AllAnswers));
    }

    // Set a timeout function to make the questions
    setTimeout(() => {
        // Function to create the question and answers
        const createQuestion = () => {
            // Create DOM elements
            const question = document.createElement('p');
            const answerContainer = document.createElement('div');
            const questDiv = document.createElement('div');

            // Change classname of new container
            answerContainer.className = "answerContainer";
            questDiv.className = "questDiv";
            question.className = "question";
        
            // Make a counter for iterating over the questions and make a question counter to show the number of the question
            let counter = 0;
            let questionCounter = 1;

            // Function to make the question
                const makeNewQuestion = () => {
                    if (counter < limit) {
                        // The timer
                        let timeLeft = 15;
                        const timerFunction = setInterval(() => {
                            if(timeLeft <= 0) {
                            clearInterval(timerFunction);
                            // alert('Please select an answer!');
                            } else {
                            timer.classList.add('timer');
                            timer.innerText = `${timeLeft} s left`;
                            timeLeft -= 1;
                            }
                        }, 1000);

                        // Put the question in a variable
                        let currentQuestion = data[counter].question;
            
                        // Create the question and set the number of the question
                        question.innerText = currentQuestion;
                        questionNumber.innerText = `Question ${questionCounter}`;
            
                        // Create array to store the answers
                        let arrAnswers = [data[counter].answers.answer_a, data[counter].answers.answer_b, data[counter].answers.answer_c, data[counter].answers.answer_d, data[counter].answers.answer_e, data[counter].answers.answer_f];
                        
                        // Make function to generate the answers
                        const generateNewAnswers = () => {
                            // Loop over the question's answers and put the answers in a div
                            for (let i = 0; i < arrAnswers.length; i++) {
                                // Create the answer div
                                let answerDiv = document.createElement('div');
                                answerDiv.className = "answerDiv";
                                answerDiv.innerText = arrAnswers[i];
                
                                answerContainer.appendChild(answerDiv);
                                
                                // If a answer is empty (null), it won't generate a div with the answer
                                if(arrAnswers[i] == null) {
                                    answerDiv.className = "";
                                    arrAnswers.splice(i);
                                }

                                // What to do when you click an answer
                                answerDiv.addEventListener('click', () => {
                                    selectedAnswerArr.push(arrAnswers[i]);
                                    localStorage.setItem('SelectedAnswer', JSON.stringify(selectedAnswerArr));

                                    answerDiv.classList.add('grow');

                                    // When you get to last question, you will be redirected to the submit page  
                                    if (questionCounter == (limit + 1)) {
                                        setTimeout(() => {
                                            questDiv.replaceChildren();
                                            timer.style.display = "none";

                                            let submitBtn = document.createElement('button');
                                            let submitLink = document.createElement('a');
                                            
                                            questionNumber.innerText = 'Submit your answers!';
                                            submitBtn.innerHTML = 'Submit<br>answers';
                                            submitBtn.className = "button grow"
                                            submitLink.href = "./questionsOverview.html";
                                
                                            submitLink.appendChild(submitBtn);
                                            questDiv.appendChild(submitLink);
                                        }, 300);
                                    } else {
                                        setTimeout(() => {
                                            makeNewQuestion();
                                            timeLeft = 0;
                                        }, 300);
                                    }
                                })
                            }

                        }

                        // Counter and questionCounter + 1 ==> new question
                        counter++;
                        questionCounter++;

                        questDiv.appendChild(question);
                        questDiv.appendChild(answerContainer);
                        questionsContainer.appendChild(questDiv);

                        answerContainer.replaceChildren();
                        generateNewAnswers();

                    } else {
                        clearInterval(makeNewQuestion());
                    }
                }
                setInterval(makeNewQuestion(), 15000);
        }

        createQuestion();

    }, timeout);

});