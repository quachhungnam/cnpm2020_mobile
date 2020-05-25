import React, {Component} from 'react';
import { Text, View, Picker, Button } from 'react-native';
import FlatList1 from './FlatList1';
//import { Dropdown } from 'react-native-material-dropdown';
export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <FlatList1 navigation={this.props.navigation} title="Phòng trọ HOT"></FlatList1>
            </View>
           
        )
    }
}