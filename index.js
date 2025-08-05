import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function ai() {
    const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "system",
          content: "your name is Plain , a time management assistant for youser",
        },
      ],
      model: "llama-3.3-70b-versatile",
    })
    // .then((chatCompletion) => {
    //   console.log(chatCompletion.choices[0]?.message?.content || "");
    // });
    console.log(JSON.stringify(completion.choices[0],null,2));
}

ai()