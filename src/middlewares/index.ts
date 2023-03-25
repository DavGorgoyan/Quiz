import requestValidations from "./configs";
import { _WRONG_PARAMS_ } from "../helpers/error-codes";
import { TDictionary } from "../helpers/lib";
import { RequestHandler } from "express";

export const validate = (type:string):RequestHandler => (req,res,next) => {
    const currentValidation = requestValidations[type];
    const fields: TDictionary = {};
    
    if(currentValidation){
        for (const key in req.body) {
                fields[key] = req.body[key];
            }
        const {error} = currentValidation.validate(fields);
        if(error) 
            throw _WRONG_PARAMS_;

    }else {
        throw "Not correct validation type";
    }
    next();
} 