function gameRoutes(app){
  
let goodAnswers =0;
let isGameOver = false;
let callToAFriendUsed = false;
let questionToTheCrowdUsed = false;
let halfOnHalfUsed = false;
let winner = false; 
// let callToAFriendUsed= false;
// let questionToTheCrowdUsed= false;
// let halfOnHalfUsed= false;

const questions = [ 
  {
    question: "najlepszy jezyk programowania?",
    answers: ["C++", "JavaScript", "Java", "Python"],
    correctAnswer: 1,
  },
  {
    question: "lubie frytki?",
    answers: ["moze", "nie", "nie wiem", "tak"],
    correctAnswer: 3,
  },
  {
    question: "pizaaa?",
    answers: ["Dwie", "trzy", "nieee", "wolę brokuły "],
    correctAnswer: 0,
  },
];


app.get("/question", (req, res)=>{
  if(goodAnswers===questions.length){
    res.json({

      winner:true,

    })

  }else if(isGameOver){
    res.json({
      loser:true,
    })
  }

  else{

    const nextQuestion = questions[goodAnswers];
    const { question, answers} = nextQuestion;
    res.json({
      question, answers,
    })
  }

});

app.post("/answer/:index",(req,res)=>{


  if(isGameOver) {
    res.json({
      loser:true,
    });
  }

  const {index} = req.params;
  const question = questions[goodAnswers];
  
  const isGoodAnswer= question.correctAnswer === Number(index)

  if(isGoodAnswer){
      goodAnswers++;
  }else {
    isGameOver = true;
  }

  res.json({
   correct: isGoodAnswer,
   goodAnswers,
  })
    })
  
  
    
    app.get(`/help/friend/`,(req,res)=>{
      if(callToAFriendUsed){
        return res.json({
          text: "użyte"})
        }else{
          
          const doesFriendKnowAnswer = Math.random()<0.7
          const question = questions[goodAnswers]
     console.log(question.answers[question.correctAnswer])
     callToAFriendUsed = true;
          
          res.json({
        text: 
        doesFriendKnowAnswer ? `hmm wydaje mi sie ze odpowiedz to ${question.answers[question.correctAnswer]} `: "wiem ale nie powiem  "
      }) 
    }
    })
      // ===========================================



         app.get(`/help/half/`,(req,res)=>{
      if(halfOnHalfUsed){
        return res.json({
          text: "użyte"})
        }else{
          
          const question = questions[goodAnswers]
          
          const answersCopy = question.answers.filter((s,index)=> (index!==question.correctAnswer))  
          answersCopy.splice(~~(Math.random()*answersCopy.length), 1)
    
    
           halfOnHalfUsed = true;
      
    
          res.json({
        answersToRemove: answersCopy
      }) 


    }
    })

//================= pytanie do trolli

app.get("/help/crowd",(req,res)=>{
  if(questionToTheCrowdUsed){
    return res.json({
      text: "zużyte"
    })
  }

  const question = questions[goodAnswers]
  const {correctAnswer} = question
  const chart = [10,20,30,40];
  questionToTheCrowdUsed = true;
  for (let i = chart.length-1; i > 0; i--) {
    const change = Math.floor(Math.random()*20 - 10);
    chart[i] += change;
    chart[i-1] -= change;
  }



  [chart[3],chart[correctAnswer]]= [chart[correctAnswer],chart[3]]





  res.json({
    chart
  })
})


};
module.exports = gameRoutes