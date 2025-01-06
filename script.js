// const checkBoxList = document.querySelectorAll(".custom-checkbox");

// // returns array of inputnodes
// const inputFields = document.querySelectorAll(".goal-input");  

// const errorLabel = document.querySelector(".error-label")
// const progressValue = document.querySelector(".progress-value");




// const allGoals=JSON.parse(localStorage.getItem("allGoals")) || {}
// let completedGoalsCount = Object.values(allGoals).filter((goal)=> goal.completed).length
// progressValue.style.width = `${completedGoalsCount / 3 * 100}%`;
// progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`






// checkBoxList.forEach((checkbox) => {
//     checkbox.addEventListener('click',(e) => {


//         // for each  node elements it will check if input filed is empty or not, if any of the filed is empty it will return false
//         const allGoalsAdded = [...inputFields].every(function (input){
//             return input.value;
//         })

//         if (allGoalsAdded)
//         {
//             checkbox.parentElement.classList.toggle("completed");
//             const inputId= checkbox.nextElementSibling.id
//             allGoals[inputId].completed = !allGoals[inputId].completed
//             completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
//             localStorage.setItem('allGoals', JSON.stringify(allGoals)) 

//             progressValue.style.width = `${completedGoalsCount/3 * 100}%`;
//             progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`

//         }

//         else
//         {
//             errorLabel.parentElement.classList.add("show");
//         }

//     })
// })


// // when input field is focused ie. when user starts typing error should vanish
// inputFields.forEach((input)=>{
//     input.value = allGoals[input.id].name

//     if (allGoals [input.id].completed){
//         input.parentElement.classList.add("completed")
//     }
//     input.addEventListener('focus',()=>{
//         errorLabel.parentElement.classList.remove("show");
//     })

//     input.addEventListener('input',(e)=>{
//         allGoals[input.id]={
//             name:input.value,
//             completed:false,
//         }
//         localStorage.setItem('allGoals',JSON.stringify(allGoals)) 
//     })
// })



const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressValue = document.querySelector(".progress-value");

// Initialize goals from localStorage or use default values
const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
    first: { name: "", completed: false },
    second: { name: "", completed: false },
    third: { name: "", completed: false },
};

// Update UI on page load
let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;
progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`;

inputFields.forEach((input) => {
    const goalId = input.id;

    // Populate input field with saved value
    input.value = allGoals[goalId]?.name || "";

    // Add 'completed' class if goal is marked as completed
    if (allGoals[goalId]?.completed) {
        input.parentElement.classList.add("completed");
    }

    // Remove error label on focus
    input.addEventListener("focus", () => {
        errorLabel.parentElement.classList.remove("show");
    });

    // Update goal in localStorage on input
    input.addEventListener("input", (e) => {
        allGoals[goalId] = {
            name: e.target.value,
            completed: allGoals[goalId]?.completed || false,
        };
        localStorage.setItem("allGoals", JSON.stringify(allGoals));
    });
});

// Checkbox click event listener
checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
        // Check if all input fields are filled
        const allGoalsAdded = [...inputFields].every((input) => input.value);

        if (allGoalsAdded) {
            const inputId = checkbox.nextElementSibling.id;

            // Toggle 'completed' status and class
            checkbox.parentElement.classList.toggle("completed");
            allGoals[inputId].completed = !allGoals[inputId].completed;

            // Update completed goals count
            completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;
            progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`;
            progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`;

            // Save updated goals to localStorage
            localStorage.setItem("allGoals", JSON.stringify(allGoals));
        } else {
            // Show error label if not all goals are added
            errorLabel.parentElement.classList.add("show");
        }
    });
});
