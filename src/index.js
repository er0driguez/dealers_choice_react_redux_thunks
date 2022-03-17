import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import axios from 'axios';
import store, { loadBooks, loadAuthors, createBook } from './store'
//{ loadBooks, loadAuthors } 
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import NavBar from './Nav';
import Books from './Books';
import Authors from './Authors';


const App = connect(
    /*(state) => {
        return state;
    },*/
    null,
    (dispatch) => {
        return {
            loadData: async() => {
                dispatch(loadBooks());
                dispatch(loadAuthors());
            }
        };
    }
)( class App extends React.Component {
        
        componentDidMount() {
            this.props.loadData();
        }

        render() {
            return(
                <div id="body">
                    <h1>Sci-Fi Library</h1>
                    <NavBar />

                    <p> Available Books </p>
                    <Books />

                    <p> Author Directory </p>
                    <Authors />
                </div>
            )
        }
    }
)



ReactDOM.render(<Provider store={store}> <App /> </Provider>, document.querySelector('#root'));