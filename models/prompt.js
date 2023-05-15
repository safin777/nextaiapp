import { Schema,model,models } from "mongoose";


const promptSchema = new Schema({
    creator : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please enter your creator,its required"],
        trim: true,
    },
    
    prompt: {
        type: String,
        required: [true, "Please enter your prompt,its required"],
        trim: true,
    },

    tag: {
        type: String,
        required: [true, "Please enter your tag,its required"],
        trim: true,
    },

    
});

const Prompt = models.Prompt || model("Prompt", promptSchema);

export default Prompt;

