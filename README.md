# Mini Regular Expression Engine

## How to run

- run it on https://repl.it
- run it on nodejs. tested with:
    - Ubuntu 18.04
    - node.js v8.11.4

## Design Assumption & Limitations

Since I have 60 - 90 minutes to design and implement, I will limit the scope of a mini regular expression engine as described below:

- only use javascript/node built-in except javascript regex engine & expression
- Non-distributed algorithm
- Literals can occur 0 to many times on the given text
- Literals can be separated by multiple separators. For this implemenation I will assume, literals are separated by ["," , "." , ":", ";" "?" "!" "|", "&"]
- Given that you are seeing the text for the first time, the best time complexity is O(textLength). (you have to traverse through the text once to know whether literal is included or not included)
- Since the engine needs to provide multi literal search, we can optimize time complexity by building a Map of literals. This way, we only incur full text traversal once, no matter how many literals we need to search.
- Since we are building a Map of literals anyways, we will store number of occurences. Therefore, the result can provide more information without incurring more time complexity cost. 
- literal map : key = literal, value = {}

### Example

text : "the cat sat on the dog" 

- search for "cat"
```json
{
    "total" : 1,
    "result":
    [
        {
            "literal": "cat",
            "count": 1,
        }
    ]
}

```
- search for "the"
```json
// search for "the"
{
    "total" : 1,
    "result":
    [
        {
            "literal": "the",
            "count" : 2,
        }
    ]
}
```

- search for "cat|dog"
```json
{
    "total" : 2,
    "result":
    [
        {
            "literal": "cat",
            "num": 1,
        },
        {
            "literal": "dog",
            "num": 1,
        }
    ]
}
```

## Future Directions

- if the text size is large enough to pay distribution and merge price, make the engine to distribute the workload to build index Map. 

  
