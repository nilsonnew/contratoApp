import { Request, Response } from 'express';
import { prisma } from '../../lib/db';

export const adminController = {
  async cleanDatabase(req: Request, res: Response) {
    try {
      // Delete all records in reverse order of dependencies
      await prisma.commission.deleteMany();
      await prisma.contract.deleteMany();
      await prisma.client.deleteMany();
      
      res.json({ message: 'Database cleaned successfully' });
    } catch (error) {
      console.error('Database cleanup error:', error);
      res.status(500).json({ error: 'Failed to clean database' });
    }
  }
};