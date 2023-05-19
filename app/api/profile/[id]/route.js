import {connectToDB} from "utils/database";
import User from "@models/user";


export const GET = async (request, { params }) => {
    await connectToDB();
    const user = await User.findById(params.id);
    console.log(user);
    try {
        if (!user) {
            return new Response(JSON.stringify("User not found"), {
                status: 404,
            });
        } else {
            return new Response(JSON.stringify(user), {
                status: 200,
            });
        }
    } catch (error) {
        return new Response(JSON.stringify("Failed to Fetch post data"), {
            status: 500,
        });
    }
}