import React from "react";
import Grid from "@material-ui/core/Grid";
import { useTrackedState } from "reactive-react-redux";
import ProjectCard from "../home/ProjectCard";
import { MATCH } from "../backend/EsQueries";
import { esAxios } from "../backend/AxiosRequest";

export default function UserLikedProjects(props) {
  const [projList, setProjList] = React.useState();
  React.useEffect(() => {
    queryDatabase(props.userId);
  }, [props.userId]);
  const queryDatabase = (searchValue) => {
    let query = MATCH(searchValue, "upvotes", 10);
    esAxios
      .get(`/q/`, query)
      .then((response) => {
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
       {projList&&projList.length
        ?
           <h3>Liked Projects</h3> 
          : <h3>No liked projects</h3>}</Grid>
      {projList
        ? projList.map((r, i) => (
         
            <Grid item key={i} xs={12} sm={6} md={4}>
              <ProjectCard r={r} />
            </Grid>
          ))
        : null}
    </React.Fragment>
  );
}
