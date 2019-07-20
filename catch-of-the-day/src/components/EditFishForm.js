import React  from 'react';

class EditFirstForm extends React.Component {

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
            </div>
        );
    }
}

export default EditFirstForm;
