import React, { Component } from "react";
// import React, { useState, useEffect } from "react";
import Pagination from "./components/Pagination";

// import Pagination from "react-js-pagination";
// import styles from './App.module.css';
// import Pagination from "react-bootstrap/Pagination";
// require("bootstrap/less/bootstrap.less");
// import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      currentPage: 0,
      itemsPerPage: 0,
      totalResultsFound: 0,
      restaurants: [],
      error: false,
      errorText: ""
    };

    this.title = "< Toronto Cafe List - TOP100 >";

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  /*
   *   API Call to get restaurants
   */
  getRestaurants = () => {
    const Url =
      "https://developers.zomato.com/api/v2.1/search?entity_id=89&entity_type=city&start=" +
      this.currentPage * this.itemsPerPage +
      "&establishment_type=1&sort=rating&order=desc";
    const headers = new Headers({
      "Content-Type": "application/json",
      "user-key": "1f2b705473efe0b8712be42b7e5f2cfd" // process.env.REACT_APP_ZOMATO_ACCESS_TOKEN
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

  componentDidMount() {
    // fetch("")
    //   .then(res => res.json())
    //   .then(json => {
    //     this.setState({
    //       isLoaded: true,
    //       items: json
    //     });
    //   });
    this.setState({ isLoaded: false });

    this.getRestaurants()
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

  handlePageChange(page) {
    this.setState({
      currentPage: page
    });
  }

  render() {
    var { isLoaded, restaurants } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      // let items = [];
      // for (let number = 0; number < 5; number++) {
      //   items.push(
      //     <Pagination.Item key={number} active={number === this.currentPage}>
      //       {number}
      //     </Pagination.Item>
      //   );
      // }

      return (
        <div className="App">
          <h4>{this.title}</h4>
          <ul>
            {restaurants.map(r => (
              <li key={r.id}>
                Name: {r.name} | Address: {r.address} | user_rating:{" "}
                {r.user_rating}
              </li>
            ))}
          </ul>

          <Pagination
            postsPerPage={this.itemsPerPage}
            totalPosts={Math.min(this.totalResultsFound, 100)}
            onChangePage={this.handlePageChange}
          />
        </div>

        // <div>
        //   <Pagination>{items}</Pagination>
        //   <br />

        //   <Pagination size="lg">{items}</Pagination>
        //   <br />

        //   <Pagination size="sm">{items}</Pagination>
        // </div>

        // <div className={styles.pagination}>
        //   <span>&laquo;</span>
        //   <span className={styles.active}>1</span>
        //   <span>2</span>
        //   <span>3</span>
        //   <span>4</span>
        // </div>

        // <div>
        //   <Pagination
        //     activePage={this.state.currentPage}
        //     itemsCountPerPage={this.itemsPerPage}
        //     totalItemsCount={Math.min(this.totalResultsFound, 100)}
        //     pageRangeDisplayed={5}
        //     onChange={this.handlePageChange}
        //   />
        // </div>
      );
    }
  }
}

export default App;
