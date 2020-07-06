

export const makeSet = (searchHits) =>{

    let newSet = new Set([]);
    searchHits.forEach(element => {
        element._source.builtWith.forEach(newSet.add, newSet);
    });
    return newSet;

}