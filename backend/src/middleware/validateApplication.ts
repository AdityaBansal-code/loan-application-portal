import { Request, Response, NextFunction } from "express";

const validLanguages = [
  "Hindi",
  "Tamil",
  "Telugu",
  "Marathi",
  "English",
];

export const validateApplication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, mobile, amount, purpose, language } = req.body;

  if (!name?.trim()) {
    return res.status(400).json({
      error: "Applicant name is required",
    });
  }

  if (!mobile?.trim()) {
    return res.status(400).json({
      error: "Mobile number is required",
    });
  }

  if (!/^\d{10}$/.test(mobile)) {
  return res.status(400).json({
    error: "Mobile number must be 10 digits",
  });
}

  if (amount <= 0) {
    return res.status(400).json({
      error: "Loan amount must be greater than 0",
    });
  }

  if (!purpose?.trim()) {
    return res.status(400).json({
      error: "Loan purpose is required",
    });
  }

  if (!validLanguages.includes(language)) {
    return res.status(400).json({
      error: "Invalid language",
    });
  }

  next();
};