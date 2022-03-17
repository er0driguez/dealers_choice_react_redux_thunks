import { createStore, combineReducers, applyMiddleware } from 'redux'
const LOAD_BOOKS = 'LOAD_BOOKS'
const LOAD_AUTHORS = 'LOAD_AUTHORS'
const CREATE_BOOK = 'CREATE_BOOK'
const DESTROY_BOOK  = 'DESTROY_BOOK'
import axios from 'axios'
import thunk from 'redux-thunk'


const books = (state = [], action) => {
    if(action.type === LOAD_BOOKS){
        return action.books;
    }
    if(action.type === CREATE_BOOK){
        return [...state, action.book];
    }
    if(action.type === DESTROY_BOOK){
        return state.filter( (book) => book.id !== action.book.id)
    };
    return state;
}

const authors = (state = [], action) => {
    if(action.type === LOAD_AUTHORS){
        return action.authors;
    }
    return state;
}

const reducer = combineReducers({
    books,
    authors
});

const store = createStore(reducer, applyMiddleware(thunk)); 

const loadBooks = () => {
    return async(dispatch) => {
        const response = await axios.get('/api/books')
        const books = response.data;
        dispatch({ type: LOAD_BOOKS, books });
    }
};

const loadAuthors = () => {
    return async(dispatch) => {
        const response = await axios.get('/api/authors')
        const authors = response.data;
        dispatch({ type: LOAD_AUTHORS, authors });
    }
};

const createBook = () => {
    return async(dispatch) => {
        const response = await axios.post('/api/books');
        const newBook = response.data
        dispatch({ type: CREATE_BOOK, newBook });
    }
};

export { loadBooks, loadAuthors, createBook };
export default store;

