import type { ChainLink } from './ChainLink';

export class Chain {
  private readonly chain?: ChainLink;

  constructor(nodes: ChainLink[]) {
    if (nodes.length) {
      const entryPoint = nodes.shift() as ChainLink;

      const reducer = (chain: ChainLink, handler: ChainLink, index: number) => {
        const next = chain.setNext(handler) as ChainLink;
        return index === nodes.length - 1 ? entryPoint : next;
      };

      this.chain = nodes.reduce(reducer, entryPoint);
    }
  }

  async exec<T, U>(data?: T, ctx?: U): Promise<any> {
    if (this.chain) {
      return await this.chain.handle(data, ctx);
    }

    return await Promise.resolve(null);
  }
}
