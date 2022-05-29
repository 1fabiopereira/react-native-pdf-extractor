import { NativeModules, Platform } from 'react-native';

const PdfExtractor = Platform.select({
  android: NativeModules.PdfExtractor,
  ios: {}
})

export function getStringThatMatch(pattern: string | Array<string>): Promise<string> {
  const patterns = Array.isArray(pattern) ? pattern : [pattern]
  return PdfExtractor.getStringThatMatch(patterns);
}

export function getAll(): Promise<string> {
  return PdfExtractor.getAll();
}

export const Patterns = {
  Ticket: [
    '([0-9]{5}).([0-9]{5}) ([0-9]{5}).([0-9]{6}) ([0-9]{5}).([0-9]{6}) ([0-9]) ([0-9]{14})', // Bancário - Linha digitável
    '([0-9]{12}) ([0-9]{12}) ([0-9]{12}) ([0-9]{12})', // Arrecadação - Código de barras
    '([0-9]{11})-([0-9]) ([0-9]{11})-([0-9]) ([0-9]{11})-([0-9]) ([0-9]{11})-([0-9])' // Arrecadação - Linha digitável
  ],
}