import { createQuiz,
         getQuiz,
         getAllTheQuizes,
         updateQuiz,
        removeQuiz } from './../../controllers/quizes/index';
import { Router } from "express";
import { validate } from '../../middlewares';

const router = Router();

router.post("",validate("quizes"),createQuiz);
router.get("/:id",getQuiz);
router.get("/all/quizes",getAllTheQuizes);
router.put("/:id",updateQuiz);
router.delete("/:id",removeQuiz);

export default router;