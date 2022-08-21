import { NativeModules, Platform } from 'react-native';
import { Match } from './match';
export * from './Patterns';

const PdfExtractor = Platform.select({
  android: NativeModules.PdfExtractor,
  ios: {},
});

const getUri = async (): Promise<string | undefined> => {
  return PdfExtractor.getUri();
};

const getTextWithPattern = async (
  pattern: RegExp | RegExp[],
  password?: string
): Promise<(string | null | undefined)[]> => {
  const patterns = Array.isArray(pattern) ? pattern : [pattern];
  const data = await PdfExtractor.getText(password);
  return patterns.map((regex) => Match(regex, data)).flat();
};

const getText = async (password?: string): Promise<string[]> => {
  const data = await PdfExtractor.getText(password);
  return data?.split('\n') || [];
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

export default {
  canIExtract,
  getNumberOfPages,
  getText,
  getTextWithPattern,
  getUri,
  isEncrypted,
};
