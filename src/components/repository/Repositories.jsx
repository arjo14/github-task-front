import React from 'react';
import PropTypes from 'prop-types';
import RepositoryRow from "./RepositoryRow";


const Repositories = (items, activePage, handlePageChange) => {
  const repos = items.items;
  if (!repos || repos.length === 0) {
    return (<div/>);
  }
  return (
    <div>
      {
        repos.map(item => (
          <RepositoryRow repo={item} key={item.id}/>
        ))
      }

    </div>
  );
};

Repositories.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Repositories;
