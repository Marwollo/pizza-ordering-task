import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navigation extends Component {

    constructor(props) {
        super(props);
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
        this.totalCartNumber = 0;
        this.totalCartPrice = 0.00;
        this.state = {
            cartSwitcher: false,
            paymentFinishSwitcher: false,
        }
    }

    render() {
        this.totalCartNumber = 0;
        this.totalCartPrice = 0.00;
        for (let i = 0; i < this.props.cartItems.length; i++) {
            this.totalCartNumber += this.props.cartItems[i].quantity;
            this.totalCartPrice += this.props.cartItems[i].bundlePrice * parseFloat(this.props.cartItems[i].quantity);
        }
        return (
            <div className="position-top">
                <nav className="navbar navbar-expand-lg navbar-dark" style={{ position: "sticky", top: 0, backgroundColor: "#00000052" }}>
                    <a className="ml-4 navbar-brand" href="#" style={{ fontFamily: "Pacifico", fontSize: "2em", lineHeight: "2em", marginTop: "-8px", marginRight: "40px" }}>Pizzify</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="hvr-grow navbar-nav">
                            <Link id="homeButton" onMouseOver={() => {
                                var homeButton = document.getElementById("homeButton");
                                homeButton.classList.add("animate__animated", "animate__rubberBand");
                                homeButton.addEventListener("animationend", () => {
                                    homeButton.classList.remove("animate__animated", "animate__rubberBand")
                                });
                            }} style={{
                                backgroundColor: "white",
                                color: "black",
                                padding: "10px 25px",
                                borderRadius: "22px",
                                fontWeight: "600",
                                boxShadow: "#44444463 0px 5px 8px 1px"
                            }} className=" nav-item nav-link active hvr-grow mr-3" to="/"><i className="fas fa-home mr-2 hr-grow"></i>Home</Link>
                            <a href="javascript:void(0)" onClick={() => {
                                alert("This feature is on the to-do list. I focused more on the CMS + the front end to make something unique, and such that you can see my development style in all possible ways.");
                            }} id="ordersButton" onMouseOver={() => {
                                var homeButton = document.getElementById("ordersButton");
                                homeButton.classList.add("animate__animated", "animate__rubberBand");
                                homeButton.addEventListener("animationend", () => {
                                    homeButton.classList.remove("animate__animated", "animate__rubberBand")
                                });
                            }} style={{
                                backgroundColor: "white",
                                color: "black",
                                padding: "10px 25px",
                                borderRadius: "22px",
                                fontWeight: "600",
                                boxShadow: "#44444463 0px 5px 8px 1px"
                            }} className="nav-item nav-link hvr-grow mr-3"><i className="fas fa-tasks mr-2"></i>My orders</a>
                            <a href="javascript:void(0)" onClick={() => {
                                alert("This feature is on the to-do list. I focused more on the CMS + the front end to make something unique, and such that you can see my development style in all possible ways.");
                            }} id="contactButton" onMouseOver={() => {
                                var homeButton = document.getElementById("contactButton");
                                homeButton.classList.add("animate__animated", "animate__rubberBand");
                                homeButton.addEventListener("animationend", () => {
                                    homeButton.classList.remove("animate__animated", "animate__rubberBand")
                                });
                            }} style={{
                                backgroundColor: "white",
                                color: "black",
                                padding: "10px 25px",
                                borderRadius: "22px",
                                fontWeight: "600",
                                boxShadow: "#44444463 0px 5px 8px 1px"
                            }} className="nav-item nav-link hvr-grow mr-3"><i className="fas fa-address-book mr-2"></i>Contact us</a>
                            <a href="javascript:void(0)" onClick={() => { this.setState({ cartSwitcher: !this.state.cartSwitcher }) }} id="shoppingCart" onMouseOver={() => {
                                var homeButton = document.getElementById("shoppingCart");
                                homeButton.classList.add("animate__animated", "animate__rubberBand");
                                homeButton.addEventListener("animationend", () => {
                                    homeButton.classList.remove("animate__animated", "animate__rubberBand");
                                    homeButton.classList.remove("animate__animated", "animate__tada");
                                    this.props.setGlobalState({ cartButtonClasses: "something" });
                                });
                            }} style={{
                                backgroundColor: "white",
                                color: "black",
                                padding: "10px 25px",
                                borderRadius: "22px",
                                fontWeight: "600",
                                boxShadow: "#44444463 0px 5px 8px 1px"
                            }} className={"nav-item nav-link mr-3 " + this.props.cartButtonClasses}><i className="fas fa-shopping-cart mr-2"></i>My cart ({(this.totalCartPrice * this.currencyData[this.props.currency].factor).toFixed(2)}{this.currencyData[this.props.currency].sign} - {this.totalCartNumber} items)</a>
                        </div>
                    </div>
                    {(this.state.cartSwitcher) ? <div>
                        <div className="card" style={{
                            height: "500px",
                            position: "absolute",
                            top: "16px",
                            right: "16px",
                            width: "21.7rem",
                            borderRadius: "15px",


                            boxShadow: "#44444444 3px 3px 10px 3px",
                        }}>

                            <div className="card-body overflow-auto">
                                <h3 className="card-title"><b>Your cart</b></h3>
                                <h4>({(this.totalCartPrice * this.currencyData[this.props.currency].factor).toFixed(2)}{this.currencyData[this.props.currency].sign} - {this.totalCartNumber} items)</h4>
                                {(this.totalCartNumber === 0) ? null : <button onClick={() => { this.setState({ paymentFinishSwitcher: true }) }} className="btn btn-success mt-1 align-self-center"><i className="fas fa-check mr-3"></i>Proceed to order</button>}
                                <button onClick={() => { this.setState({ cartSwitcher: !this.state.cartSwitcher }) }} className="btn btn-danger mt-1 mb-3 align-self-center"><i className="fas fa-check mr-3"></i>Close the window</button>
                                {
                                    this.props.cartItems.map((item, id) => {
                                        return (
                                            <div className="m-2">
                                                <span>{item.pizzaName}</span><br />
                                                <span className="badge badge-light">{item.bundleName}</span><br />
                                                <span className="badge badge-success">{(item.bundlePrice * this.currencyData[this.props.currency].factor).toFixed(2)}{this.currencyData[this.props.currency].sign}</span>{" "}

                                                <div className="row mt-2 ml-1">
                                                    <button onClick={() => {
                                                        let currentCart = this.props.getGlobalState("cartItems");
                                                        for (let i = 0; i < currentCart.length; i++) {
                                                            if (currentCart[i].pizzaID === item.pizzaID && currentCart[i].bundleName === item.bundleName) {
                                                                currentCart[i].quantity -= 1;
                                                                if (currentCart[i].quantity == 0)
                                                                    currentCart.splice(i, 1);
                                                                this.props.setGlobalState({ cartItems: currentCart });
                                                                return;
                                                            }
                                                        }
                                                    }} type="button" className="btn btn-danger"><i className="fas fa-minus"></i></button>
                                                    <span style={{ fontSize: "1.6em" }} className="mx-4">{item.quantity}</span>
                                                    <button onClick={() => {
                                                        let currentCart = this.props.getGlobalState("cartItems");
                                                        for (let i = 0; i < currentCart.length; i++) {
                                                            if (currentCart[i].pizzaID === item.pizzaID && currentCart[i].bundleName === item.bundleName) {
                                                                currentCart[i].quantity += 1;
                                                                if (currentCart[i].quantity == 0)
                                                                    currentCart.splice(i, 1);
                                                                this.props.setGlobalState({ cartItems: currentCart });
                                                                return;
                                                            }
                                                        }
                                                    }} type="button" className="btn btn-danger"><i className="fas fa-plus"></i></button>
                                                </div>

                                            </div>
                                        );
                                    })
                                }
                            </div>

                        </div>
                    </div> : null}
                    {(this.state.paymentFinishSwitcher) ? <div>
                        <div className="card" style={{
                            height: "500px",
                            position: "absolute",
                            top: "16px",
                            right: "16px",
                            width: "21.7rem",
                            borderRadius: "15px",


                            boxShadow: "#44444444 3px 3px 10px 3px",
                        }}>

                            <div className="card-body overflow-auto">
                                <h3 className="card-title"><b>Order details</b></h3>
                                <h4>({(this.totalCartPrice * this.currencyData[this.props.currency].factor).toFixed(2)}{this.currencyData[this.props.currency].sign} - {this.totalCartNumber} items)</h4>
                                <button onClick={() => { this.setState({ paymentFinishSwitcher: !this.state.paymentFinishSwitcher }) }} className="btn btn-danger mt-1 align-self-center mb-4"><i className="fas fa-check mr-3"></i>Close the window</button>

                                <form>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputName">Full name</label>
                                            <input required type="text" className="form-control" id="inputName" placeholder="Enter your name here..." />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputMail">E-mail</label>
                                            <input required type="mail" className="form-control" id="inputMail" placeholder="Enter your e-mail here..." />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputAddress">Address</label>
                                        <input required type="text" className="form-control" id="inputAddress" placeholder="1234 Main St..." />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputPhone">Phone number</label>
                                        <input required type="number" className="form-control" id="inputPhone" placeholder="Enter your phone number here..." />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputCountry">Country</label>
                                            <input required type="text" className="form-control" id="inputCountry" placeholder="Enter your country here..." />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputCity">City</label>
                                            <input required type="text" className="form-control" id="inputCity" placeholder="Enter your city here..." />
                                        </div>
                                    </div>
                                    <button type="submit" onClick={() => {
                                        this.setState({ paymentFinishSwitcher: false, cartSwitcher: false });
                                        alert("From this part, a payment procedure will happen, and then the form data will be delivered to the API, to the orders database (to-do), as said in the readme.md file.");
                                    }} className="btn btn-success mt-1 mb-3 align-self-center"><i className="fas fa-check mr-3"></i>Place order</button>
                                </form>

                            </div>

                        </div>
                    </div> : null}
                </nav>


            </div>
        );
    }

}

export default Navigation;