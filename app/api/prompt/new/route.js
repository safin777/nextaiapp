import {connectToDB} from "@utils/database";

export const POST = async (req, res) => {
  const { prompt, tag, userId } = await req.json();
  
  try   {
     await connectToDB();
  } catch (error) {
    console.log(error);
  }
  
  
};
