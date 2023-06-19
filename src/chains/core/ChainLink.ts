import { AbstractChain } from './AbstractHandler';
import type { Action } from '../../types';

export class ChainLink extends AbstractChain {
  private readonly action: Action;

  constructor(action: Action) {
    super();
    this.action = action;
  }

  async handle<T>(data: T): Promise<T> {
    const result = await this.action(data);
    return await super.handle(result);
  }
}
