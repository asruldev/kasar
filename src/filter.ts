import {words} from './dictionary/indonesia.json';

const noReplaceFirstAndLastRegex = /(?<!^).(?!$)/g;

const replaceWord = (word: string, placeholder: string = '*'): string => {
  try {
    return word
    .replace(noReplaceFirstAndLastRegex, placeholder[0] || '*');
  } catch (error) {
    return word;
  }
}

const isProfane = (checkWord: string, dictionary: Array<string> = words): boolean => {
  return dictionary
    .filter((word) => {
      const wordExp = new RegExp(`\\b${word.replace(/(\W)/g, '\\$1')}\\b`, 'gi');
      return wordExp.test(checkWord);
    })
    .length > 0 || false;
}

export const clearTheWords = (text: string, placeholder: string = '*', dictionary: Array<string> = words) => {
  try {
    return text?.split(/\b/)?.map((word: string) => {
      return isProfane(word, dictionary) ? replaceWord(word, placeholder) : word;
    }).join(/\b/.exec(text)[0]);
  } catch (error) {
    return text;
  }
}

export default clearTheWords;