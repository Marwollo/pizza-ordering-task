import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PaginatedList } from "react-paginated-list";
import axios from "axios";
import Slider from "react-input-slider";

class Homepage extends Component {
    constructor(props) {
        super(props);
        let preferredIngredients = localStorage.getItem("preferredIngredients");
        if (preferredIngredients !== undefined && preferredIngredients !== null) {
            preferredIngredients = JSON.parse(localStorage.getItem("preferredIngredients"));
            this.ingredients = preferredIngredients;
        }
        else this.ingredients = [
            "Bacon", "Salami", "Pepperoni", "Sausage", "Ham", "Turkey", "Mozzarella",
            "Camembert", "Blue Cheese", "Chedar", "Tuna", "Salmon", "Squid",
            "Lobster", "Shrimps", "Onions", "Olives", "Mushrooms"
        ];
        this.availableIngredients = [
            "Bacon", "Salami", "Pepperoni", "Sausage", "Ham", "Turkey", "Mozzarella",
            "Camembert", "Blue Cheese", "Chedar", "Tuna", "Salmon", "Squid",
            "Lobster", "Shrimps", "Onions", "Olives", "Mushrooms"
        ];
        this.state = {
            pizzas: [],
            priceSlider: 50,
            currency: "USD",
            selectPreferredIngredient: "Open ingredients menu",
            preferredIngredients: this.ingredients,
            searchQuery: "",
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.currencyData = [];
        this.currencyData["USD"] = {
            sign: "$",
            factor: 1.00
        }
        this.currencyData["EUR"] = {
            sign: "€",
            factor: 0.86
        }
        this.currencyData["GBP"] = {
            sign: "£",
            factor: 0.76
        }
        this.originalPizzaArray = [];
    }

    fetchPizzas() {
        axios.get("http://178.149.82.69/action/id").then(response => {
            console.log(response.data);
            this.originalPizzaArray = response.data;
            this.setState({ pizzas: response.data }, () => {
                this.updateList();
            });
        });
    }

    componentDidMount() {
        this.fetchPizzas();
    }

    updateList() {
        let searchQueryRegex = new RegExp(".*" + this.state.searchQuery + ".*");
        let tmpNewArray = this.originalPizzaArray.filter((elem) => {
            let testResult = ((this.state.searchQuery === "" || searchQueryRegex.test(elem.name)) &&
                elem.ingredients.every(val => this.state.preferredIngredients.includes(val)) &&
                (elem.sizes.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))[0].price * this.currencyData[this.state.currency].factor) <= this.state.priceSlider)
            console.log(testResult);
            return testResult;
        }
        );
        console.log(tmpNewArray);
        this.setState({ pizzas: tmpNewArray });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => {
            if (name === "searchQuery")
                this.updateList();
            if (name === "currency")
                this.props.setGlobalState({ currency: value });
        });
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <div className="container push-spaces">
                        <h1 className="display-4">Welcome to Pizzify</h1>
                        <p className="display-4">Straight from furnaces to your heart</p>
                    </div>
                </div>
                <div className="container">

                    <div className="row">
                        <div className="col-md-12 justify-content-center">
                            <h2 className="md-12 ml-4 mb-4"><i className="fas fa-utensils mr-3"></i>Our menu</h2>
                            <form className="my-4 ml-4">
                                <div className="form-row">
                                    <div className="col-1">
                                        <label htmlFor="currency">Currency:</label>
                                        <select id="currency" value={this.state.currency} name="currency" onChange={this.handleInputChange} className="custom-select mr-3">
                                            <option defaultValue value="USD">USD</option>
                                            <option defaultValue value="EUR">EUR</option>
                                            <option defaultValue value="GBP">GBP</option>
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <label htmlFor="search">Search a delicious pizza:</label>
                                        <input value={this.state.searchQuery} name="searchQuery" onChange={this.handleInputChange} id="search" type="text" className="form-control" placeholder="Enter the name of the pizza..." />
                                    </div>
                                    <div className="col-3">
                                        <label htmlFor="ingrdp">Add preferred ingredients:</label>
                                        <div className="input-group-prepend">
                                            <select id="ingrdp" value={this.state.selectPreferredIngredient} name="selectPreferredIngredient" onChange={this.handleInputChange} className="custom-select mr-3">
                                                <option defaultValue>Open ingredients menu</option>
                                                {
                                                    this.availableIngredients.map((ingredient, id) =>
                                                        <option key={id} value={ingredient}>{ingredient}</option>)
                                                }
                                            </select>
                                            <button onClick={() => {
                                                if (this.state.selectPreferredIngredient === "Open ingredients menu" || this.state.preferredIngredients.includes(this.state.selectPreferredIngredient))
                                                    return;

                                                this.setState({ preferredIngredients: [...this.state.preferredIngredients, this.state.selectPreferredIngredient] }, () => {
                                                    localStorage.setItem("preferredIngredients", JSON.stringify(this.state.preferredIngredients));
                                                    this.updateList();
                                                });
                                            }} type="button" className="btn btn-danger"><i className="fas fa-plus"></i></button>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <label className="ml-3" htmlFor="sliderPrice" type="text">{"Price not higher than: "}<b>{this.state.priceSlider + this.currencyData[this.state.currency].sign}</b></label>
                                        <br />
                                        <label className="mx-3"><b>0{this.currencyData[this.state.currency].sign}</b></label>
                                        <Slider
                                            id="sliderPrice"
                                            axis="x"
                                            style={{ marginTop: "12px" }}
                                            styles={{
                                                track: {
                                                    backgroundColor: 'gray'
                                                },
                                                active: {
                                                    backgroundColor: 'orange'
                                                },
                                                thumb: {
                                                    width: 25,
                                                    height: 25,
                                                    opacity: 0.8
                                                }
                                            }}
                                            xstep={2.5}
                                            xmin={0}
                                            xmax={100}
                                            x={this.state.priceSlider}
                                            onChange={({ x }) => { this.setState({ priceSlider: parseFloat(x.toFixed(2)) }, () => { this.updateList(); }) }} />
                                        <label className="mx-3"><b>100{this.currencyData[this.state.currency].sign}</b></label>
                                    </div>
                                </div>
                            </form>
                            <div className="my-4 mx-3">
                                <p className="mb-2 ml-2">Preferred / allowed ingredients (click to remove):</p>
                                <div className="row ml-2">{
                                    this.state.preferredIngredients.map((ingr, id) => {
                                        return <div><a href="javascript:void(0)" onClick={() => {
                                            let tmpArray = this.state.preferredIngredients;
                                            for (let i = 0; i < tmpArray.length; i++) {
                                                if (tmpArray[i] === ingr)
                                                    tmpArray.splice(i, 1);
                                            }
                                            localStorage.setItem("preferredIngredients", JSON.stringify(tmpArray));
                                            this.setState({ preferredIngredients: tmpArray }, () => {
                                                this.updateList();
                                            });
                                        }} style={{ fontSize: "1em" }} key={id} className="badge badge-dark mr-2">{ingr}</a><div style={{ height: "8px" }}></div></div>
                                    })
                                }</div>
                            </div>
                            <PaginatedList
                                list={this.state.pizzas}
                                itemsPerPage={6}
                                renderList={(list) => (
                                    <div className="d-flex row justify-content-center">
                                        { list.map((item, id) => {
                                            if (!item.availability) return <></>;
                                            return (

                                                <div key={id}>
                                                    <div className="card mr-3 mt-6" style={{
                                                        width: "21.7rem",
                                                        borderRadius: "15px",
                                                        boxShadow: "#44444444 3px 3px 10px 3px",
                                                    }}>
                                                        <div className="card-img-top" style={{ height: "200px" }}>
                                                            <img style={{ objectFit: "cover", height: "100%", width: "100%", borderRadius: "15px" }} src={"http://178.149.82.69/storage/" + ((item.picture === "default.jpg") ? "uploads/" : "") + item.picture} alt="Card image cap" />
                                                        </div>

                                                        <div className="card-body">
                                                            <h5 className="card-title">{item.name}</h5>
                                                            <p className="card-text">{item.description}</p>

                                                        </div>
                                                        <div className="mx-3">
                                                            {
                                                                item.ingredients.map((ingr, innerId) => {
                                                                    return <span key={innerId} className="badge badge-danger mr-1">{ingr}</span>
                                                                })
                                                            }
                                                        </div>
                                                        <div className="mx-3 mt-3 mb-4">
                                                            {
                                                                item.sizes.map((bundle, innerId) => {
                                                                    if ((bundle.price * this.currencyData[this.state.currency].factor) > this.state.priceSlider) return <></>
                                                                    return <div key={innerId}>
                                                                        <span className="badge badge-light">{bundle.name}</span>
                                                                        <span className="badge badge-warning">{bundle.value}cm</span><br />
                                                                        <span className="badge badge-success">{(bundle.price * this.currencyData[this.state.currency].factor).toFixed(2)}{this.currencyData[this.state.currency].sign}</span>{" "}
                                                                        <a href="javascript:void(0)" onClick={() => {
                                                                            let currentCart = this.props.getGlobalState("cartItems");
                                                                            for (let i = 0; i < currentCart.length; i++) {
                                                                                if (currentCart[i].pizzaID === item.id && currentCart[i].bundleName === bundle.name) {
                                                                                    currentCart[i].quantity += 1;
                                                                                    this.props.setGlobalState({ cartItems: currentCart, cartButtonClasses: "animate__animated animate__tada" });
                                                                                    return;
                                                                                }
                                                                            }
                                                                            let itemObject = {
                                                                                pizzaID: item.id,
                                                                                pizzaName: item.name,
                                                                                bundleName: bundle.name,
                                                                                bundlePrice: bundle.price,
                                                                                quantity: 1,
                                                                            };
                                                                            currentCart.push(itemObject);
                                                                            this.props.setGlobalState({ cartItems: currentCart, cartButtonClasses: "animate__animated animate__tada" });
                                                                        }} className="badge badge-dark"><i className="fas fa-shopping-cart mr-2"></i>Add to cart</a>
                                                                        <br />
                                                                    </div>
                                                                })
                                                            }
                                                        </div>

                                                    </div><div style={{ height: "20px" }}></div></div>
                                            );
                                        })}

                                    </div>
                                )}

                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default Homepage;