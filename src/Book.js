import React from 'react';

function Book(props) {
  const { book, handleAddBook, shortlist } = props;
  const { title, id, authors = [{}], download_count } = book;
  const authorsNames = authors.map(({ name }) => name);

  return (
    <div className="box">
      <h5>{title}</h5>
      <p>Book ID: {id}</p>
      <p>Author: {authorsNames.map((item) => item)}</p>

      <p>Downloads: {download_count}</p>
      {shortlist ? null : (
        <button
          className="shortlist-button"
          onClick={() => handleAddBook(book)}
        >
          Add To Shortlist
        </button>
      )}
    </div>
  );
}

export default Book;
