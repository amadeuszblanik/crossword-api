export default (value: string): string => {
  return Buffer.from(value, 'base64').toString('binary');
};
