import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import styles from './styles.scss';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Done from 'material-ui/svg-icons/action/done';
import {green500} from 'material-ui/styles/colors';

const iconButtonElement = (
    <IconButton>
        <Done hoverColor={green500}/>
    </IconButton>
);

const Dashboard = () => (
    <Card className={styles.card}>
        <CardHeader
            title="Habits"
            subtitle="9/9/2017"
        />
        <List>
            <ListItem primaryText="Get mail" rightIconButton={iconButtonElement} />
            <ListItem primaryText="Take out trash"  />
            <ListItem primaryText="Take 2 shits" />
            <ListItem primaryText="Watch Up" />
        </List>
        <CardActions>
            <FlatButton label="Add New Habit" />
        </CardActions>
        <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
    </Card>
);

export default Dashboard;
