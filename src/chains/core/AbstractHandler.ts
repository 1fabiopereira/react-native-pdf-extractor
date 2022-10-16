import type { Handler } from '../../types';

export class AbstractChain implements Handler {
  private nextHandler?: Handler;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  async handle<T, U>(data: T, ctx: U): Promise<T> {
    if (this.nextHandler) {
      return await this.nextHandler.handle(data, ctx);
    }

    return await Promise.resolve(data);
  }
}
