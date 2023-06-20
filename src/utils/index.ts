export const Reducer = (pattern: RegExp) => (line: string) => {
  const regexp = pattern.global ? pattern : new RegExp(pattern, 'g');
  return line.match(regexp);
};

export const Match = (pattern: RegExp, data?: string[]): string[] => {
  if (!data) return [];
  const matches = data.map(Reducer(pattern)).flat();
  return [...new Set(matches)].filter((value) => value) as string[];
};

