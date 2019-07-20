import React  from 'react';
import PropTypes from 'prop-types';

class EditFirstForm extends React.Component {

    static propTypes = {
        fish: PropTypes.shape({ // This structure is also used in Fish.js . Could consider moving to separate file
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number,
        }),
        index: PropTypes.string,
        updateFish: PropTypes.func
    };

    handleChange = (e) => {
        // Take copy of the current fish, update it
        const updatedFish = {
            ...this.props.fish,
            [e.currentTarget.name]: e.currentTarget.value
        };
        // Send it back to the App state
        this.props.updateFish(this.props.index, updatedFish);
    };

    render() {
        return (
            <div className="fish-edit">
                <input name="name" type="text" onChange={this.handleChange} value={this.props.fish.name} />
                <input name="price" type="text" onChange={this.handleChange} value={this.props.fish.price} />
                <select name="status" onChange={this.handleChange} value={this.props.fish.status}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc} />
                <input name="image" onChange={this.handleChange} type="text" value={this.props.fish.image} />
                <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
            </div>
        );
    }
}

export default EditFirstForm;
