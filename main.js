'use strict';

// text to be searched
const text = "the cat sat on the dog"

// separators used
const sep = new Set(["," ," ", "." , ":", ";", "?", "!", "|", "&"])


// buildLiteralMap returns a map of literal from given text and separators
function buildLiteralMap(text, sep) {
  const literalMap = new Map();

  let literal = "";
  // traverse through the text. find literals and build map[literal] = count 
  for (const char of text) {
    if (sep.has(char)) {
      if (literalMap.has(literal)) {
        const count = literalMap.get(literal)
        literalMap.set(literal, count + 1) 
      } else {
        literalMap.set(literal, 1)
      }
      literal = "";
    } else {
        literal += char;
    }

    // special condition. end of the line might not end with separators.
    if (literalMap.has(literal)) {
      const count = literalMap.get(literal)
      literalMap.set(literal, count + 1) 
    } else {
      literalMap.set(literal, 1)
    }
  }

  return literalMap
}

// searchLiterals searches for input literals in a given text and prints output in console.log()
function searchLiterals(literalInputPipes, text, sep) {
  const literalMap = buildLiteralMap(text, sep)
  const literalInputArray = literalInputPipes.split('|')

  let outputTotal = {
    "total": literalInputArray.length,
    "result": []
  }
  Object.freeze(outputTotal)

  for (const literal of literalInputArray) {
    if (literalMap.has(literal)) {
      const output = {
        "literal": literal,
        "count" : literalMap.get(literal)
      }
      Object.freeze(output)

      outputTotal["result"].push(output)
    }
  }
  console.log(outputTotal)
}

searchLiterals("cat", text, sep)
searchLiterals("the", text, sep)
searchLiterals("cat|dog", text, sep)
