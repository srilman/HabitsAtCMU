import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { teal400 } from 'material-ui/styles/colors';

import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import { auth, provider } from '../../firebase';

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: teal400,
    },
});

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            open: false,
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
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
                    <div className="wrapper">
                        {this.state.user ?
                            <RaisedButton onClick={this.logout}>Log Out</RaisedButton>
                            :
                            <RaisedButton onClick={this.login}>Log In</RaisedButton>
                        }
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
    }

    login() {
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user,
                });
            });
    }

    logout() {
        auth.signOut()
            .then(() => {
                this.setState({
                    user:null,
                });
            });
    }

}




