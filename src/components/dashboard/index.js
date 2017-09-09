//@flow
import React from 'react';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import styles from './styles.scss';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { getWeekNumber} from '../../utils/date';

import firebase  from '../../firebase';

export default class Dashboard extends React.Component {

    props: {
        addDialog: boolean,
        moreDialog: boolean,
        handleAddOpen: any,
        handleAddClose: any,
        handleMoreOpen: any,
        handleMoreClose: any,
    };

    constructor(props) {
        super(props);
        this.state = {
            groups: {},
            habits : {},
            current: null,
        };
        this.userId = firebase.auth().currentUser.uid;
        this.componentWillMount = this.componentWillMount.bind(this);
        this.addHabit = this.addHabit.bind(this);
    }

    componentWillMount(){
        /* Create reference to messages in Firebase Database */
        let hREf = firebase.database().ref('/users/' + this.userId + '/habits').orderByKey();
        hREf.on('value', (snapshot) => {
            let access = snapshot.val();
            let elements = Object.keys(access);
            elements.forEach((el) => {
                console.log('element', el);
                firebase.database().ref(`/habits/${el}`).on('value', (snap) => {
                    console.log('Did this work', snap.val());
                    this.setState({
                        habits: {
                            [el]: {
                                id: snap.key,
                                name: snap.val().name,
                                reccurenceTimes: access[el].reccurenceTimes,
                                recurrenceType: access[el].recurrenceType,
                                history: access[el].history,
                            },
                        },
                    });
                });
            });
        });

        let groups = firebase.database().ref('/users/' + this.userId + '/groups').orderByKey();
        groups.on('value', (snapshot) => {
            Object.keys(snapshot.val()).forEach((key) => {
                this.setState({
                    groups: {
                        [key]: snapshot.val()[key],
                    },
                });
            });
        });

    }

    addHabit(e) {
        e.preventDefault();

        if(this.input.getValue() !== ''){
            firebase.database().ref('/users/'+ this.userId +'/habits/').push({
                name: this.input.getValue(),
                curatedId: 1,
            });
        }
        this.props.handleAddClose();
    }


    showHabit(id){
        this.setState({current: id});
        console.log(id);
        this.props.handleMoreOpen();
    }

    checkHabit(id){
        let day = (new Date()).getDay();
        let week = getWeekNumber(new Date());
        console.log(id+' check ' + week + ' something ' + day);

        let val = firebase.database().ref(`/users/${this.userId}/habits/${id}/history/${week}/${day}`);
        val.once('value', (snapshot) => {
            val.set(snapshot.val() + 1);
        });

        let weekVal = firebase.database().ref(`/users/${this.userId}/habits/${id}/history/${week}/sum`);
        weekVal.once('value', (snapshot) => {
            weekVal.set(snapshot.val() + 1);
        });
    }

    render() {
        console.log(this.state);

        return(
            <div className={styles.wrapper}>
                {
                    Object.keys(this.state.groups).map(group =>
                        <Card key={group} className={styles.cardLeft}>
                            <CardHeader
                                title={group}
                                subtitle="General"
                            />
                            <List>
                                {
                                    this.state.groups[group].map(element =>
                                        <ListItem
                                            key={this.state.habits[element].id}
                                            primaryText={this.state.habits[element].name}
                                            leftCheckbox={<Checkbox
                                                onCheck={() => this.checkHabit(this.state.habits[element].id)}
                                                checked={
                                                    this.state.habits[element].reccurenceType === 'days'
                                                        ? this.state.habits[element]
                                                            .history[getWeekNumber(new Date())][(new Date().getDay())] === this.state.habits.reccurenceTimes
                                                        : this.state.habits[element]
                                                            .history[getWeekNumber(new Date())] === this.state.habits.reccurenceTimes
                                                }
                                                disabled={this.state.habits[element].reccurenceType === 'days'
                                                    ? this.state.habits[element]
                                                        .history[getWeekNumber(new Date())][(new Date().getDay())] === this.state.habits.reccurenceTimes
                                                    : this.state.habits[element]
                                                        .history[getWeekNumber(new Date())] === this.state.habits.reccurenceTimes
                                                }
                                            />}
                                        />
                                    )}
                            </List>
                            <CardActions>
                                <FlatButton onClick={this.props.handleAddOpen} label="Add New Habit" />
                                <FlatButton label="More" />
                            </CardActions>
                        </Card>
                    )
                }

                <Dialog
                    title="Add New Habit"
                    modal={false}
                    open={this.props.addDialog}
                    onRequestClose={this.props.handleAddClose}
                >
                    <form onSubmit={(e) => this.addHabit(e)}>
                        <TextField
                            floatingLabelText="Habit Name"
                            hintText="Cool name for your habit"
                            name="hName"
                            ref={(input) => this.input = input}
                        /><br />
                        <FlatButton
                            style={{
                                display: 'inline-block',
                                float: 'right',
                            }}
                            label="Submit"
                            type="submit"
                            primary={true}
                        />
                        <FlatButton
                            style={{
                                display: 'inline-block',
                                float: 'right',
                            }}
                            label="Cancel"
                            primary={true}
                            onClick={this.props.handleAddClose}
                        />
                    </form>
                </Dialog>
                <Dialog
                    title="More Info of Habit"
                    modal={false}
                    open={this.props.moreDialog}
                    onRequestClose={this.props.handleMoreClose}
                >
                    <form>
                        <TextField
                            floatingLabelText="Habit Name"
                            hintText="Cool name for your habit"
                            name="hName"
                            ref={(input) => this.input = input}
                        /><br />
                        <FlatButton
                            style={{
                                display: 'inline-block',
                                float: 'right',
                            }}
                            label="Submit"
                            type="submit"
                            primary={true}
                        />
                        <FlatButton
                            style={{
                                display: 'inline-block',
                                float: 'right',
                            }}
                            label="Cancel"
                            primary={true}
                            onClick={this.props.handleMoreClose}
                        />
                    </form>
                </Dialog>
            </div>
        );
    }

}

