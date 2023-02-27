import {Router} from "express";
import questionRouter  from "./questions/index";
import quizRouter from "./quizes/index";

const router = Router();

router.use('/question',questionRouter);
router.use('/quiz',quizRouter);

export default router;