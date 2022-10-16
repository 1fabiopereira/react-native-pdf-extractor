import type { ChainLink } from './ChainLink';

export class Chain {
  private readonly entryPoint?: ChainLink;

  constructor(nodes: ChainLink[]) {
    this.entryPoint = nodes.shift();

    if (this.entryPoint && nodes.length) {
      nodes.reduce((chain: ChainLink, handler: ChainLink) => {
        return chain.setNext(handler) as ChainLink;
      }, this.entryPoint);
    }
  }

  async exec<T, U>(data?: T, ctx?: U): Promise<any> {
    if (this.entryPoint) {
      return await this.entryPoint.handle(data, ctx);
    }

    return await Promise.resolve(null);
  }
}
