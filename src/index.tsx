import { NativeModules, Platform } from 'react-native';
import { Match } from './Match';
export * from './Patterns';

const PdfExtractor = Platform.select({
  android: NativeModules.PdfExtractor,
  ios: {},
});

const getUri = async (): Promise<string | undefined> => {
  return PdfExtractor.getUri();
};

const isEncrypted = async (): Promise<boolean> => {
  return PdfExtractor.isEncrypted();
};

const getNumberOfPages = async (password?: string): Promise<number> => {
  return PdfExtractor.getNumberOfPages(password);
};

const canIExtract = async (): Promise<boolean> => {
  return PdfExtractor.canIExtract();
};

const getText = async (password?: string): Promise<string[]> => {
  const data = await PdfExtractor.getText(password);
  return [...new Set(data?.split('\n') || [])] as string[];
};

const getTextWithPattern = async (
  pattern: string | string[],
  password?: string
): Promise<(string | null | undefined)[]> => {
  const patterns = Array.isArray(pattern) ? pattern : [pattern];
  const data = await getText(password);
  const matches = patterns.map((regex) => Match(new RegExp(regex), data));
  return [...new Set(matches)].flat();
};

export default {
  canIExtract,
  getNumberOfPages,
  getText,
  getTextWithPattern,
  getUri,
  isEncrypted,
};
