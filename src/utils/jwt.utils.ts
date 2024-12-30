import jwt from 'jsonwebtoken';

export const generateToken = (
  payload: Object,
  key: string,
  options: jwt.SignOptions = {},
) => {
  return jwt.sign(payload, key, {
    ...(Boolean(options) && options),
  });
};
