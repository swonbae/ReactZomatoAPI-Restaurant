// import React from "react";
import React, { Component } from "react";

class Pagination extends Component {
  state = {
    postsPerPage: this.props.postsPerPage,
    totalPosts: this.props.totalPosts
  };

  render() {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(this.totalPosts / this.postsPerPage); i++) {
      console.log(i);
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} classNumber="page-item">
              <a href="!#" className="page-link">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

// const Pagination = ({ postsPerPage, totalPosts }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//     console.log(i);
//     pageNumbers.push(i);
//   }

//   return (
//     <nav>
//       <ul className="pagination">
//         {pageNumbers.map(number => (
//           <li key={number} classNumber="page-item">
//             <a href="!#" className="page-link">
//               {number}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

export default Pagination;
