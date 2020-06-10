


export const  MATCH_PHRASE_PREFIX = (userInput, column) =>{
    return {
            'params': {
                'q':{
                    "size": 50,
                    'query':{
                        'match_phrase_prefix':{
                            [column]: userInput
                        }
                    }
                }
            }
        }
    }


    export const  MORE_LIKE_THIS = (userInput, columns) =>{
        return {
                'params': {
                    'q':{
                        "size": 50,
                        'query':{
                            "more_like_this" : {
                                "fields" : columns, //array
                                "like" : userInput,
                                "min_term_freq" : 1,
                                "max_query_terms" : 25
                            }
                        }
                    }
                }
            }
        }

    
        export const MATCH_ID = (id) =>{
            return {
                'params': {
                    'q':{
                        "query" : {
                            "match":{
                               "_id": id
                            }
                          
                    }
                }
            }
    
        }
    }

    export const FETCH_RANDOM_ON_SESSION = (session_id) =>{
        return {
            'params': {
                'q':{  
                    "size": 50,
                        "query": {
                           "function_score": {
                              "functions": [
                                 {
                                    "random_score": {
                                       "seed": session_id
                                    }
                                 }
                              ]
                           }
                        }
                     }  
                }
            }
        }

    
