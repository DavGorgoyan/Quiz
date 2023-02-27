import { RequestHandler } from 'express';
import { getResponseTemplate } from "../../helpers/lib";
import operations from "../../providers/db/operations";


export const addQuestion:RequestHandler = async(req,res) => {
    const result = getResponseTemplate();
    try {
        const insertionResult = await operations.insert("questions",{ "content":req.body.content, quiz_id:req.query.quiz_id });
        let answersIsnertionIDs = [];
        for (let i = 0; i < req.body.answers.length; i++) {
            let answersIsnertionResult = await operations.insert("answers",{ ...req.body.answers[i], "question_id":insertionResult.insertId })
            answersIsnertionIDs.push(answersIsnertionResult.insertId);
        }

        result.data = {
            answerIDS:answersIsnertionIDs,
            questionID:insertionResult.insertId,
            message:"Տվյալներն ավելացվեցին հաջողությամբ"
        }

    } catch (err:any) {
        console.log(err);
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
}

export const deleteQuestion:RequestHandler = async(req,res,next) => {
    const result = getResponseTemplate();
    try {
        const questionDeletion = await operations.remove("questions",{"id":req.params.id });
        result.data = questionDeletion;

    }catch (err:any) {
        console.log(err);
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
}

export const updateQuestion:RequestHandler = async(req,res) => {
    const result = getResponseTemplate();
    try {
        if(req.body.content){
            await operations.update("questions",{ "content":req.body.content },{ "id":req.params.id });
        }
        
        if(req.body.answers){
            for(let i = 0; i < req.body.answers.length; ++i) {
                await operations.update("answers",req.body.answers[i],{ "question_id":req.params.id ,"id":req.body.answers[i].id })
            }
        }
        result.data = "Տվյալները փոփոխվեցին հաջողությամբ";
        
    }  catch (err:any) {
        console.log(err);
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);     
}


export const checkAnswer:RequestHandler = async (req,res) => {
    const result = getResponseTemplate();
    try {
       const [data] = await operations.select("answers",["isCorrect"],{"id":req.params.id})
       result.data = data.isCorrect;
        
    } catch (err:any) {
        console.log(err);
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);   
}

