

export const makeSet = (searchHits) =>{

    let newSet = new Set([]);
    searchHits.forEach(element => {
        element._source.builtWith.forEach(newSet.add, newSet);
    });
    return newSet;

}

export const makeCountDict = (searchHits) =>{

    let newDict = {};
    searchHits.forEach(element => {
        element._source.builtWith.map((ele, i) => newDict[ele] = newDict[ele]? newDict[ele]+1: 1);
    });

    let newArr = []
    Object.keys(newDict).map((el) => newArr.push({key:newDict[el], label:el}))
    return newArr;
}