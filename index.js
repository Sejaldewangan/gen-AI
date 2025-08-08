import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const normal_tasks =[

]
async function ai() {

const messages =[
{
        role: "system",
        content: `you are jarvis  a time manager ai which helps people with a lot of enthusiasum your task is to divide user's time for normal,importantand very important tasks and current date time is ${new Date().toUTCString()} `,
      },
]

messages.push( {
        role: "user",
        content:  "hey i just completed a task now 15 hours are left"   ,
      },)

while (true) {
  while (true) {
  // const question = await fetch()
  const completion = await groq.chat.completions.create({
    messages: messages,
    model: "llama-3.3-70b-versatile",
    tools: [
      {
        type: "function",
        function: {
          name: "timeManagement",
          description: "Manages tasks within time gaps",
          parameters: {
            type: "object",
            properties: {
              form:{
                type:String,
                description:"get total time left"
              },
              to:{
                type:String,
                description:"get total time left"
              }
            },
           
          },
        },
      },
       {
        type: "function",
        function: {
          name: "normalTasks",
          description: "arrange normal tasks within perfect time gaps",
          parameters: {
            type: "object",
            properties: {
              task:{
                type:String,
                description:"arrange tasks like normal in perfect time"
              },
              timeTaken:{
                type:String,
                description:"tell the time rmaining to complete tasks"
              }
            },
           
          },
        },
      },
    ],
  });
  // .then((chatCompletion) => {
  //   console.log(chatCompletion.choices[0]?.message?.content || "");
  // });
  console.log(JSON.stringify(completion.choices[0], null, 2));
messages.push(completion.choices[0].message)
  const toolCalls = completion.choices[0].message.tool_calls;
  if (!toolCalls) {
    console.log(`Assistant: ${completion.choices[0].message.content}`);
    break
  }
let ids
 let result = "";
  for (const tool of toolCalls) {
    const functionName = tool.function.name;
    const functionArguments = tool.function.arguments;
    ids = tool.id
    if (functionName === "timeManagement") {
      result = timeManagement(JSON.parse(functionArguments));
    }
    else if (functionName==="normalTasks")     {
      result = normalTasks(JSON.parse(functionArguments));
    }
    
  }
  messages.push({
    role:"tool",
    content:result,
    tool_call_id:ids
  })

//   const completion2 = await groq.chat.completions.create({
//   messages:messages,
//   model: "llama-3.3-70b-versatile",
//   tools: [
//     {
//       type: "function",
//       function: {
//         name: "timeManagement",
//         description: "Manages tasks within time gaps",
//         parameters: {
//           type: "object",
//           properties: {
//             user: { type: "string" },
//             tasks: { type: "array", items: { type: "string" } },
//             time_gaps: { type: "array", items: { type: "string" } },
//           },
//           required: ["user", "tasks", "time_gaps"],
//         },
//       },
//     },
//   ],
// });
// console.log(JSON.stringify(completion2.choices[0], null, 2));

// timeManagement();}

console.log("==============================================================================================================================================================================");
console.log("MESSAGES:",messages)
}
}


console.log("==============================================================================================================================================================================");
console.log("tasksN:"+normal_tasks)




}
ai();


function timeManagement(form, to) {
  console.log("time is comming");
  // return db here mogo ya vector0
  return " 12 hours left";
}

function normalTasks({task ,timeTaken}) {
  console.log(`task is comming: ${task}, time for task :${timeTaken}`);
  
  normal_tasks.push({task:"",timeTaken:""})
  return "addad to database"
}