import jwt from 'jsonwebtoken';
import { isTokenBlacklisted } from '../models/blacklistModel.js';

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No authentication token provided.'
      });
    }

    const token = authHeader.split(' ')[1];

    // Check if token is in blacklist
    const blacklisted = await isTokenBlacklisted(token);
    if (blacklisted) {
      return res.status(401).json({
        success: false,
        message: 'Token has been revoked. Please log in again.'
      });
    }

    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    req.token = token;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please log in again.'
    });
  }
};
