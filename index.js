import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function ai() {
  const question = await fetch()
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `${question}`,
      },
    ],
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
              user: { type: "string" },
              tasks: { type: "array", items: { type: "string" } },
              time_gaps: { type: "array", items: { type: "string" } },
            },
            required: ["user", "tasks", "time_gaps"],
          },
        },
      },
    ],
  });
  // .then((chatCompletion) => {
  //   console.log(chatCompletion.choices[0]?.message?.content || "");
  // });
  console.log(JSON.stringify(completion.choices[0], null, 2));


 const toolCalls= completion.choices[0].message.tool_calls
if (!toolCalls) {
  console.log(`Assistant: ${completion.choices[0].message.content}`)
  return
}

for( const tool of toolCalls){
  const functionName =tool.function.name
  const functionArguments =tool.function.arguments
  if (functionName==='timeManagement') {
    const result =timeManagement(functionArguments)
  }
}
}

ai();

function timeManagement(form, to) {
  console.log("time is comming");
  // return db here mogo ya vector0
  return " 12 hours left";
}
// timeManagement();
