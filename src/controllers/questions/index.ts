import { PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';
import { getResponseTemplate } from "../../helpers/lib";
import operations from "../../providers/db/operations";
const prisma = new PrismaClient();

export const addQuestion:RequestHandler = async(req,res) => {
    const result = getResponseTemplate();
    try {
        const resultingData = await prisma.questions.create({
            data:{
                quiz_id:+req.params.quiz_id,
                content:req.body.content,
                answers:{
                    createMany:{
                        data:req.body.answers
                    }
                }
            }
        })
        let answerIDs = await prisma.answers.findMany({
            select:{
                id:true
            },
            where:{
                question_id:resultingData.id
            }
        });
        let mapedIDs = answerIDs.map((bum => bum.id));
        
        result.data = {
            message:"Տվյալներն ավելացվեցին հաջողությամբ",
            questionID:resultingData.id,
            answerIDs:mapedIDs
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
        await prisma.questions.delete({
            where:{
                id: +req.params.id
            }
        })
        result.data = {
            message:"Տվյալները ջնջվեցին հաջողությամբ"
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

//to fix
export const updateQuestion:RequestHandler = async(req,res) => {
    const result = getResponseTemplate();
    try {
        if(req.body.content){
            await prisma.questions.update({
                data:{
                    content:req.body.content
                },
                where:{
                    id:+req.params.id
                }
            })
        }
        let curr = req.body.answers
        if(curr){
            for (let i = 0; i < curr.length; i++) {
                console.log(111);
                
                if(curr[i].isCorrect){
                    console.log(1);
                    
                    await prisma.answers.update({
                        data:{
                            isCorrect:curr[i].isCorrect
                        },
                        where:{
                            id:curr[i].id
                        }
                    })
                    if(curr[i].content){
                        console.log(2);
                        
                        await prisma.answers.update({
                            data:{
                                content:curr[i].content
                            },
                            where:{
                                id:curr[i].id
                            }
                        })
                }
            }
        }
    }
    
        result.data = "Տվյալները փոփոխվեցին հաջողությամբ";
        
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

