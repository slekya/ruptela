'use strict';

let buffer, offset;
let Uint64BE = require("int64-buffer").Uint64BE;
let Int64BE = require("int64-buffer").Int64BE;
/**
 * This class iterates through buffer
 */
class Iterator {

    /**
     * Set buffer
     *
     * @param {Buffer} buf
     */
    constructor(buf) {
        //check if buffer is truly a buffer
        if (!Buffer.isBuffer(buf)) {
            throw new Error("Input must be an instance of Buffer");
        }
        //set buffer
        buffer = buf;
        offset = 0;
    }

    /**
     * Get buffer
     */
    get buffer() {
        return buffer;
    }

    /**
     * Get offset
     */
    get offset() {
        return offset;
    }

    /**
     * Get end of buffer
     */
    get end() {
        return buffer.length;
    }

    /**
     * Reads byteLength number of bytes from buffer at the specified offset
     * and interprets the result as an (unsigned) integer
     *
     * @param {int} byteLength
     * @param {boolean} unsigned
     * @returns {int}
     */
    readNext(byteLength, unsigned = true) {
        const tmpOffset = offset;
        offset += byteLength;
        //check if an unsigned integer should be returned
        if (unsigned === true) {
            if (byteLength > 6) {
                return new Uint64BE(buffer.slice(tmpOffset, offset));
            }
            else {
                return buffer.readUIntBE(tmpOffset, byteLength);
            }
        }
        else {
            if (byteLength > 6) {
                return new Int64BE(buffer.slice(tmpOffset, offset));
            }
            else {
                return buffer.readIntBE(tmpOffset, byteLength);
            }
        }
    }

    readBlock(byteLength) {
        const tmpOffset = offset;
        offset += byteLength;
        return Buffer.from(buffer.slice(tmpOffset, offset));
    }

    readStringNext(byteLength) {
        const tmpOffset = offset;
        offset += byteLength;
        return buffer.toString('hex', tmpOffset, byteLength);
    }
}

/**
 * Expose class
 */
module.exports = Iterator;