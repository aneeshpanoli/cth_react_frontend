


export const  MATCH_PHRASE_PREFIX = (userInput, column) =>{
    return {
            'params': {
                'q':{
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