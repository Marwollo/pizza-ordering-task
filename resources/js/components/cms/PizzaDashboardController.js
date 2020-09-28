import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PaginatedList } from "react-paginated-list";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';


class PizzaDashboardController extends Component {
    constructor(props) {
        super(props);
        this.ingredients = [
            "Bacon", "Salami", "Pepperoni", "Sausage", "Ham", "Turkey", "Mozzarella",
            "Camembert", "Blue Cheese", "Chedar", "Tuna", "Salmon", "Squid",
            "Lobster", "Shrimps", "Onions", "Olives", "Mushrooms"
        ]
        this.state = {
            pizzas: [],

            addName: "",
            addDesc: "",
            addDropdownIngredients: "Open ingredients menu",
            addIngredients: ["Pepperoni", "Olives", "Mozzarella"],
            addImage: "",
            addSizesName: "",
            addSizesSize: "",
            addSizesPrice: "",
            addSizes: [
                {
                    name: "Mini bundle",
                    size: 18,
                    price: 5.99
                },
                {
                    name: "Mini bundle + Cola 0.25L",
                    size: 18,
                    price: 6.99
                },
                {
                    name: "Medium-sized + Cola 0.5L",
                    size: 18,
                    price: 9.99
                },
                {
                    name: "Big pizza bundle",
                    size: 32,
                    price: 12.99
                },
            ],
            addAvail: true
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onCreateFormSubmit = this.onCreateFormSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchPizzas();
    }

    compare(a, b) {
        if (a.price < b.price)
            return -1;
        if (a.price > b.price)
            return 1;
        return 0;
    }

    onCreateFormSubmit(event) {
        event.preventDefault();
        let formdata = new FormData();
        this.state.addIngredients.sort(this.compare);
        formdata.append("picture", this.state.addImage);
        formdata.append("name", this.state.addName);
        formdata.append("description", this.state.addDesc);
        formdata.append("sizes", JSON.stringify(this.state.addSizes));
        formdata.append("ingredients", JSON.stringify(this.state.addIngredients));
        formdata.append("availability", this.state.addAvail);
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };
        axios.post("http://178.149.82.69/action/create", formdata, config).then(response => {
            if (response.status === 200) {
                this.fetchPizzas();
            }
        });
    }

