import React from 'react';
import { View, } from 'react-native';
import { Actions } from 'react-native-router-flux';
export class Splash extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        Actions.home();
    }
    render() {
        return (React.createElement(View, null));
    }
}
//# sourceMappingURL=index.js.map