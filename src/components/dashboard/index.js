//@flow
import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import styles from './styles.scss';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Done from 'material-ui/svg-icons/action/done';
import {green500} from 'material-ui/styles/colors';

//TODO: Firebase databsse integration
import firebase  from '../../firebase';


export default class Dashboard extends React.Component {

    props: {
        dialog: boolean,
        handleOpen: any,
        handleClose: any,
    };

    constructor(props) {
        super(props);
        this.state = {
            habits : [],
            current: null,
        };
        this.userId = firebase.auth().currentUser.uid;
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        /* Create reference to messages in Firebase Database */
        let hREf = firebase.database().ref('/users/' + this.userId + '/habits').orderByKey();
        hREf.on('child_added', (snapshot) => {
            console.log('incoming');
            let habit = { name: snapshot.val().name, id: snapshot.key };
            this.setState({ habits: [habit].concat(this.state.habits) });
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
        this.props.handleClose();
    }


    showHabit(id){
        this.setState({current: id});
        console.log(id);
    }

    checkHabit(id){
        console.log(id+'check');
    }

    render() {

        return(
            <div className={styles.wrapper}>
                <Card className={styles.cardLeft}>
                    <CardHeader
                        title="Habits"
                        subtitle="9/9/2017"
                    />
                    <List>
                        { /* Render the list of messages */
                            this.state.habits.map( habit => <ListItem
                                key={habit.id}
                                onClick={() => this.showHabit(habit.id)}
                                rightIconButton={
                                    <IconButton onClick={() => this.checkHabit(habit.id)}>
                                        <Done hoverColor={green500}/>
                                    </IconButton>
                                }
                            >{habit.name}</ListItem> )
                        }
                    </List>
                    <CardActions>
                        <FlatButton onClick={this.props.handleOpen} label="Add New Habit" />
                    </CardActions>
                </Card>
                <Card className={styles.cardRight}>
                    <CardText>
                        {this.state.current}
                    </CardText>
                </Card>
                <Dialog
                    title="Add New Habit"
                    modal={false}
                    open={this.props.dialog}
                    onRequestClose={this.props.handleClose}
                >
                    <form onSubmit={this.addHabit.bind(this)}>
                        <TextField
                            floatingLabelText="Habit Name"
                            hintText="Cool name for your habit"
                            name="hName"
                            ref={(input) => this.input = input}
                        /><br />
                        <FlatButton
                            style={{
                                display:      'inline-block',
                                float: 'right',
                            }}
                            label="Submit"
                            type="submit"
                            primary={true}
                        />
                        <FlatButton
                            style={{
                                display:'inline-block',
                                float: 'right',
                            }}
                            label="Cancel"
                            primary={true}
                            onClick={this.props.handleClose}
                        />
                    </form>
                </Dialog>
            </div>
        );
    }

}

