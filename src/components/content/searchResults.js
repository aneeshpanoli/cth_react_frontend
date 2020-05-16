import React, { Component } from 'react';
import Media from 'react-bootstrap/Media';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

class SearchResults extends Component {
    state = {
        results: ['a', 'b', 'c']
    }
    
  render() {
    
    return (
        <Container fluid>
            <Navbar className="border-bottom border-dark mb-3" bg="white" variant="light" sticky="top">
                <Navbar.Brand href="#home">
                    <img
                    alt=""
                    src="/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}
                    Homechef.ai
                </Navbar.Brand>
            </Navbar>
            {/* map query results */}
            {this.props.searchRes.map(r => 
                <Media className="ml-4 border-bottom border-grey" key={r["_id"]}>
                    <img
                    width={64}
                    height={64}
                    className="align-self-center mr-3"
                    src="holder.js/64x64"
                    alt="Generic placeholder"
                    />
                    <Media.Body>
                        <h5>{r["_source"]["title"]}</h5>
                    <p>
                        Ingredients: {r["_source"]["ingredients"].join(', ')}
                    </p>

                    <p>
                        Cook Time:  {r["_source"]["cook_time"]}
                    </p>
                    <div><p><Button variant="outline-primary">Recipe home <LaunchOutlinedIcon /></Button>{' '}
                    <Button variant="outline-success">Add to collection <PostAddOutlinedIcon />
                    </Button>{' '}
                    <Button variant="outline-danger"><FavoriteOutlinedIcon /> <Badge variant="light">9</Badge></Button>{' '}</p>
                    
                    </div>
                    </Media.Body>
                    
                    
                </Media>
            )}
        </Container>

    );
  }
}

export default SearchResults;
