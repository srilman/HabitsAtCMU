import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { teal400 } from 'material-ui/styles/colors';

import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';

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
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <AppBar
                    title="Title"
                    onLeftIconButtonTouchTap={this.handleToggle}
                />
                <Drawer
                    docked={false}
                    width={300}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                </Drawer>
            </MuiThemeProvider>
        );
    }

}




