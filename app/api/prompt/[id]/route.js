import connectDB from "utils/connectDB";
import Prompt from "models/prompt";

//GET
//PATCH
//DELETE

export const GET = async (request, { params }) => {
  await connectToDB();
  const prompt = await Prompt.findById(params.id).populate("creator");
  try {
    if (!prompt) {
      return new Response(JSON.stringify("Prompt not found"), {
        status: 404,
      });
    } else {
      return new Response(JSON.stringify(prompt), {
        status: 200,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify("Failed to Fetch post data"), {
      status: 500,
    });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findByI(params.id);
    if (!existingPrompt) {
      return new Response(JSON.stringify("Prompt not found"), {
        status: 404,
      });
    } else {
      existingPrompt.prompt = prompt;
      existingPrompt.tag = tag;
      await existingPrompt.save();
      return new Response(JSON.stringify(existingPrompt), {
        status: 200,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify("Failed to Fetch post data"), {
      status: 500,
    });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const prompt = await Prompt.findById(params.id);
    if (!prompt) {
      return new Response(JSON.stringify("Prompt not found"), {
        status: 404,
      });
    } else {
      await prompt.remove();
      return new Response(JSON.stringify("Prompt deleted"), {
        status: 200,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify("Failed to Fetch post data"), {
      status: 500,
    });
  }
};
