import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { teal400 } from 'material-ui/styles/colors';

import AppBar from 'material-ui/AppBar';
import styles from './styles.scss';
import DrawerContent from '../drawer';
import Dashboard from '../dashboard';
//import MenuItem from 'material-ui/MenuItem';
//import RaisedButton from 'material-ui/RaisedButton';
import { auth, provider } from '../../firebase';
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
            user: null,
            open: false,
            addDialog: false,
            moreDialog: false,
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleToggle() {
        this.setState({open: !this.state.open});
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

    handleAddOpen = () => {
        this.setState({addDialog: true});
    };

    handleAddClose = () => {
        this.setState({addDialog: false});
    };

    handleMoreOpen = () => {
        this.setState({moreDialog: true});
    };

    handleMoreClose = () => {
        this.setState({moreDialog: false});
    };

    render() {
        const contentStyle = {  transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)' };

        if (this.state.open) {
            contentStyle.marginLeft = 320;
        }
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <div>
                        <AppBar
                            style={{paddingLeft: this.state.open ? 320: 20}}
                            title= { 'Habits at CMU' }
                            onLeftIconButtonTouchTap={ this.handleToggle }
                        />
                        <div
                            className={styles.container}
                            style={contentStyle}
                        >
                            {this.state.user ?
                                <Dashboard
                                    addDialog = {this.state.addDialog}
                                    moreDialog= {this.state.moreDialog}
                                    handleAddOpen = {this.handleAddOpen}
                                    handleAddClose = {this.handleAddClose}
                                    handleMoreOpen = {this.handleMoreOpen}
                                    handleMoreClose = {this.handleMoreClose}
                                />
                                :
                                <div className="wrapper">
                                    <p>You must be logged in. Please login on the left.</p>
                                </div>
                            }
                        </div>
                        <Drawer
                            docked={false}
                            width={300}
                            open={this.state.open}
                            onRequestChange={(open) => this.setState({open})}
                        >
                            <DrawerContent
                                user={this.state.user}
                                login= {() => this.login()}
                                logout= {() => this.logout()}
                            />
                        </Drawer>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }

}




