import { getResponseTemplate,JSONFormatter } from "./lib";
import fs from "fs/promises";
import { RequestHandler } from "express";

export const getQuestion:RequestHandler = async (req,res) => {
    const result = getResponseTemplate();
    try {
        let data:string = await fs.readFile('./src/questions.json',"utf-8"); 
            let newData:JSONFormatter = JSON.parse(data); 
            let i = 0;
            while (i < newData.questions.length) {
                let theQuestion;
                if (newData.questions[i].id == +req.params.id) {
                    theQuestion = newData.questions[i].question;
                    result.data = theQuestion;
                    break;
                } 
                i++;
            }
            if(i == newData.questions.length)
            {
                throw { 
                    code: 4060, 
                    message: `ID-ն չի գտնվել`,
                    status: 406 
                };
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

export const checkAnswer:RequestHandler = async (req,res) => {
    const result = getResponseTemplate();
    try {
        const data = await fs.readFile("./src/questions.json", "utf-8");
        let newData:JSONFormatter = JSON.parse(data);
        for (let i = 0; i < newData.questions.length; i++) {
            let current = newData.questions[i];
            if(current.id == +req.params.id) {
                if(current.answer.includes(req.body.answer)) {
                    current.result = true;
                    result.data = current.result;
                    break;
                }else {
                    result.data = current.result;
                    break;
                }
            }    
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