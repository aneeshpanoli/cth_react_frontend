import React, { useEffect } from "react";
import { useTrackedState } from "reactive-react-redux";
import Container from "@material-ui/core/Container";
import SearchCorousel from "./SearchCorousel";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function filterProjectList(projList) {
  let categs = [];
  let cat_list = [];
  projList.forEach((element) => {
    if (!categs.includes(element._source.category)) {
      // get all the unique categories
      categs.push(element._source.category);

      // filter the es search json and add to list
      cat_list.push(
        projList.filter((d) => d._source.category === element._source.category)
      );
    }
  });

  return cat_list.sort((a, b) => b.length - a.length).slice(0, 4);
}

export default function CarouselHolder() {
  const { searchProjectList } = useTrackedState();
  const [filteredProjList, setFilteredProjList] = React.useState(
    searchProjectList
  );
  const history = useHistory();
  const handleMore = () => {
    history.push("/search");
  };
  useEffect(() => {
    if (searchProjectList && searchProjectList[0]) {
      setFilteredProjList(filterProjectList(searchProjectList));
    }
  }, [searchProjectList]);


  return (
    <React.Fragment>
      {filteredProjList && filteredProjList[0] ? (
        <Box>
          <Container>
            <h3 style={{ fontWeight: 700 }}>FEATURED PROJECTS</h3>
          </Container>
          {filteredProjList.map((r, i) => (
              <Box key={i}> 
                <Container maxwidth="lg">
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
                </Container>
              </Box>
          ))}
          <Button
          endIcon={<ArrowDownwardIcon />}
            size="small"
            variant="contained"
            color="secondary"
            style={{
              margin: "0.5rem",
              left: "50%",
              transform: `translateX(-50%)`,
              textTransform: "none",
            }}
            onClick={handleMore}
          >
            Load more
          </Button>
        </Box>
      ) : (null
      )}
    </React.Fragment>
  );
}

