import React  from 'react';
import {formatPrice} from "../helpers";
import { TransitionGroup, CSSTransition } from 'react-transition-group';


class Order extends React.Component {

    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];

        const transitionInfo = {
            classNames: 'order',
            key,
            timeout: { enter: 250, exit: 250 }
        };

        // Ensure fish has been loaded from Firebase
        //  Would promises from Firebase help here?
        if (!fish) return null;

        const isAvailable = fish.status === 'available';
        if (!isAvailable) {
            return <CSSTransition {...transitionInfo}>
                <li key={key}>
                    Sorry, {fish ? fish.name : "fish"} is no longer available.
                </li>
            </CSSTransition>
        }
        return (
            <CSSTransition {...transitionInfo}>
                <li key={key}>
                    <span>
                        <TransitionGroup component="span" className="count">
                            <CSSTransition classNames="count" key={count} timeout={transitionInfo.timeout}>
                                <span>{count}</span>
                            </CSSTransition>
                        </TransitionGroup>
                        lbs {fish.name}
                        {formatPrice(count * fish.price)}
                        <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
                    </span>
                </li>
            </CSSTransition>
        );
    };

    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((tally, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                return tally + (count * fish.price);
            }
            return tally;
        }, 0);

        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total: <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;
