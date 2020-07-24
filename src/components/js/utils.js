

export const makeSetStr= (searchHits, col) =>{

    let newSet = new Set([]);
    searchHits.forEach(element => {
        newSet.add(element._source[col])
    });
    return newSet;

}

export const makeCountDictArr = (searchHits, col) =>{

    let newDict = {};
    searchHits.forEach(element => {
        element._source[col].map((ele, i) => newDict[ele] = newDict[ele]? newDict[ele]+1: 1);
    });

    let newArr = []
    Object.keys(newDict).map((el) => newArr.push({key:newDict[el], label:el}))
    return newArr;
}

export const makeCountDictStr = (searchHits, col) =>{

    let newDict = {};
    searchHits.forEach(ele => {
        newDict[ele._source[col]] = newDict[ele._source[col]]? newDict[ele._source[col]]+1: 1;
    });

    let newArr = []
    Object.keys(newDict).map((el) => newArr.push({key:newDict[el], label:el}))
    return newArr;
}

export const sortStringObjArr= (objArray) =>{
    return  objArray.sort(function(a, b) {
        var textA = a.label.toUpperCase();
        var textB = b.label.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
}

export const getImgUrl = (r) =>{
    if(!r._source.image.includes('http')){
      return 'http://54.193.134.135' +r._source.image
    }
    return r._source.image
  }