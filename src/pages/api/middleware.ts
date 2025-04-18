import type { NextApiRequest, NextApiResponse } from 'next';

type MiddlewareFunction = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => void;

export const cors: MiddlewareFunction = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
};

export const errorHandler: MiddlewareFunction = (req, res, next) => {
  try {
    next();
  } catch (err) {
    const error = err as Error;
    console.error('Unhandled error in API route:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const withMiddleware = (handler: any, middlewares: MiddlewareFunction[]) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await runMiddleware(req, res, middlewares);
      await handler(req, res);
    } catch (err) {
      const error = err as Error;
      console.error('Error in API route:', error);
      if (!res.headersSent) {
        res.status(500).json({
          error: 'Internal server error',
          message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }
    }
  };
};

const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  middlewares: MiddlewareFunction[]
) => {
  return new Promise((resolve, reject) => {
    const run = (index: number) => {
      if (index === middlewares.length) {
        resolve(true);
        return;
      }
      
      try {
        middlewares[index](req, res, () => run(index + 1));
      } catch (error) {
        reject(error);
      }
    };
    
    run(0);
  });
}; 