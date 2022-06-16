import { NativeModules, Platform } from 'react-native';
export * from './Patterns';

const PdfExtractor = Platform.select({
  android: NativeModules.PdfExtractor,
  ios: {},
});

export async function getTextWithPattern(
  pattern: string | String[],
  password?: string
): Promise<Readonly<String[]>> {
  const patterns = Array.isArray(pattern) ? pattern : [pattern];
  const data = await PdfExtractor.getTextWithPattern(patterns, password);
  return Object.freeze(data?.split('\n') || []);
}

export async function getText(password?: string): Promise<Readonly<String[]>> {
  const data = await PdfExtractor.getText(password);
  return Object.freeze(data?.split('\n') || []);
}

export async function hasPassword(): Promise<boolean> {
  return await PdfExtractor.hasPassword();
}

export async function getNumberOfPages(password?: string): Promise<number> {
  return await PdfExtractor.getNumberOfPages(password);
}
