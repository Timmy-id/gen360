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

export const verifyToken = (token: string, key: string) => {
  return jwt.verify(token, key);
};
