import { _INVALID_CORRECT_ANSWERS } from '../helpers/error-codes';
import { RequestHandler } from 'express';


export const answer_validation = ():RequestHandler => (req,res,next) =>  {
    let answers = req.body.answers;
    let containsCorrAnswer = [];
    for (let i = 0; i < answers.length; i++) {

        if(answers[i].isCorrect === true) {
            containsCorrAnswer.push(i);
        }

        if(containsCorrAnswer.length == 0 || containsCorrAnswer.length > 1) throw _INVALID_CORRECT_ANSWERS;
    }
    next();
}