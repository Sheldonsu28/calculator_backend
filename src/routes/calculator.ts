import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError, CustomError } from "../errors";
import { validateRequest } from "../middlewares";
import { ResBody } from "../types";

const router = express.Router();

const operators = ["+", "-", "*", "/"];

router.post("/calculate", [
  // body("val1").isNumeric(),
  // body("val2").isNumeric(),
  // body("operator").custom((operator) => operators.includes(operator)).withMessage(
  //   `Must be ${operators.join(", ")}!`
  // )
], validateRequest, (req: Request, res: Response<ResBody>)=>{
  const {val1, val2, operator} = req.body;

  let result;

  switch(operator) {
    case "+":
      result = val1 + val2;
      break;

    case "-":
      result = val1 - val2;
      break;

    case "*":
      result = val1 * val2;
      break;

    default:
      if (!val2) throw new BadRequestError("Division by 0");
      result = val1 / val2;
      break;
  }

  res.json({
    success: true,
    payload:{ result }
  });
});

export default router;