import React  from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from './Login';
import base, { firebaseApp } from "../base";


class Inventory extends React.Component {

    static propTypes = {
        fishes: PropTypes.object.isRequired, // Could shape this if desired
        addFish: PropTypes.func.isRequired,
        updateFish: PropTypes.func.isRequired,
        deleteFish: PropTypes.func.isRequired,
        loadSampleFishes: PropTypes.func.isRequired,
        storeId: PropTypes.string.isRequired
    };

    state = {
        uid: null,
        owner: null
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        });
    }

    authHandler = async authData => {

        console.log(authData);

        // 1. Look up current store in the Firebase DB
        const store = await base.fetch(this.props.storeId, { context: this });
        // 2. Claim it if there is no owner
        if (!store.owner) {
            // Save it!
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid, // Could use email here, e.g.,
            })
        }

        // 3. Set the state of the Inventory component to reflect current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.id
        });

    };

    authenticate = (provider) => {
        // e.g., firebase.auth.googleAuthProvider
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    };

    logout = async () => {
        console.log('Loggin Out');
        await firebase.auth().signOut();
        this.setState({uid: null});
    };

    render() {
        const logout = <button onClick={this.logout}>LTFO</button>;

        // 1. Check if they are logged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />;
        }

        // 2. If not the owner
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry, you are not the owner of this store.</p>
                    {logout}
                </div>
            );
        }

        // 3. If they are owner, just render the Inventory as usual.
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {
                    Object.keys(this.props.fishes).map(key =>
                        <EditFishForm
                            key={key}
                            index={key}
                            fish={this.props.fishes[key]}
                            updateFish={this.props.updateFish}
                            deleteFish={this.props.deleteFish}
                        />
                    )
                }
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
                {logout}
            </div>
        );
    }
}

export default Inventory;
