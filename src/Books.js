import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import store from './store'

const destroyBook = async (book) => {
    await axios.delete(`/api/books/${book.id}`);
    store.dispatch({ type: 'DESTROY_BOOK', book });
};

const Books = (props) => {
    const { books } = props;

    return(
        <ul id='books'>
            { books.map( (book) => {
                return (
                    <li key={book.id}>
                        { book.title }
                        <button onClick={ ()=> destroyBook(book)}> Check Out Book </button>
                    </li>
                );
            })}
        </ul>
    )
}

export default connect((state) => state)(Books)