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


class Beers extends React.Component{

  state = {
    beers: []
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'api/all_beers?page=1&per_page=10',
      responseType: 'json',
    })
      .then( res => {
        this.setState({
          beers: res.data
        })
      })
  }

  loadFunc = () => {
    axios({
      method: 'get',
      url: 'api/all_beers',
      responseType: 'json'
    })
      .then( res => {
        debugger
        this.setState({
          breweries: res.data
        })
      })
  }

  beerCard = () => {
    const { beers } = this.state
    if (beers.entries[0] === undefined)
      return (<div></div>)
    return beers.entries.map( beer => {
      return(
      <Card key={beer.id}>
        <Card.Content>
          <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
          <Card.Header>{beer.name}</Card.Header>
          <Card.Meta>{beer.abv}</Card.Meta>
          <Card.Description>
            {beer.description}
          </Card.Description>
        </Card.Content>
      </Card>
      )
    })
  }

  render() {
    return (
      <Container>
        <Header as="h1" textAlign="center">Beers</Header>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadFunc()}
          hasMore={true || false}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          <Card.Group>
            {this.beerCard()}
          </Card.Group>
        </InfiniteScroll>
      </Container>
    )
  }
}

export default Beers