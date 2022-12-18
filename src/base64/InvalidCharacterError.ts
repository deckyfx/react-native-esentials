// https://github.com/davidchambers/Base64.js/blob/master/base64.js

export default class InvalidCharacterError extends Error {
  constructor(message: string | undefined) {
    super(message); // (1)
    this.name = 'InvalidCharacterError'; // (2)
  }
}
