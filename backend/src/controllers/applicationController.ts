export interface Application {
  id?: string;
  name: string;
  mobile: string;
  amount: number;
  purpose: string;
  language: string;
  status?: string;
  created_at?: Date;
}
// Create Application
import { Request, Response } from "express";
import { pool } from "../config/db.js";

export const createApplication = async (req: Request, res: Response) => {
  try {
    const { name, mobile, amount, purpose, language } = req.body;

    const result = await pool.query(
      `
      INSERT INTO applications
      (name,mobile,amount,purpose,language)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [name, mobile, amount, purpose, language],
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to create application",
    });
  }
};

//Get Applications
export const getApplications = async (
  req: Request,
  res: Response
) => {
  try {
    const { status } = req.query;

    const validStatuses = [
      "pending",
      "approved",
      "rejected",
    ];

    if (
      status &&
      !validStatuses.includes(status as string)
    ) {
      return res.status(400).json({
        error: "Invalid status",
      });
    }

    let query = `
      SELECT *
      FROM applications
      ORDER BY created_at DESC
    `;

    let values: string[] = [];

    if (status) {
      query = `
        SELECT *
        FROM applications
        WHERE status = $1
        ORDER BY created_at DESC
      `;

      values = [status as string];
    }

    const result = await pool.query(
      query,
      values
    );

    return res.json(result.rows);
  } catch {
    return res.status(500).json({
      error: "Failed to fetch applications",
    });
  }
};

//Update Status
export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (status !== "approved" && status !== "rejected") {
      return res.status(400).json({
        error: "Invalid status",
      });
    }

    const result = await pool.query(
      `
  UPDATE applications
  SET status = $1
  WHERE id = $2
  RETURNING *
  `,
      [status, id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Application not found",
      });
    }

    return res.json(result.rows[0]);
  } catch {
    return res.status(500).json({
      error: "Failed to update status",
    });
  }
};

//Summary

export const getSummary = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT
      COUNT(*) as total_applications,
      COALESCE(SUM(amount),0) as total_amount,
      COUNT(*) FILTER (WHERE status='pending') as pending,
      COUNT(*) FILTER (WHERE status='approved') as approved,
      COUNT(*) FILTER (WHERE status='rejected') as rejected
      FROM applications
    `);

    return res.json(result.rows[0]);
  } catch {
    return res.status(500).json({
      error: "Failed to fetch summary",
    });
  }
};