    deletePizza(id) {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        axios.post("http://178.149.82.69/action/delete", JSON.stringify({ id: id }), config).then(response => {
            if (response.status === 200) {
                this.fetchPizzas();
            }
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    fetchPizzas() {
        axios.get("http://178.149.82.69/action/id").then(response => {
            this.setState({ pizzas: response.data.reverse() });
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-8">
                    <div className="card text-center">
                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#">Database</a>
                                </li>

                            </ul>
                        </div>
                        <div className="card-body" style={{ overflow: "scroll" }}>
                            {(this.state.pizzas.length === 0) ? null : <PaginatedList
                                list={this.state.pizzas}
                                itemsPerPage={7}
                                renderList={(list) => (
                                    <table className="table table-striped">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Orders</th>
                                                <th>Available</th>
                                                <th>Ingredients</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                list.map((item, id) => {
                                                    return (
                                                        <tr key={id}>
                                                            <td>{item.id}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.popularity}</td>
                                                            <td>{(item.availability) ? <i className="fas fa-check-circle"></i> : <i className="fas fa-times-circle"></i>}</td>
                                                            <td>
                                                                {
                                                                    item.ingredients.map((ingr, id) => {
                                                                        return <div key={id}>
                                                                            <span className="badge badge-info">{ingr}</span>{" "}
                                                                        </div>
                                                                    })
                                                                }
                                                            </td>
                                                            <td>

                                                                <button onClick={() => this.deletePizza(item.id)} type="button" className="btn btn-danger"><i className="fas fa-trash-alt"></i></button></td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody></table>
                                )}
                            />}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#">Add new</a>
                                </li>

                            </ul>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onCreateFormSubmit}>

                                <div className="custom-file">
                                    <input required name="addImage" onChange={(event) => {
                                        this.setState({
                                            addImage: event.target.files[0]
                                        })
                                    }} accept="image/x-png,image/jpeg" type="file" className="custom-file-input" id="customFile" />
                                    <label className="custom-file-label" htmlFor="customFile">{this.state.addImage === "" ? "Upload an image..." : "Image attached"}</label>
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="pizzaName"><b>Name of the pizza:</b></label>
                                    <input required name="addName" value={this.state.addName} onChange={this.handleInputChange} type="text" className="form-control" id="pizzaName" placeholder="Enter a name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pizzaDescription"><b>Pizza's description:</b></label>
                                    <textarea required name="addDesc" value={this.state.addDesc} onChange={this.handleInputChange} aria-multiline type="text" className="form-control" id="pizzaName" placeholder="Enter a description" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ingredientsLabel"><b>Ingredients:</b></label>
                                    <div className="input-group-prepend mb-2">
                                        <select value={this.state.addDropdownIngredients} name="addDropdownIngredients" onChange={this.handleInputChange} className="custom-select mr-3">
                                            <option defaultValue>Open ingredients menu</option>
                                            {
                                                this.ingredients.map((ingredient, id) =>
                                                    <option key={id} value={ingredient}>{ingredient}</option>)
                                            }
                                        </select>
                                        <button onClick={() => {
                                            if (this.state.addDropdownIngredients === "Open ingredients menu" || this.state.addIngredients.includes(this.state.addDropdownIngredients))
                                                return;
                                            this.setState({ addIngredients: [...this.state.addIngredients, this.state.addDropdownIngredients] });
                                        }} type="button" className="btn btn-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                    {
                                        this.state.addIngredients.map((ingredient, id) => {
                                            return <div key={id}><span className="badge badge-info">{ingredient}</span>{" "}
                                                <a onClick={() => {
                                                    let tmpArray = this.state.addIngredients;
                                                    for (let i = 0; i < tmpArray.length; i++) {
                                                        if (tmpArray[i] === ingredient)
                                                            tmpArray.splice(i, 1);
                                                    }
                                                    this.setState({ addIngredients: tmpArray });
                                                }} className="badge badge-danger"><i className="fas fa-times"></i></a>{" "}</div>
                                        })
                                    }
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="ingredientsLabel"><b>Sizes / Bundles:</b></label>
                                    <div className="input-group-prepend mb-2">
                                        <input onChange={this.handleInputChange} value={this.state.addSizesName} name="addSizesName" type="text" className="form-control mr-2" id="inlineFormInputGroup" placeholder="Name"></input><br />
                                        <input onChange={this.handleInputChange} value={this.state.addSizesSize} name="addSizesSize" type="text" className="form-control mr-2" id="inlineFormInputGroup" placeholder="Size"></input><br />
                                        <input onChange={this.handleInputChange} value={this.state.addSizesPrice} name="addSizesPrice" type="text" className="form-control mr-3" id="inlineFormInputGroup" placeholder="Price"></input>
                                        <button onClick={() => {
                                            if (this.state.addSizesName.length > 0 && parseInt(this.state.addSizesSize) >= 0 && parseFloat(this.state.addSizesPrice) >= 0) {
                                                let tmpArray = this.state.addSizes;
                                                tmpArray.push({
                                                    name: this.state.addSizesName,
                                                    size: parseInt(this.state.addSizesSize),
                                                    price: parseFloat(this.state.addSizesPrice)
                                                });
                                                this.setState({
                                                    addSizes: tmpArray
                                                });
                                            }
                                        }} type="button" className="btn btn-info"><i className="fas fa-plus"></i></button>
                                    </div>
                                    <div>
                                        {
                                            this.state.addSizes.map((bundle, id) => {
                                                return <div key={id}>
                                                    <span className="badge badge-light">{bundle.name}</span>{" "}
                                                    <span className="badge badge-warning">{bundle.size}cm</span>{" "}
                                                    <span className="badge badge-success">{bundle.price}$</span>{" "}
                                                    <a onClick={() => {
                                                        let tmpArray = this.state.addSizes;
                                                        tmpArray.splice(id, 1);
                                                        this.setState({ addSizes: tmpArray });
                                                    }} className="badge badge-danger"><i className="fas fa-times"></i></a>
                                                    <br />
                                                </div>
                                            })
                                        }
                                    </div>

                                </div>
                                <div className="form-check">
                                    <input value={this.state.addAvail} onChange={this.handleInputChange} name="addAvail" className="form-check-input" type="checkbox" id="availableChck" />
                                    <label className="form-check-label" htmlFor="availableChck">
                                        Available upon creation
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-success mt-3 align-self-center"><i className="fas fa-check mr-3"></i>Finish and create</button>
                            </form>
                        </div>
                    </div>

                </div>

            </div>

        );
    }
}

export default PizzaDashboardController;

if (document.getElementById('pizza-dashboard-controller')) {
    ReactDOM.render(<PizzaDashboardController />, document.getElementById('pizza-dashboard-controller'));
}
