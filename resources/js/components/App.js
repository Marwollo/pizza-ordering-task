import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/* Navigation component, always on the top of the page */
import Navigation from "./elements/Navigation";

/* Pages that are present in the app. */
import Homepage from "./pages/Homepage";

/* Router for managing in-app pages. */
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

/* Importing bootstrap for easier layout management and responsive design*/
import 'bootstrap/dist/css/bootstrap.css';

/* 
    The main class of the web application.
    This class is mainly controlling:
        - The current active page.
        - Fixed UI components to prevent their re-rendering for faster page loading.
*/
class App extends Component {
    constructor() {
        super();
        this.state = {
            /*
                Object of the user that's currently logged in.
                We're using it like a global state, with corresponding
                getters and setters for more organized state management.
                Changing the user state would mean re-rendering only
                user-related components, which is what we want if we're
                focusing on the app performance and loading speed.
            */
            loggedUser: undefined,

            /* 
                Cart items are also present in the global state for more organized
                management.
            */
            cartItems: JSON.parse(String(localStorage.getItem("cart"))) || [],

            /*
                Current page indicator for further optimization and 
                navigation subelement updating.
            */
            currentPage: undefined,

            currency: "USD",

            cartButtonClasses: ""
        }

        this.setGlobalState = this.setGlobalState.bind(this);
        this.getGlobalState = this.getGlobalState.bind(this);
    }
    /*
        For more complex projects we'd probably use Redux to maintain states, but this
        is a really nice solution for what we want to achieve, in order to prevent unnecessary
        re-renderings for UI and other components that are not being changed.
    */
    setGlobalState(globalState) {
        this.setState(globalState, () => {
            localStorage.setItem("cart", JSON.stringify(this.state.cartItems))
        });
    }

    getGlobalState(globalState) {
        return this.state[globalState];
    }

    componentDidMount() {
        window.addEventListener("focus", () => {
            this.setState({ cartItems: JSON.parse(String(localStorage.getItem("cart"))) || [] });
        });
    }

    render() {
        return (
            <Router>
                <div>
                    <Navigation
                        cartButtonClasses={this.state.cartButtonClasses}
                        cartItems={this.state.cartItems}
                        currency={this.state.currency}
                        setGlobalState={this.setGlobalState}
                        getGlobalState={this.getGlobalState} />
                    <Switch>
                        <Route exact path="/">
                            <Homepage
                                setGlobalState={this.setGlobalState}
                                getGlobalState={this.getGlobalState}
                            />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
