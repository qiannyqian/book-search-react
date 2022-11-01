import { useState, useEffect } from 'react';
import axios from 'axios';

import SearchBar from './SearchBar';
import Book from './Book';
import Pagination from './Pagination';

function BookSearchlist() {
  const API_URL = `https://gutendex.com/books`;

  const [addedBooks, setAddedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [nextLink, setNextLink] = useState(null);
  const [prevLink, setPrevLink] = useState(null);

  useEffect(() => {
    if (books.length === 0) {
      async function getBooks() {
        const res = await axios.get(API_URL);
        const searchedBooks = res.data;

        setNextLink(searchedBooks.next);
        setPrevLink(searchedBooks.previous);
        setBooks([...searchedBooks.results]);
        setLoading(false);
      }
      getBooks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books.length]);

  const sortBooks = async (sorting) => {
    setLoading(true);
    const res = await axios.get(`${API_URL}?sort=${sorting}`);
    const searchedBooks = res.data;

    setNextLink(searchedBooks.next);
    setPrevLink(searchedBooks.previous);
    setBooks([...searchedBooks.results]);
    setLoading(false);
  };

  const searchBooks = async (searchTerm) => {
    const searchString = searchTerm.split(' ').join('%20');

    setLoading(true);
    const res = await axios.get(`${API_URL}?search=${searchString}`);
    const searchedBooks = res.data;

    setNextLink(searchedBooks.next);
    setPrevLink(searchedBooks.previous);
    setBooks([...searchedBooks.results]);
    setLoading(false);
  };

  const onClickPage = async (link) => {
    setLoading(true);

    const res = await axios.get(link);
    const searchedBooks = res.data;

    setNextLink(searchedBooks.next);
    setPrevLink(searchedBooks.previous);
    setBooks([...searchedBooks.results]);
    setLoading(false);
  };

  const handleAddBook = (book) => {
    setAddedBooks([...addedBooks, book]); // Next steps: add additional checking to prevent duplicate items
    alert(`${book.title} added to shortlist`); // Used in lieu of modal popup
  };

  return (
    <div className="App-body">
      <div className="book-shortlist">
        <h2>Shortlist</h2>
        <div>
          {addedBooks.length === 0 ? (
            <p>Currently empty.</p>
          ) : (
            <>
              {addedBooks.map((item) => (
                <Book
                  key={item.id}
                  index={item.id}
                  book={item}
                  shortlist={true}
                />
              ))}
            </>
          )}
        </div>
      </div>

      <div className="book-searchlist">
        <div className="sorting">
          <h4>Sort By:</h4>
          <button onClick={() => sortBooks('ascending')}>Ascending</button>
          <button onClick={() => sortBooks('descending')}>Descending</button>
          <button onClick={() => sortBooks('popular')}>Popular</button>
        </div>

        <SearchBar searchBooks={searchBooks} />

        <Pagination
          prevLink={prevLink}
          nextLink={nextLink}
          onClickPage={onClickPage}
        />

        {loading ? (
          <p>Please wait...</p>
        ) : (
          <>
            {books.map((item) => (
              <Book
                key={item.id}
                index={item.id}
                book={item}
                handleAddBook={handleAddBook}
                shortlist={false}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default BookSearchlist;
