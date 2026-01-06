export const isValidNanoId = (id: string, expectedLength = 12): boolean => {
  const nanoIdRegex = /^[A-Za-z0-9_-]+$/;
  return id.length === expectedLength && nanoIdRegex.test(id);
};
