import {Router} from "express";
import { getQuestion, checkAnswer } from "./controllers"

const router:Router = Router();

router.get("/question/:id", getQuestion);
router.post("/checkAnswer/:id", checkAnswer)

export default router;