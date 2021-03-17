"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearTheWords = void 0;
const indonesia_json_1 = require("./dictionary/indonesia.json");
const noReplaceFirstAndLastRegex = /(?<!^).(?!$)/g;
const replaceWord = (word, placeholder = '*') => {
    try {
        return word
            .replace(noReplaceFirstAndLastRegex, placeholder[0] || '*');
    }
    catch (error) {
        return word;
    }
};
const isProfane = (checkWord, dictionary = indonesia_json_1.words) => {
    return dictionary
        .filter((word) => {
        const wordExp = new RegExp(`\\b${word.replace(/(\W)/g, '\\$1')}\\b`, 'gi');
        return wordExp.test(checkWord);
    })
        .length > 0 || false;
};
const clearTheWords = (text, placeholder = '*', dictionary = indonesia_json_1.words) => {
    var _a;
    try {
        return (_a = text === null || text === void 0 ? void 0 : text.split(/\b/)) === null || _a === void 0 ? void 0 : _a.map((word) => {
            return isProfane(word, dictionary) ? replaceWord(word, placeholder) : word;
        }).join(/\b/.exec(text)[0]);
    }
    catch (error) {
        return text;
    }
};
exports.clearTheWords = clearTheWords;
exports.default = exports.clearTheWords;
