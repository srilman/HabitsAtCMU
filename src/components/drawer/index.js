//@flow
import React from 'react';

import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';

//import styles from './styles.scss';

export default class MainDrawer extends React.Component {

    props: {
        open: boolean
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Drawer
                    width={300}
                    open={this.props.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <div>
                        Habits at CMU
                    </div>
                    <div >
                        <Avatar src="http://www.material-ui.com/images/uxceo-128.jpg"
                            size={50}
                        />
                        <span>Leon Chang</span>
                    </div>
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                </Drawer>
            </div>
        );
    }
}
