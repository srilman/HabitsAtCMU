import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { teal400 } from 'material-ui/styles/colors';

import AppBar from 'material-ui/AppBar';
import styles from './styles.scss';
//import MainDrawer from '../drawer';
import Dashboard from '../dashboard';

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: teal400,
    },
});

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState({open: !this.state.open});
    }

    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <div>
                        <AppBar
                            style={{paddingLeft: this.state.open ? 320: 20}}
                            title= { 'Habits at CMU' }
                            onLeftIconButtonTouchTap={ this.handleToggle }
                        />
                        <div className={styles.container}>
                            <Dashboard />
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }

}




