import React , { Fragment } from 'react';


class StorePicker extends React.Component {
    render() {
        return (
            <Fragment>
                <h1>Hello, from the Picker!</h1>
                <p>The "React.Fragment" component (new in React 16) allows for the creation of adjacent elements, which
                    is otherwise prohibited in previous versions. Further, it nicely renders nothing in its place,
                    so there are no longer any silly top-level DIVs unnecessarily.</p>
            </Fragment>
        );
    }
}

export default StorePicker;
