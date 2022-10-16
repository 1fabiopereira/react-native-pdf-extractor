import { AbstractChain } from './AbstractHandler';
import type { Action } from '../../types';

export class ChainLink extends AbstractChain {
  private readonly action: Action;

  constructor(action: Action) {
    super();
    this.action = action;
  }

  async handle<T, U>(data: T, ctx: U): Promise<T> {
    const result = await this.action(data, ctx);
    return await super.handle(result, ctx);
  }
}
