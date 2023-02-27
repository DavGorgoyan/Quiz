import { createQuiz,
         getQuiz,
         getAllTheQuizes,
         updateQuiz,
        removeQuiz } from './../../controllers/quizes/index';
import { Router } from "express";

const router = Router();

router.post("",createQuiz);
router.get("/:id",getQuiz);
router.get("",getAllTheQuizes);
router.put("/:id",updateQuiz);
router.delete("/:id",removeQuiz);

export default router;