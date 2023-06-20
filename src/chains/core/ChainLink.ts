import { AbstractChain } from './AbstractHandler';

export class ChainLink extends AbstractChain {
  private readonly action: any;

  constructor(action: any) {
    super();
    this.action = action;
  }

  async handle<T>(data: T): Promise<T> {
    const result = await this.action(data);
    return await super.handle(result);
  }
}
