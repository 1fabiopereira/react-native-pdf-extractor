import { NativeModules, Platform } from 'react-native';
import { Match } from '../../utils';
import type { Patterns, PDFExtractor, TextResult } from '../../types';

const PdfExtractor = Platform.select({
  android: NativeModules.PdfExtractor,
  ios: {},
}) as PDFExtractor;

export class BaseExtractor {
  async getUri(): Promise<string | undefined> {
    return PdfExtractor.getUri();
  }

  async isEncrypted(): Promise<boolean> {
    return PdfExtractor.isEncrypted();
  }

  async setUri(uri: string): Promise<string | undefined> {
    return PdfExtractor.setUri(uri);
  }

  async getNumberOfPages(password?: string): Promise<number> {
    return PdfExtractor.getNumberOfPages(password);
  }

  async canIExtract(): Promise<boolean> {
    return PdfExtractor.canIExtract();
  }

  async getText(password?: string): Promise<string[]> {
    const data = await PdfExtractor.getText(password);
    return [...new Set(data?.split('\n') || [])] as string[];
  }

  async getTextWithPattern(
    pattern: Patterns,
    password?: string
  ): Promise<TextResult> {
    const patterns = Array.isArray(pattern) ? pattern : [pattern];
    const data = await this.getText(password);
    const matches = patterns.map((regex) => Match(new RegExp(regex), data));
    return [...new Set(matches)].flat();
  }
}
