import React, { useRef, useEffect } from "react";
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { updateProgress } from "../redux/actions";
import SearchCorousel from "./SearchCorousel";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";


function filterProjectList(projList) {
  let categs = [];
  let cat_list = [];
  projList.forEach((element) => {
    if (!categs.includes(element._source.category)) {
      // get all the unique categories
      categs.push(element._source.category);

      // filter the es search json and add to list
      cat_list.push( projList.filter((d) => 
      d._source.category === element._source.category
      ))

    }
  });

  return cat_list.sort((a, b) => b.length - a.length).slice(0, 4)
}

export default function CarouselHolder() {
  const { searchProjectList } = useTrackedState();
  const history = useHistory();
  const handleMore =() =>{
    history.push('/solve');
  }
  // useEffect(() => filterProjectList(props.projList), [searchProjectList]);

  if (!searchProjectList) {
    return <div></div>;
  } else if (searchProjectList[0]) {
    return (
      <React.Fragment>
        <h3>FEATURED PROJECTS</h3>
        {filterProjectList(searchProjectList).map((r, i) => (
          <React.Fragment key={i}>
            <Divider />
            <sup>Category</sup>
            <h4>
              {r[0]
                ? r[0]._source.category.charAt(0).toUpperCase() +
                  r[0]._source.category.slice(1)
                : null}
            </h4>
            <Divider light />
            <SearchCorousel categoryList={r} />
          </React.Fragment>
        ))}
        <Button
        size='small'
          variant="contained"
          color="secondary"
          style={{ margin: "0.5rem", left: "50%", transform: `translateX(-50%)`, textTransform:'none'}}
          onClick={handleMore}
        >
          Load all ...
        </Button>
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
