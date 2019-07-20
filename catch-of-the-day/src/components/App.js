import React  from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';


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
                            return <Fish key={key} details={this.state.fishes[key]}/>
                        })}
                    </ul>
                </div>
                {/*<Order />*/}
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
            </div>
        );
    }
}

export default App;
