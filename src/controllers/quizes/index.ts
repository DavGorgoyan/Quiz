import { PrismaClient } from '@prisma/client';
import { getResponseTemplate } from "../../helpers/lib";
import { RequestHandler } from "express";
const prisma = new PrismaClient();


export const createQuiz:RequestHandler = async(req,res) => {
    const result = getResponseTemplate();
    try {
        const resultingData = await prisma.quizes.create({
            data:{
                title:`${req.body.title}`
            }
        })
        result.data = {
            insertID:resultingData.id,
            messsage:"Տվյալներն ավելացվեցին հաջողությամբ"
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

export const getQuiz:RequestHandler = async(req,res) => {
    const result = getResponseTemplate();
    try {

        const resultingData = await prisma.quizes.findFirst({
            select:{
                id:true,
                title:true,
                questions:{
                    select:{
                        content:true,
                        id:true,
                        answers:{
                            select:{
                                content:true,
                                isCorrect:true,
                                id:true
                            }
                        }
                    }
                }
            },
            where:{
                id: +req.params.id
            }
        })
        
        result.data = {
            "quiz_title":resultingData?.title,
            "questoin_content":resultingData?.questions
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
        let { page = 1,rowsPerPage = 10 }= req.query
        let skip = (+page - 1) * +rowsPerPage;
        const resultingData = await prisma.quizes.findMany({
            take:+rowsPerPage,
            skip
        })

        result.data = resultingData;
        
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
        const resultingData = await prisma.quizes.update({
            data:{
                title: req.body.title
            },
            where:{
                id:+req.params.id
            }
        })

        result.data = {
            resultingData
        }
        
    }catch (err:any) {
        console.log(err);
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.meta || err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);  
}

export const removeQuiz:RequestHandler = async(req,res) => {
    const result = getResponseTemplate();
    try {
        await prisma.quizes.delete({
            where:{
                id: +req.params.id
            }
        })

        result.data = {
            message:"Տվյալները ջնջվեցին հաջողությամբ"
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