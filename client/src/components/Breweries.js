import React from 'react';
import axios from 'axios';
import { 
  Card,
  Header,
  Container,
  Image,
  Button,
 } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';

class Breweries extends React.Component{

  state = {
    breweries: []
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'api/all_breweries?page=20&per_page=5',
      responseType: 'json'
    })
      .then( res => {
        debugger
        this.setState({
          breweries: res.data
        })
      })
  }

  loadFunc = () => {
    axios({
      method: 'get',
      url: 'api/all_breweries?page=20&per_page=5',
      responseType: 'json'
    })
      .then( res => {
        debugger
        this.setState({
          breweries: res.data
        })
      })
  }

  breweryCard = () => {
    const { breweries } = this.state
    if (breweries.entries[0] === undefined)
      return (<div></div>)
    return breweries.entries.map( breweries => {
      return(
      <Card key={breweries.id}>
        <Card.Content>
          <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
          <Card.Header>{breweries.name}</Card.Header>
          <Card.Meta>{breweries.abv}</Card.Meta>
          <Card.Description>
            {breweries.description}
          </Card.Description>
        </Card.Content>
      </Card>
      )
    })
  }

  render() {
    return (
      <Container>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadFunc()}
          hasMore={true || false}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          <Card.Group>
            {this.breweryCard()}
          </Card.Group>
        </InfiniteScroll>
      </Container>
    )
  }
}

export default Breweries;