import type { Handler } from '../../types';

export class AbstractChain implements Handler {
  private nextHandler?: Handler;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  async handle<T>(data: T): Promise<T> {
    if (this.nextHandler) {
      return await this.nextHandler.handle(data);
    }

    return data;
  }
}
