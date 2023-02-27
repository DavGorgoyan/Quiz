import { addQuestion, 
         deleteQuestion,
         updateQuestion,
         checkAnswer     } from './../../controllers/questions/index';
import { Router } from "express";


const router = Router();

router.post("",addQuestion);
router.delete("/:id",deleteQuestion);
router.put("/:id",updateQuestion)


router.get("/checkAnswer/:id", checkAnswer);    

export default router