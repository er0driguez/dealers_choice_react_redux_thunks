import React from 'react'
import { connect } from 'react-redux'

const NavBar = (props)  => {
    const { books, authors } = props;

    return (
        <div id='nav'>
            <a className='bookLink' href='/api/books'> Books ({ books.length }) </a>
            <a className='authorsLink' href='/'> Authors ({ authors.length }) </a>
        </div>
    )
}

export default connect(state => state)(NavBar);