import React, { Component } from "react";
import CardList from './CardList';
import SearchBox from './SearchBox.js';
import './App.css';
import Scroll from './Scroll.js';


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }


    /* The `onSearchChange` function is an event handler that is called when the search input field
    changes. It takes an `event` parameter, which represents the event that triggered the function
    (in this case, the change event on the search input field). */
    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    /**
     * The componentDidMount function fetches data from an API and sets the state of the component with
     * the received data.
     */
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }));
    }


    /**
     * The render function filters a list of robots based on a search field and renders a card list
     * component with the filtered robots.
     * @returns The render() method is returning a JSX element. It is a div element with a class name
     * of "tc" (text center), containing an h1 element with the text "RoboFriends", a SearchBox
     * component with a prop of searchChange, and a CardList component with a prop of robots.
     */
    render() {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        });

        if (this.state.robots.length === 0) {
            return (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <h2 className="f2">Loading</h2>
                </div>
            )
        } else {
            return (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filteredRobots} />
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;