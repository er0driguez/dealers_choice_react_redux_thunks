import React from 'react';
import { connect } from 'react-redux';

const Authors = (props) => {
    const { authors } = props

    return (
        <ul>
            {
                authors.map( (author) => {
                    return (
                        <li key={author.id}> { author.name } </li>
                    );
                })
            }
        </ul>
    );
}

export default connect(state => state)(Authors);