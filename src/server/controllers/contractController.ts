import { Request, Response } from 'express';
import { contractService } from '../services/contractService';

export const contractController = {
  async getAllContracts(req: Request, res: Response) {
    try {
      const contracts = await contractService.getAllContracts();
      res.json(contracts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch contracts' });
    }
  },

  async createContract(req: Request, res: Response) {
    try {
      const contract = await contractService.createContract(req.body);
      res.json(contract);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create contract' });
    }
  }
};