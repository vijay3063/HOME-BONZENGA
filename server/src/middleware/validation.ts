import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
            code: err.code
          }))
        });
      }
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  };
};

// Common validation schemas
export const commonSchemas = {
  pagination: {
    page: 'number',
    limit: 'number'
  },
  
  idParam: {
    id: 'string'
  },
  
  searchQuery: {
    search: 'string?',
    category: 'string?',
    vendorId: 'string?',
    minPrice: 'number?',
    maxPrice: 'number?'
  }
};
