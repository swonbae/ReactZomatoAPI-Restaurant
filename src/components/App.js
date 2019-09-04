import React, { Component } from "react";
import Nav from "./Nav";
import RestaurantList from "./RestaurantList";
import Pagination from "./Pagination";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      restaurants: [],
      currentPage: 1,
      itemsPerPage: 0,
      totalResultsFound: 0,
      error: false,
      errorText: ""
    };

    this.title = "< Toronto Cafe List - TOP100 >";

    this.handlePageChange = this.handlePageChange.bind(this);

    // this.apiKey = process.env.REACT_APP_ZOMATO_ACCESS_TOKEN;
    this.apiKey = "1f2b705473efe0b8712be42b7e5f2cfd";
  }

  /*
   *   API Call to get restaurants (Cafe list of toronto)
   */
  fetchRestaurants = () => {
    // console.log(process.env.REACT_APP_ZOMATO_ACCESS_TOKEN);
    var offset = (this.state.currentPage - 1) * this.state.itemsPerPage;
    console.log(
      this.state.currentPage + " " + this.state.itemsPerPage + " " + offset
    );

    const Url =
      "https://developers.zomato.com/api/v2.1/search?entity_id=89&entity_type=city&start=" +
      offset +
      "&establishment_type=1&sort=rating&order=desc";
    const headers = new Headers({
      "Content-Type": "application/json",
      "user-key": this.apiKey
    });
    console.log(Url);
    return fetch(Url, { headers }).then(res => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          statusText: res.statusText
        });
      } else {
        return res.json();
      }
    });
  };

  /*
   *   API Call to get a restaurant Detail
   */
  fetchRestaurantDetail = id => {
    const Url =
      "https://developers.zomato.com/api/v2.1/restaurant?res_id=" + id;
    const headers = new Headers({
      "Content-Type": "application/json",
      "user-key": this.apiKey
    });
    return fetch(Url, { headers }).then(res => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          statusText: res.statusText
        });
      } else {
        return res.json();
      }
    });
  };

  getList() {
    this.setState({ isLoaded: false });

    this.fetchRestaurants()
      .then(data => {
        this.setState(() => ({
          isLoaded: true,
          itemsPerPage: data.results_shown,
          totalResultsFound: data.results_found,
          restaurants: data.restaurants.map(info => {
            return {
              res_id: info.restaurant.R.res_id,
              name: info.restaurant.name,
              address: info.restaurant.location.address,
              thumb: info.restaurant.thumb,
              user_rating: info.restaurant.user_rating.aggregate_rating
            };
          })
        }));
      })
      .catch(error => {
        this.setState({
          restaurants: error,
          error: true,
          errorText: "Unable to retrieve restaurants"
        });
        console.log(error);
      });
  }

  getDetail(id) {
    this.setState({ isLoaded: false });

    this.fetchRestaurantDetail(id)
      .then(data => {
        this.setState(() => ({
          isLoaded: true
        }));
      })
      .catch(error => {
        this.setState({
          restaurants: error,
          error: true,
          errorText: "Unable to retrieve restaurants"
        });
        console.log(error);
      });
  }

  componentDidMount() {
    this.getList();
  }

  handlePageChange = pageNumber => {
    this.setState({
      currentPage: pageNumber
    });
  };

  nextPage = pageNumber => {
    // BUG! NEED TO FIX
    this.setState({
      currentPage: pageNumber
    });

    this.getList();
  };

  render() {
    var { isLoaded, restaurants } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const numberPages = Math.floor(
        Math.min(this.state.totalResultsFound, 100) / this.state.itemsPerPage
      );

      return (
        <div className="App">
          <Nav />
          <RestaurantList restaurants={this.state.restaurants} />

          {this.state.totalResultsFound > this.state.itemsPerPage ? (
            <Pagination
              pages={numberPages}
              nextPage={this.nextPage}
              currentPage={this.state.currentPage}
            />
          ) : (
            ""
          )}
        </div>
      );
    }
  }
}

export default App;