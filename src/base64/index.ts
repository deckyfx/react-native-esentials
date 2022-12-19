// https://github.com/davidchambers/Base64.js/blob/master/base64.js

import InvalidCharacterError from './InvalidCharacterError';

class Base64 {
  private static characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  static encode(input: string = ''): string {
    const str = String(input);
    let output = '';
    for (
      // initialize result and counter
      let block: number = 0, charCode: number = 0, idx: number = 0, map = Base64.characters;
      // if the next str index does not exist:
      //   change the mapping table to "="
      //   check if d has no fractional digits
      // tslint:disable-next-line:no-bitwise no-conditional-assignment
      str.charAt(idx | 0) || ((map = '='), idx % 1);
      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
      // tslint:disable-next-line:no-bitwise no-conditional-assignment
      output += map.charAt(63 & (block >> (8 - (idx % 1) * 8)))
    ) {
      charCode = str.charCodeAt((idx += 3 / 4));
      if (charCode > 0xff) {
        throw new InvalidCharacterError(
          "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.",
        );
      }
      // tslint:disable-next-line:no-bitwise no-conditional-assignment
      block = (block << 8) | charCode;
    }
    return output;
  }

  static btoa(input: string = ''): string {
    return Base64.encode(input);
  }

  static decode(input: string): string {
    const str = String(input).replace(/[=]+$/, ''); // #31: ExtendScript bad parse of /=
    let output = '';
    if (str.length % 4 === 1) {
      throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (
      // initialize result and counters
      let bc = 0, bs = 0, buffer, idx: number = 0;
      // get next character
      // tslint:disable-next-line:no-bitwise no-conditional-assignment
      (buffer = str.charAt(idx++)); // eslint-disable-line no-cond-assign
      // character found in table? initialize bit storage and add its ascii value;
      /* tslint:disable:no-bitwise no-conditional-assignment */
      ~buffer &&
      ((bs = bc % 4 ? bs * 64 + buffer : buffer),
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0 /* tslint:enable */
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = Base64.characters.indexOf(buffer);
    }
    return output;
  }

  static atob(input: string = ''): string {
    return Base64.decode(input);
  }

  static fromArrayBuffer(buffer: Uint8Array | ArrayBuffer | ArrayBufferLike): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return Base64.btoa(binary);
  }

  static toArrayBuffer(base64: string): ArrayBufferLike {
    const binaryString = Base64.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  static toImageData(buffer: Uint8Array | ArrayBuffer | ArrayBufferLike): string {
    return `data:image/png;base64,${Base64.fromArrayBuffer(buffer)}`;
  }
}

export default new Base64();
