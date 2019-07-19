import React  from 'react';
import Inventory from './Inventory';

class App extends React.Component {

    state = {
        fishes: {},
        order: {}
    };

    addFish = fish => {
        // Take a copy of the existing state (no need for deep clone)
        const fishes = { ...this.state.fishes };
        // Adjust and replace.
        fishes[`fish${Date.now()}`] = fish;
        this.setState({ fishes });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                {/*<div className="menu">*/}
                {/*    <Header tagline="Fresh-ish Seafood" />*/}
                {/*</div>*/}
                {/*<Order />*/}
                <Inventory addFish={this.addFish}/>
            </div>
        );
    }
}

export default App;
