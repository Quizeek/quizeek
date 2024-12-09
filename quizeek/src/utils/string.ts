export const toNormalizedString = (input: string) => {
  const normalized = input.trim().replace(/\s+/g, ' ');

  return normalized;
};
