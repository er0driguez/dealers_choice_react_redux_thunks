import React from 'react';
import { connect } from 'react-redux';
import { createBook } from './store';

const CreateBook = ({ create }) => {
    return (
        <div>
            <button onClick={ create }> CHECK IN BOOK </button>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        create: () => {
            dispatch(createBook());
        }
    };
};

export default connect(null, mapDispatchToProps)(CreateBook)