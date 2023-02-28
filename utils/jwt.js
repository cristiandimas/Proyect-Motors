const jwt = require('jsonwebtoken');

/**
 * Toma una identificación, crea una carga útil con esa identificación, firma la carga útil con una
 * semilla secreta y devuelve un token.
 * @returns Una promesa que se resuelve en una ficha.
 */
const generateJWT = id => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: process.env.JWT_EXPIRE_IN,
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(token);
      }
    );
  });
};

module.exports = generateJWT;
