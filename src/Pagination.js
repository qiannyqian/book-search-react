import React from 'react';

function Pagination(props) {
  const { prevLink, nextLink, onClickPage } = props;

  return (
    <div className="pagination-buttons">
      <button disabled={!prevLink} onClick={() => onClickPage(prevLink)}>
        Previous Page
      </button>
      <button disabled={!nextLink} onClick={() => onClickPage(nextLink)}>
        Next Page
      </button>
    </div>
  );
}

export default Pagination;
