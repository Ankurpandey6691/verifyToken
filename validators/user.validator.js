import { body } from "express-validator";

export const createUserValidator = [
  body("user_name")
    .trim()
    .notEmpty().withMessage("User Name is Required")
    .isLength({ min: 2, max: 32 }).withMessage("Invalid Name"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email Id is Required")
    .isEmail().withMessage("Invalid Email Address"),

  body("mobile")
    .trim()
    .notEmpty().withMessage("Mobile is Required")
    .matches(/^(0|91)?[6-9][0-9]{9}$/)
    .withMessage("Invalid Mobile Number"),

  body("password")
    .notEmpty().withMessage("Password is Required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

];

export const updateUserValidator = [
  body("user_name")
    .trim()
    .notEmpty().withMessage("User Name is Required")
    .isLength({ min: 2, max: 32 }).withMessage("Invalid Name"),

  body("address")
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage("Invalid address")
    .optional(),

  body("bio")
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage("Invalid bio")
    .optional(),

  body("date_of_birth")
    .trim()
    .isDate()
    .optional(),

  body("gender")
    .trim()
    .equals(["male","female","other"])
    .optional(),
];