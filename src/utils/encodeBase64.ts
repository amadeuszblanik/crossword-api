export default (value: string): string => {
  return Buffer.from(value, 'binary').toString('base64');
};
