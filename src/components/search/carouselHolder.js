import React, { useRef, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import ProjectCard from './projectCard'
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import { updateSlideSearchResults } from '../redux/actions'
import SearchCorousel from './searchCoroulsel';
import Row from 'react-bootstrap/Row';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Divider from '@material-ui/core/Divider';


function filterProjectList(projList){
    let categs = [];
    let cat_list = [];
    projList.forEach(element => {
        if (!categs.includes(element._source.category)){
        categs.push(element._source.category);
    }
    });
    categs.forEach(cat =>{
        cat_list.push(projList.filter(d => d._source.category === cat));
    })
    cat_list.sort(function(a,b){
        return b.length - a.length; //ASC, For Descending order use: b - a
      });
    return cat_list;
  }

export default function CarouselHolder(){ 
    const { searchProjectList } = useTrackedState()
    // useEffect(() => filterProjectList(props.projList), [searchProjectList]);

    if (!searchProjectList) {
        return (<div></div>);
      }else if(searchProjectList[0]){
    return (
        <React.Fragment>
       { filterProjectList(searchProjectList).map((r, i) =>(
           <React.Fragment key={i}>
                <Divider />
                <sup>Category</sup><h2>{r[0]._source.category.charAt(0).toUpperCase()+
            r[0]._source.category.slice(1)}</h2>
            <Divider light />
        <SearchCorousel categoryList={r}/>
        </React.Fragment>
       ))}
       </React.Fragment>
    );
}else{
    return (
      <Row className="border-top border-grey justify-content-center">
        <h3>Sorry! We couldn't find any projects matching your search <ErrorOutlineIcon fontSize="large"/> </h3>
      </Row>
    )
  }
  }