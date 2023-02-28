import Joi from "joi";

const requestValidations: {
    [key: string]: Joi.ObjectSchema
} = {
    current_question: Joi.object({
            "content":Joi.string().required(),
            "answers":Joi.array().items(
                Joi.object({
                  "content": Joi.string().required(),
                  "isCorrect": Joi.boolean().required(),
                })
              ).min(2),
    }),
    quizes:Joi.object({
      "title":Joi.string().required(),
    })
}


export default requestValidations;
