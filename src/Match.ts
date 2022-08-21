const reducer = (pattern: RegExp) => (matches: string[], line: string) => {
  const regexp = pattern.global ? pattern : new RegExp(pattern, 'g');
  const iterator = line.matchAll(regexp);
  let stop = false;

  do {
    const it = iterator.next();
    const value = it.value?.pop();
    if (it.done) stop = true;
    if (value) matches.push(value);
  } while (!stop);

  return matches;
};

export const Match = (
  pattern: RegExp,
  data?: string[]
): (string | undefined)[] => {
  if (!data) return [];
  return [...new Set(data.reduce(reducer(pattern), []))];
};