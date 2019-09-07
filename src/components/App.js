import React, { Component } from "react";
import Nav from "./Nav";
import RestaurantList from "./RestaurantList";
import RestaurantDetail from "./RestaurantDetail";
import Pagination from "./Pagination";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      restaurants: [],
      currentPage: 1,
      totalItemsFetched: 0,
      totalResultsFound: 0,
      currentRestaurant: null,
      error: false,
      errorText: ""
    };

    this.apiKey = process.env.REACT_APP_ZOMATO_ACCESS_TOKEN;

    this.title = "Toronto Cafe List - TOP20";
    this.itemsPerPage = 5; // items per page in the list
  }

  /*
   *   API Call to get restaurants (Cafe list in Toronto)
   */
  fetchRestaurants = () => {
    const offset = 0;

    const Url =
      "https://developers.zomato.com/api/v2.1/search?entity_id=89&entity_type=city&start=" +
      offset +
      "&establishment_type=1&sort=rating&order=desc";
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

  /*
   *    fetched data into state variables
   */
  getList() {
    this.setState({ isLoaded: false });

    this.fetchRestaurants()
      .then(data => {
        this.setState(() => ({
          isLoaded: true,
          totalItemsFetched: data.results_shown,
          totalResultsFound: data.results_found,
          restaurants: data.restaurants.map(info => {
            return {
              res_id: info.restaurant.id,
              url: info.restaurant.url,
              name: info.restaurant.name,
              address: info.restaurant.location.address,
              locality: info.restaurant.location.locality,
              phone_numbers: info.restaurant.phone_numbers,
              thumb: info.restaurant.thumb,
              featured_image: info.restaurant.featured_image,
              photos: info.restaurant.photos,
              cuisines: info.restaurant.cuisines,
              currency: info.restaurant.currency,
              average_cost_for_two: info.restaurant.average_cost_for_two,
              timings: info.restaurant.timings,
              user_rating: info.restaurant.user_rating.aggregate_rating,
              votes: info.restaurant.user_rating.votes,
              reviews: info.restaurant.all_reviews.reviews
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

  componentDidMount() {
    this.getList();
  }

  /*
   *   Pagination
   */
  nextPage = pageNumber => {
    this.setState({
      currentPage: pageNumber
    });
  };

  /*
   *   Restaurant Details
   */
  viewRestaurant = id => {
    const newCurrentRestaurant = this.state.restaurants.find(
      r => r.res_id == id
    );
    this.setState({ currentRestaurant: newCurrentRestaurant });
  };

  closeRestaurant = () => {
    this.setState({ currentRestaurant: null });
  };

  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="container">
          <div className="col s6 offset-s3">
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
          </div>
        </div>
      );
    } else {
      const numberPages = Math.floor(
        this.state.totalItemsFetched / this.itemsPerPage
      );

      const offset = (this.state.currentPage - 1) * this.itemsPerPage;

      return (
        <div className="App">
          <Nav title={this.title} />
          {this.state.currentRestaurant == null ? (
            <RestaurantList
              restaurants={this.state.restaurants.slice(
                offset,
                offset + this.itemsPerPage
              )}
              viewRestaurant={this.viewRestaurant}
            />
          ) : (
            <RestaurantDetail
              restaurant={this.state.currentRestaurant}
              closeRestaurant={this.closeRestaurant}
            />
          )}

          {this.state.totalItemsFetched > this.itemsPerPage &&
          this.state.currentRestaurant == null ? (
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
