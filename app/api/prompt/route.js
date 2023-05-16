import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
    try{
        await connectToDB();
        const prompts = await Prompt.find({}).populate("creator");
        console.log(prompts)
        return new Response(JSON.stringify(prompts), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify("Failed to Fetch post data"), {
            status: 500,
        });
    }
};
