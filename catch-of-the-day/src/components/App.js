import React  from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';


class App extends React.Component {

    static propTypes = {
        match: PropTypes.object // This comes from the Router, no specific need to "shape" it here.
    };

    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate() {
        localStorage.setItem(
            this.props.match.params.storeId,
            JSON.stringify(this.state.order)
        );
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = fish => {
        // Take a copy of the existing state (no need for deep clone)
        const fishes = { ...this.state.fishes };
        // Adjust and replace.
        fishes[`fish${Date.now()}`] = fish;
        this.setState({ fishes });
    };

    updateFish = (key, updatedFish) => {
        // Copy state
        const fishes = { ...this.state.fishes };
        // Update
        fishes[key] = updatedFish;
        // Set
        this.setState({ fishes });
    };

    deleteFish = (key) => {
        // Copy state
        const fishes = { ...this.state.fishes };
        // Update (Firebase wants this "null" as opposed to calling "delete fishes[key]"
        fishes[key] = null;
        // Set
        this.setState({ fishes });
    };

    addToOrder = key => {
        // Take a copy of state
        const order = { ...this.state.order };
        // Either add to order to update order count
        order[key] = order[key] + 1 || 1
        // Adust and replace
        this.setState( { order });
    };

    removeFromOrder = key => {
        // Copy
        const order = { ...this.state.order };
        // Update (not using Firebase, so can delete directly)
        delete order[key];
        // Set
        this.setState({ order });
    };

    loadSampleFishes = () => {
        this.setState( { fishes: sampleFishes });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh-ish Seafood" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map((key) => {
                            return <Fish
                                    key={key}
                                    // "key", above, actually isn't accessible to the component
                                    // So need to pass the same value in elsewhere if we need it.
                                    index={key}
                                    details={this.state.fishes[key]}
                                    addToOrder={this.addToOrder}
                            />
                        })}
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        );
    }
}

export default App;
