function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export const MATCH_PHRASE_PREFIX = (userInput, column) => {
  return {
    params: {
      index: "projects",
      q: {
        size: 100,
        query: {
          match_phrase_prefix: {
            [column]: userInput,
          },
        },
      },
    },
  };
};

export const MATCH_PHRASE = (userInput, column) => {
  return {
    params: {
      index: "projects",
      q: {
        size: 100,
        query: {
          match_phrase: {
            [column]: userInput,
          },
        },
      },
    },
  };
};

export const MATCH = (userInput, column, numResults) => {
  return {
    params: {
      index: "projects",
      q: {
        size: numResults,
        query: {
          match: {
            [column]: userInput,
          },
        },
      },
    },
  };
};

export const MATCH_RETURN_RANDOM = (userInput, column, numResults) => {
  return {
    params: {
      index: "projects",
      q: {
        size: numResults,
        query: {
          function_score: {
            query: {
              match: {
                [column]: userInput,
              },
            },
            random_score: { seed: getRandomInt(1000000000000, 200000000000) },
          },
        },
      },
    },
  };
};

export const MATCH_USER = (userInput, column) => {
  return {
    params: {
      index: "user",
      q: {
        size: 1,
        query: {
          match: {
            [column]: userInput,
          },
        },
      },
    },
  };
};

export const MORE_LIKE_THIS_old = (userInput, columns) => {
  return {
    params: {
      index: "projects",
      q: {
        size: 100,
        query: {
          more_like_this: {
            fields: columns, //array
            like: userInput,
            min_term_freq: 1,
            max_query_terms: 25,
          },
          filter: [
            { term: { status: "published" } },
            { range: { publish_date: { gte: "2015-01-01" } } },
          ],
        },
      },
    },
  };
};

export const MORE_LIKE_THIS = (esIndex, id, columns, resSize) => {
  return {
    params: {
      index: esIndex,
      q: {
        size: resSize,
        query: {
          bool: {
            must: [
              {
                more_like_this: {
                  fields: columns, //array
                  like: [
                    {
                      _id: id,
                    },
                  ],
                  min_term_freq: 1,
                  max_query_terms: 12,
                },
              },
            ],
            filter: {
              term: { approved: "yes" },
            },
          },
        },
      },
    },
  };
};

export const MATCH_ID_TITLE = (id, title, index) => {
  return {
    params: {
      index: index,
      q: {
        query: {
          bool: {
            must: [
              {
                match: {
                  _id: id,
                },
              },
              {
                match: {
                  title: title,
                },
              },
            ],
          },
        },
      },
    },
  };
};

export const MATCH_PROJ_ID = (id, index) => {
  return {
    params: {
      index: index,
      q: {
        size: 100,
        query: {
          match: {
            projectId: id,
          },
        },
      },
    },
  };
};

export const GET_LATEST = (index, numDocs) => {
  return {
    params: {
      index: index,
      q: {
        size: numDocs,
        sort: { createdAt: "desc" },
        query: {
          match_all: {},
        },
      },
    },
  };
};

export const MATCH_EMAIL = (email) => {
  return {
    params: {
      index: "user",
      q: {
        query: {
          match: {
            email: email,
          },
        },
      },
    },
  };
};

export const FETCH_RANDOM_ON_SESSION = () => {
  return {
    params: {
      index: "projects",
      q: {
        size: 50,
        query: {
          bool: {
            must: [
              {
                function_score: {
                  functions: [
                    {
                      random_score: {
                        seed: getRandomInt(1000000000000, 200000000000),
                      },
                    },
                  ],
                },
              },
            ],
            filter: {
              term: { approved: "yes" },
            },
          },
        },
      },
    },
  };
};

export const ADD_TO_ARRAY = (field, value) => {
  return {
    script: {
      source: "ctx._source." + field + ".add(params." + field + ")",
      lang: "painless",
      params: {
        [field]: value,
      },
    },
  };
};
