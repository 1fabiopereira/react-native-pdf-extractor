import { NativeModules, Platform } from 'react-native';
import { Match } from '../../utils';
export * from '../../patterns';

const PdfExtractor = Platform.select({
  android: NativeModules.PdfExtractor,
  ios: {},
});

export class BaseExtractor {
  protected async getUri(): Promise<string | undefined> {
    return PdfExtractor.getUri();
  }

  protected async isEncrypted(): Promise<boolean> {
    return PdfExtractor.isEncrypted();
  }

  protected async setUri(uri: string): Promise<string | undefined> {
    return PdfExtractor.setUri(uri);
  }

  protected async getNumberOfPages(password?: string): Promise<number> {
    return PdfExtractor.getNumberOfPages(password);
  }

  protected async canIExtract(): Promise<boolean> {
    return PdfExtractor.canIExtract();
  }

  protected async getText(password?: string): Promise<string[]> {
    const data = await PdfExtractor.getText(password);
    return [...new Set(data?.split('\n') || [])] as string[];
  }

  protected async getTextWithPattern(
    pattern: string | string[],
    password?: string
  ): Promise<(string | null | undefined)[]> {
    const patterns = Array.isArray(pattern) ? pattern : [pattern];
    const data = await this.getText(password);
    const matches = patterns.map((regex) => Match(new RegExp(regex), data));
    return [...new Set(matches)].flat();
  }
}
