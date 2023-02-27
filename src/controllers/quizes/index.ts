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
        const data = await operations.getOne("quizes",req.params.id);
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

export const getAllTheQuizes:RequestHandler = async(req,res) => {
    const result = getResponseTemplate();
    try {        
        const data = await operations.select("quizes","*");
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