import React, { Component } from 'react';
import Media from 'react-bootstrap/Media';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import ScrollUpButton from "react-scroll-up-button";
import Navbar from './navbarComponent'
import RecipeCard from './recipeCard'

class SearchResults extends Component {
    state = {
        results: ['a', 'b', 'c']
    }
    
  render() {
    
    return (
        <Container >   
            <Navbar />
            <Row className="justify-content-center">
                {/* map query results */}
                {this.props.searchRes.map(r => 
                    <RecipeCard key={r["_id"]} data={r["_source"]}/>
                )}
            </Row>
            <ScrollUpButton />
        </Container>

    );
  }
}

export default SearchResults;
