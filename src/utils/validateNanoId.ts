export const isValidNanoId = (id: string, expectedLength = 21): boolean => {
  const nanoIdRegex = /^[A-Za-z0-9_-]+$/;
  return id.length === expectedLength && nanoIdRegex.test(id);
};
