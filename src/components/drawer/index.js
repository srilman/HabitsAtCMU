//@flow
import React from 'react';

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import ActionInfo from 'material-ui/svg-icons/action/info';

//import styles from './styles.scss';

export default class DrawerContent extends React.Component {

    props: {
        user: boolean,
        logout: () => void,
        login: () => void,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.user ?
                    <div>
                        <List>
                            <ListItem
                                disabled={true}
                                leftAvatar={
                                    <Avatar src={this.props.user.photoURL} />
                                }
                                nestedItems={[
                                    <ListItem key={1} primaryText="Logout" leftIcon={<ExitToApp />} onClick={this.props.logout} />,
                                ]}
                            >
                                {this.props.user.displayName || this.props.user.email}
                            </ListItem>
                        </List>
                        <Divider/>
                        <Subheader>Stuff</Subheader>
                        <List>
                            <ListItem primaryText="Dashboard" leftIcon={<ContentInbox />} />
                            <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
                            <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
                            <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
                            <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                        </List>
                        <Divider />
                        <Subheader>Stuff</Subheader>
                        <List>
                            <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
                            <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
                            <ListItem primaryText="Spam" rightIcon={<ActionInfo />} />
                            <ListItem primaryText="Follow up" rightIcon={<ActionInfo />} />
                        </List>
                    </div>
                    :
                    <RaisedButton onClick={this.props.login}>Log In</RaisedButton>
                }
            </div>
        );
    }
}
