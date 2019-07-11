// const filePath = require('../files')

import { readFileSync } from 'fs';
import { write, save } from './fileSystem';
// import * as PATH from 'path'

// const { promisify } = require('util')
// const _ = require('lodash')


/**
 * for stripSymbols()
 * @param {Object} data a json object
 * */const stripSymbols = (data) => {
    let dataStr = JSON.stringify(data);

  const replaceList = [
    ['/{"/g', '{ "'],
    ['/{"/g', '{ " '],
    ['/},{/g', ' },\n{'],
    ['/":/g', '": '],
    ['/,"/g', ',\n "'],
  ];

  replaceList.forEach((replacer) => {
    dataStr = dataStr.replace(replacer[0], replacer[1]);
  });

  return dataStr;
  
  
};

/**
 * readData()
 * @param {string} absolutePath
 * */

 const readData = (absolutePath) => {
  console.log(absolutePath);

  const data = readFileSync(absolutePath);
  console.log(data);

  const fileData = JSON.parse(data);
  return fileData;
};

// execute function
// splitObject()

/**
 * fixFileName()
 * @param {string} fileName
 */
const fixFileName = (fileName) => {
  fileName = fileName.replace(/ /g, '_'); // Replace space with underscore
  fileName = fileName.toLowerCase(); // Maintain Uniformity
  return fileName;
};

/**
 * getFileName()
 * @param {string} file
 * @param {Object} fileData
 * @param {var} flag
 * @param {var} index
 */
const getFileName = (file, fileData, flag, index) => {
  let fileName;
  if (flag === 1) {
    // for example: 23-someJsonFile.json
    fileName = `${index}-${file}`;
  } else {
    // for example: someValueOfName.json
    fileName = `${fileData.name}.json`;
  }

  fileName = fixFileName(fileName);
  return fileName;
};


/**
 * For updateContent()
 * @param {var} content
 * @param {var} keys
 */
const updateContent = (content, keys) => {
  content.forEach((contentElem) => {
    contentElem.forEach((obj) => {
      keys.forEach((key) => {
        delete obj[key];
      });
    });
  });
  return content;
};


export {
  write,
  updateContent,
  makeReadable,
  readData,
  save,
  getFileName
};
