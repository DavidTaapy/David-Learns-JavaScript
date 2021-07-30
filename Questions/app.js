// Toggling viewing of answers
const questions = document.querySelectorAll('.question');
questions.forEach(question => {
    const btn = question.querySelector(".question-btn");
    btn.addEventListener("click", () => {
        questions.forEach(ques => {
            if (ques !== question) {
                ques.classList.remove('show-text');
            }
            question.classList.toggle('show-text');
        })
    })
})
