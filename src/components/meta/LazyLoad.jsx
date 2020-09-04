import React, {Suspense} from "react";
import { CircularProgress } from '@material-ui/core';
import { Grid } from '@material-ui/core'

export default function LazyLoad(props) {
  return (
    <Suspense fallback={<Grid align='center'><CircularProgress/></Grid>}>
   {props.children}
    </Suspense>
  );
}
