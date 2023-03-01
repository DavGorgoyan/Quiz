import { getResponseTemplate } from "../../helpers/lib";
import { RequestHandler } from "express";
import  operations from "../../providers/db/operations"


export const createQuiz:RequestHandler = async(req,res) => {
    const result = getResponseTemplate();
    try {
        const resultingData = await operations.insert('quizes',req.body);
        result.data = resultingData;
        
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

export const getQuiz:RequestHandler = async(req,res) => {
    const result = getResponseTemplate();
    try {
        const query = "SELECT a.id,a.question_id,a.content,a.isCorrect, q.content AS question FROM answers a " +
                      "LEFT JOIN questions q ON a.question_id = q.id " +
                      "ORDER BY question_id;"
        const quizData = await operations.getOne("quizes",req.params.id);
        const content = await operations.exec(query);
        result.data = {
            "quiz_title":quizData.title,
            "questions": content
        }        
        
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

export const getAllTheQuizes:RequestHandler = async(req,res) => {
    const result = getResponseTemplate();
    try {        
        const { page = 1, rowsPerPage = 10 } = req.query;
        const query =
            "SELECT * FROM quizes " +
            "LIMIT ?,?"
        const paginated = await operations.exec(query, [(+page - 1) * +rowsPerPage, +rowsPerPage])
        result.data = paginated;
        
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

export const updateQuiz:RequestHandler = async(req,res) => {
    const result = getResponseTemplate();
    try {
        const data = await operations.update("quizes",req.body,{"id":req.params.id});
        result.data = data;
        
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

export const removeQuiz:RequestHandler = async(req,res) => {
    const result = getResponseTemplate();
    try {
        const data = await operations.remove("quizes",{"id":req.params.id});
        result.data = data;

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