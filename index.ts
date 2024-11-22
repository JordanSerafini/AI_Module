import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.LLAMA_API_URL || "http://localhost:8000/v1/completions";

const askLlama = async (prompt: string): Promise<void> => {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        model: "zllm",
        prompt,
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("Response from Llama:");
    console.log(response.data.choices[0].text);
  } catch (error: any) {
    console.error("Error communicating with Llama:", (error as Error).message);
  }
};

const main = async () => {
  const prompt = "Expliquez-moi les bases de la programmation en TypeScript.";
  await askLlama(prompt);
};

main();