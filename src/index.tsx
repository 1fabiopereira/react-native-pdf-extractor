import { NativeModules, Platform } from 'react-native';
export * from './Patterns';

const PdfExtractor = Platform.select({
  android: NativeModules.PdfExtractor,
  ios: {},
});

const getUri = async (): Promise<string | undefined> => {
  return PdfExtractor.getUri();
}

const getTextWithPattern = async (
  pattern: string | String[],
  password?: string
): Promise<string[]> => {
  const patterns = Array.isArray(pattern) ? pattern : [pattern];
  const data = await PdfExtractor.getTextWithPattern(patterns, password);
  return Object.freeze(data?.split('\n') || []);
}

const getText = async (password?: string): Promise<string[]> => {
  const data = await PdfExtractor.getText(password);
  return data?.split('\n') || []
}

const isEncrypted = async (): Promise<boolean> => {
  return PdfExtractor.isEncrypted();
}

const getNumberOfPages = async (password?: string): Promise<number> => {
  return PdfExtractor.getNumberOfPages(password);
}

const canIExtract = async (): Promise<boolean> => {
  return PdfExtractor.canIExtract();
}

export default ({
  canIExtract,
  getNumberOfPages,
  getText,
  getTextWithPattern,
  getUri,
  isEncrypted,
})
