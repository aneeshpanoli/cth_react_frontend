import React, { useRef, useEffect } from "react";
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { updateSlideSearchResults } from "../redux/actions";
import SearchCorousel from "./SearchCorousel";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Divider from "@material-ui/core/Divider";

function filterProjectList(projList) {
  let categs = [];
  let cat_list = [];
  let other = [];
  let filtered;
  projList.forEach((element) => {
    if (!categs.includes(element._source.category)) {
      // get all the unique categories
      categs.push(element._source.category);

      // filter the es search json and add to list
      filtered = projList.filter((d) => d._source.category === element._source.category);
      // console.log(filtered);
      if(filtered.length > 2)
      cat_list.push(filtered);
      }else{
      other.push(...filtered);
       }
  });
  cat_list.push(other);
  categs.push('Miscellaneous');
  // sort the list
  cat_list.sort(function (a, b) {
    return b.length - a.length; //ASC, For Descending order use: b - a
  });
  return cat_list;
}

export default function CarouselHolder() {
  const { searchProjectList } = useTrackedState();
  // useEffect(() => filterProjectList(props.projList), [searchProjectList]);

  if (!searchProjectList) {
    return <div></div>;
  } else if (searchProjectList[0]) {
    return (
      <React.Fragment>
        {filterProjectList(searchProjectList).map((r, i) => (
          <React.Fragment key={i}>
            <Divider />
            <sup>Category</sup>
            <h2>
              {r[0]? r[0]._source.category.charAt(0).toUpperCase() +
                r[0]._source.category.slice(1): null}
            </h2>
            <Divider light />
            <SearchCorousel categoryList={r} />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h3>
          Sorry! We couldn't find any projects matching your search{" "}
          <ErrorOutlineIcon fontSize="large" />{" "}
        </h3>
        </React.Fragment>
    );
  }
}
