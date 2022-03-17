import React from 'react'
import { connect } from 'react-redux'

const Books = (props) => {
    const { books } = props;

    return(
        <ul id='books'>
            { books.map( (book) => {
                return (
                    <li key={book.id}>
                        { book.title }
                    </li>
                );
            })}
        </ul>
    )
}

export default connect((state) => state)(Books)