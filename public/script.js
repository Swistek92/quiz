



function fillQuestionElements(data){
  const question = document.querySelector("#question")
  const gameBoard = document.querySelector("#game-board")
  const h2 = document.querySelector("h2");
  const knefle = document.querySelector("#knefle")
  if(data.winner === true){
    knefle.style.display ="none"
    gameBoard.style.display = "none"
    h2.innerText= "WYGRAŁEŚ/AŚ !!!!!!"
    question.innerText = ""
    return;
  }
  if(data.loser===true){
    knefle.style.display ="none"
    gameBoard.style.display = "none"
    h2.innerText= "Coś poszło nie tak...."
    question.innerText = ""
    return;
  }

  // console.log(data)
  // const answer1 = document.querySelector("#answer1")
  // const answer2 = document.querySelector("#answer2")
  // const answer3 = document.querySelector("#answer3")
  // const answer4 = document.querySelector("#answer4")

 question.innerText= data.question
//  answer1.innerText= data.answers[0]
//  answer2.innerText= data.answers[1]
//  answer3.innerText= data.answers[2]
//  answer4.innerText= data.answers[3]

  for (const i in data.answers){
    // console.log(data.answers)

    const answer = document.querySelector(`#answer${Number(i)+1}`)
    
    answer.innerText= data.answers[i]
  }



}



function showNextQuestion(){
  fetch("/question", {
    method:"GET",
  })
  .then(response => response.json())
  // .then(data => console.log(data))
  .then(data => fillQuestionElements(data)
  );
}

showNextQuestion();

function handleAnswerFeedback(data){
  const goodAnswerSpan = document.querySelector("#good-answers")
  console.log(goodAnswerSpan)
goodAnswerSpan.innerText = data.goodAnswers;
showNextQuestion();
}


function sendAnswer(answerIndex){
 fetch(`/answer/${answerIndex}`, {
    method:"POST",
  })
  .then(response => response.json())
  // .then(data => console.log(data))
  .then(data => handleAnswerFeedback(data)
  );
}


const buttons = document.querySelectorAll('.btn-answer');
for (const button of buttons){
  button.addEventListener("click",(e)=>{
    const answerIndex = e.target.dataset.answer;
    sendAnswer(answerIndex);
  })
}


function handleFriendsAnswer (data){
  // console.log(data.text)
  const tipDiv = document.querySelector("#tip")
  tipDiv.innerText=data.text
}


// --------------------------------- dzwoń do znajomego

function callToAFriend(){
  console.log("działa")
  fetch(`/help/friend/`, {
    method:"GET",
  })
  .then(response => response.json())
  .then(data => handleFriendsAnswer(data))
  

  
}
document.querySelector("#CallToAFriend")
.addEventListener("click", callToAFriend);

// -------------------------------------  50/50

function handleHalfOnHalf (data){
  if(typeof data.text === "string"){
    const tipDiv = document.querySelector("#tip")
    tipDiv.innerText=data.text

  }else { 
    for (const button of buttons){
        if(data.answersToRemove.indexOf(button.innerText)>-1){
          button.style.display = "none";
        }
    }
  }
}

function halfonHalf(){
  console.log("działa")
  fetch(`/help/half/`, {
    method:"GET",
  })
  .then(response => response.json())
  .then(data => handleHalfOnHalf(data))
  

  
}
document.querySelector("#HalfOnHalf")
.addEventListener("click", halfonHalf);


//--------------------------------      pytanie do trolli

function handleCrowAnswer (data){
  console.log(data)
  if(typeof data.text === "string"){
    const tipDiv = document.querySelector("#tip")
    tipDiv.innerText=data.text

  }else { 
      data.chart.forEach((precent, index)=>{
        buttons[index].innerText = `${buttons[index].innerText}: ${precent}%`
      })
    }







}

function questionToTheCrow(){
  // console.log("działa")
  fetch(`/help/crowd/`, {
    method:"GET",
  })
  .then(response => response.json())
  .then(data => handleCrowAnswer(data))
  

  
}
document.querySelector("#questionToTheCrow")
.addEventListener("click", questionToTheCrow);