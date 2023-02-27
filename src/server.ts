import { TRoute } from './helpers/lib';
import express,{ Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import apiRouter from "./routes/index";

const app:Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const rootRoutes:TRoute[] = [
    { path: "/api", router: apiRouter }
]

rootRoutes.forEach(el => {
    app.use(el.path, el.router);
})


app.use('*', (req:Request, res:Response) => {
    res.status(404).json({
        message: "Request URL does not exist"
    });
})

app.use((err:any, req:Request, res:Response, next:NextFunction) => {
    console.log(err);
    res.status(err?.status || 500).json({
        meta: {
            error: {
                code: err.code || err.errCode || 5000,
                message: err.message || err.errMessage || "Unknown Error"
            },
            status: err?.status || 500
        },
        data: {}
    })
});


export default app;