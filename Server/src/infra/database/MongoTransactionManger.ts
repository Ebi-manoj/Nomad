// infrastructure/database/MongoTransactionManager.ts
import { ClientSession, startSession } from 'mongoose';
import { ITransactionManager } from '../../application/providers/ITransactionManager';
import { IBaseRepository } from '../../application/repositories/IBaseRepository';

export class MongoTransactionManager implements ITransactionManager {
  constructor(private readonly repositories: Array<IBaseRepository<any>>) {}

  async runInTransaction<T>(work: () => Promise<T>): Promise<T> {
    const session: ClientSession = await startSession();

    try {
      session.startTransaction();

      // Set session
      this.repositories.forEach(repo => {
        if (typeof repo.setSession === 'function') {
          repo.setSession(session);
        }
      });

      // Execute the work
      const result = await work();

      // Commit transaction
      await session.commitTransaction();

      return result;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
      this.repositories.forEach(repo => {
        if (typeof repo.setSession === 'function') {
          repo.setSession(null);
        }
      });
    }
  }
}
