import { API_url, slider, output, submitBtn, selectDifficulty, selectCategory, paramLink, btnStopQuiz } from "./consts.js";

// Clear local and session storage when quit
btnStopQuiz.addEventListener('click', () => {
    window.localStorage.clear();
    sessionStorage.clear();
});

// slider counter function
function sliderCounter() {
    output.innerHTML = slider.value;

    slider.oninput = function () {
        output.innerHTML = this.value;
    };
};
sliderCounter();

// Get the difficulty
const getDifficulty = () => {
    if(selectDifficulty.value !== '#') {
        let selectedDifficulty = selectDifficulty.options[selectDifficulty.selectedIndex].value;
        return selectedDifficulty;
    }
};

// Get the category
const getCategory = () => {
    if(selectCategory.value !== '#') {
        let selectedCategory = selectCategory.options[selectCategory.selectedIndex].value;
        return selectedCategory;
    }
};

// Get the number of questions
const getLimit = () => {
    let selectedLimit = slider.value;
    sessionStorage.setItem('limit', selectedLimit);
    return selectedLimit;
};

// Use the parameters to make the api url
const makeApi = (dif, cat, lim) => {
    let difficulty = `difficulty=${dif}`;
    let category = `category=${cat}`;
    let limit = `limit=${lim}`;

    const newApi = `${API_url}&${difficulty}&${category}&${limit}`;
    console.log(newApi);

    sessionStorage.setItem('API-url', newApi );

    if(cat === 'bash') {
        if(lim > 4) {
            alert('BASH only contains 4 questions. Please adjust your limit.');
            paramLink.href = "#";
        } else {
            paramLink.href = "./questions.html";
        }
    }

    return newApi;
};

// When button is clicked, new api url is made
submitBtn.addEventListener('click', () => {
    getDifficulty();
    getCategory();
    getLimit();
    
    makeApi(getDifficulty(), getCategory(), getLimit());
});