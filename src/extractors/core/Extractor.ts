import { BaseExtractor } from './BaseExtractor';
import { Chain, ChainLink } from '../../chains';
import type {
  Action,
  DataExtractor,
  Patterns,
  TransientObject,
} from '../../types';

class InternalExtractor extends BaseExtractor implements DataExtractor {
  private async prepareURI(
    data: TransientObject,
    ctx: InternalExtractor
  ): Promise<TransientObject> {
    if (data.uri) {
      const path = await ctx.setUri(data.uri);
      return await Promise.resolve({ ...data, uri: path });
    }

    const path = await ctx.getUri();
    return await Promise.resolve({ ...data, uri: path });
  }

  private async checkEnv(
    data: TransientObject,
    ctx: InternalExtractor
  ): Promise<TransientObject> {
    const canIExtract = await ctx.canIExtract();

    if (canIExtract) {
      return Promise.resolve(data);
    }

    throw new Error('You cannot continue with extraction.');
  }

  private async getPages(
    data: TransientObject,
    ctx: InternalExtractor
  ): Promise<TransientObject> {
    const pages = await ctx.getNumberOfPages();
    return Promise.resolve({ ...data, pages });
  }

  private async applyPassword(
    data: TransientObject,
    ctx: InternalExtractor
  ): Promise<TransientObject> {
    const isEncrypted = await ctx.isEncrypted();

    if (!isEncrypted) {
      return Promise.resolve({ ...data, isEncrypted });
    }

    throw new Error('You need provide password to continue with extraction.');
  }

  private async getMatches(
    data: TransientObject,
    ctx: InternalExtractor
  ): Promise<TransientObject> {
    const text = !data.patterns
      ? await ctx.getText()
      : await ctx.getTextWithPattern(data.patterns);

    return Promise.resolve({ ...data, text });
  }

  async extract(uri?: string, patterns?: Patterns): Promise<TransientObject> {
    const start = new Date().getTime();

    const data = await new Chain([
      new ChainLink(this.prepareURI as Action),
      new ChainLink(this.checkEnv as Action),
      new ChainLink(this.getPages as Action),
      new ChainLink(this.applyPassword as Action),
      new ChainLink(this.getMatches as Action),
    ]).exec({ uri, patterns }, this);

    const finish = new Date().getTime();

    return { ...data, duration: `${finish - start}ms` };
  }

  async extractFromIntent(patterns?: Patterns): Promise<TransientObject> {
    const start = new Date().getTime();
    const canIExtract = await this.canIExtract();
    let data = {};

    if (canIExtract) {
      data = await this.extract(undefined, patterns);
    }

    const finish = new Date().getTime();

    return { ...data, duration: `${finish - start}ms` };
  }
}

export const Extractor = new InternalExtractor() as DataExtractor;
