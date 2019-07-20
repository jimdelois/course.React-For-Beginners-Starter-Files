import React  from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';


class App extends React.Component {

    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
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

    addToOrder = key => {
        // Take a copy of state
        const order = { ...this.state.order };
        // Either add to order to update order count
        order[key] = order[key] + 1 || 1
        // Adust and replace
        this.setState( { order });
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
                />
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
            </div>
        );
    }
}

export default App;
