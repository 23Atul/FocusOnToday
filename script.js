const checkBoxList = document.querySelectorAll(".custom-checkbox");

// returns array of inputnodes
const inputFields = document.querySelectorAll(".goal-input");  

const errorLabel = document.querySelector(".error-label")
const progressValue = document.querySelector(".progress-value");




const allGoals=JSON.parse(localStorage.getItem("allGoals")) || {}
let completedGoalsCount = Object.values(allGoals).filter((goal)=> goal.completed).length
progressValue.style.width = `${completedGoalsCount / 3 * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`






checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click',(e) => {


        // for each  node elements it will check if input filed is empty or not, if any of the filed is empty it will return false
        const allGoalsAdded = [...inputFields].every(function (input){
            return input.value;
        })

        if (allGoalsAdded)
        {
            checkbox.parentElement.classList.toggle("completed");
            const inputId= checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
            localStorage.setItem('allGoals', JSON.stringify(allGoals)) 

            progressValue.style.width = `${completedGoalsCount/3 * 100}%`;
            progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`

        }

        else
        {
            errorLabel.parentElement.classList.add("show");
        }

    })
})


// when input field is focused ie. when user starts typing error should vanish
inputFields.forEach((input)=>{
    input.value = allGoals[input.id].name

    if (allGoals [input.id].completed){
        input.parentElement.classList.add("completed")
    }
    input.addEventListener('focus',()=>{
        errorLabel.parentElement.classList.remove("show");
    })

    input.addEventListener('input',(e)=>{
        allGoals[input.id]={
            name:input.value,
            completed:false,
        }
        localStorage.setItem('allGoals',JSON.stringify(allGoals)) 
    })
})