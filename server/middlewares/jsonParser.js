import express from 'express';

export const safeJsonParser = (req, res, next) => {
  if (req.method === 'GET' || req.method === 'HEAD') {
    return next();
  }
  express.json()(req, res, next);
};
