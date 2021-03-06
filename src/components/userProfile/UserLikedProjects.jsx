import React from "react";
import Grid from "@material-ui/core/Grid";
import ProjectCard from "../home/ProjectCard";
import SearchCard from '../search/SearchCard'
import { MATCH } from "../backend/EsQueries";
import { esAxios } from "../backend/AxiosRequest";

export default function UserLikedProjects(props) {
  const [projList, setProjList] = React.useState();
  React.useEffect(() => {
    queryDatabase(props.userId);
  }, [props.userId]);
  const queryDatabase = (searchValue) => {
    let query = MATCH(searchValue, props.fieldName, 10);
    esAxios
      .get(`/q/`, query)
      .then((response) => {
        console.log(response.data.hits)
        setProjList(response.data.hits.hits);
      })
      .catch((error) => {
        // catch errors.
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      
       <Grid item xs={12} sm={12} md={12}>
         <hr></hr>
       {projList&&projList.length
        ?
           <h3>{props.fieldName==='upvotes'?"Liked projects":"Bookmarks"}</h3> 
          : <h3>No {props.fieldName==='upvotes'?"Liked projects":"Bookmarks"}</h3>}</Grid>
      {projList
        ? projList.map((r, i) => (
         
            <Grid item key={i} xs={12} sm={12} md={12}>
              <SearchCard r={r} />
            </Grid>
          ))
        : null}
    </React.Fragment>
  );
}
