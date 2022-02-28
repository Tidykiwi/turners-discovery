const removePunctuation = require('../Punctuation');

describe('punctuation tests', function() {

    it('hello world', function() {
        //Input
        const input = "hello world";
        // Expected
        const expected = "hello world";
        // Actual output
        const actual = removePunctuation(input);
        // Assert
        expect(actual).toBe(expected);
    });

    it('hello%world', function() {
        const input = "hello%world";
        const expected = "hello world";
        const actual = removePunctuation(input);
        expect(actual).toBe(expected);
    });

    it('!hello world', function() {
        const input = "!hello world";
        const expected = " hello world";
        const actual = removePunctuation(input);
        expect(actual).toBe(expected);
    });

    it(';hellow?world!', function() {
        const input = ";hello?world!";
        const expected = " hello world ";
        const actual = removePunctuation(input);
        expect(actual).toBe(expected);
    });

    it('hello;world', function() {
        const input = "hello;world";
        const expected = "hello world";
        const actual = removePunctuation(input);
        expect(actual).toBe(expected);
    });

    it('hello world?', function() {
        const input = "hello world?";
        const expected = "hello world ";
        const actual = removePunctuation(input);
        expect(actual).toBe(expected);
    });
});