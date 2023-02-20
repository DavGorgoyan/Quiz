import { RequestHandler } from "express";

export function getResponseTemplate():TResponseTemplate {
    return {
      meta: {
        error: null,
        status: 200,
      },
      data: {}
    }
  }


export type TRoute = {
  path: string,
  router: RequestHandler,
  middlewares?: RequestHandler[],
  auth?: boolean
};

export type TResponseTemplate = {
  meta: {
    error: null | {
      code: number,
      message: string,
      info?: any
    },
    status: number
  },
  data: Object
};

export type TError = {
  code: number,
  message: string,
  status: number
}


export interface JSONFormatter {
  questions:{
    id:number | string,
    question:string,
    answer:string[],
    result:boolean
  }[],
  
}
