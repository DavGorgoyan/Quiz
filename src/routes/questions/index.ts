import { validate } from './../../middlewares/index';
import { answer_validation } from '../../middlewares/answer_validation';
import { addQuestion, 
         deleteQuestion,
         updateQuestion,
         checkAnswer     } from './../../controllers/questions/index';
import { Router } from "express";



const router = Router();

router.post("",validate("current_question"),answer_validation(),addQuestion);
router.delete("/:id",deleteQuestion);
router.put("/:id",updateQuestion)


router.get("/checkAnswer/:id", checkAnswer);    

export default router