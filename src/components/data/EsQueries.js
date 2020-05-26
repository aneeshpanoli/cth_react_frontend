


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