import React, { Component } from 'react';
import Media from 'react-bootstrap/Media';
import Container from 'react-bootstrap/Container';


class SearchResults extends Component {

    state = {
        results: ['a', 'b', 'c']
    }
    
  render() {
    return (
        <Container fluid="md">
            {/* map query results */}
            {this.props.searchRes.map(r => 
                <Media key={r["_id"]}>
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
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                        ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                        tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
                        fringilla. Donec lacinia congue felis in faucibus.
                    </p>

                    <p>
                        Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu
                        leo. Cum sociis natoque penatibus et magnis dis parturient montes,
                        nascetur ridiculus mus.
                    </p>
                    </Media.Body>
                </Media>
            )}
        </Container>

    );
  }
}

export default SearchResults;
