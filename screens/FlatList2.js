import React, {Component} from 'react';
import {FlatList, View, Text, TextInput, StyleSheet, Button, Image, Picker, TouchableOpacity, TouchableHighlight} from 'react-native';
// import Snackbar from 'react-native-snackbar';
// import Button from 'react-native-button';
// import AddModal from './AddModal';
// import EditModal from './EditModal';

class FlatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRowKey: null,
        }
    }

    render() {

        return(
            <>
            <TouchableOpacity style={{backgroundColor: 'white'}} onPress={()=> {
                    this.props.navigation.navigate('Details');
                }
            }>
                <View style={{
                    flex: 1,
                    backgroundColor: 'none',
                    color: 'black',
                    flexDirection: 'row',
                    paddingBottom: 5,
                    borderBottomColor: 'white',
                    borderBottomWidth: 2,
                    paddingTop: 5
                    
                }}>
                    <Image source={{uri: this.props.item.imageUrl}} style={{width: 100, height: 100, margin: 5}}></Image>
                    <View style={{flex: 1, flexDirection: 'column', borderBottomWidth: 1, borderBottomColor: 'silver'}}>
                        <Text style={{padding: 2, paddingLeft: 5, color: 'gray', textTransform: 'uppercase', fontSize: 12}}>Phòng trọ</Text>
                        <Text style={{fontWeight: 'bold', fontSize: 18, paddingBottom: 5, paddingLeft: 5, color: 'black', fontSize: 15}}>Cho thuê phòng trọ quận Tân Bình, giá rẻ cho sinh viên</Text>
                        <Text style={{padding: 2, paddingLeft: 5, color: 'deeppink', fontSize: 13}}>Giá: 2000000 VND/Tháng</Text>
                        <Text style={{padding: 2, paddingLeft: 5, paddingBottom: 12, color: 'black', fontSize: 13}}>Quận Tân Bình, Thành phố Hồ Chí minh</Text>
                    </View>
                    
                </View>
                </TouchableOpacity>
            </>
        )
    }
}

const styles =StyleSheet.create({
    
})

export default class FlatList1 extends Component {
    constructor(props){
        super(props);
        this.state = {
            deleted1: true
        }
        //this.add = this.add.bind(this);
    }
    // refreshFlatList = () => {
    //     this.setState((prev) => {
    //         return {
    //             deleted1: !prev.deleted1
    //         }
    //     })
    //     //this.refs.flatList.scrollToEnd();
    // }
    // add() {
    //     this.refs.addModal.showAddModal();
    // }
    render() {
    var options =["Đà Nẵng","Savings","Car","GirlFriend"];
    var options1 =["Thanh Khê","Savings","Car","GirlFriend"];
    var options2 =["Phòng trọ","Savings","Car","GirlFriend"];
    return (
      <>
        
        <View style={{}}>
            <View style={{
                margin: 10,
                marginTop: 0
                
            }}>
                <Text style={{fontSize: 16, textAlign: 'center', marginTop: 10, marginBottom: 10, letterSpacing: 1}}>{this.props.title}</Text>
            </View>
            {/* <Text style={{textAlign: 'center', marginBottom: 10, marginTop: 10, fontSize: 18, letterSpacing: 2}}>{this.props.title}</Text> */}
            
            <FlatList style={{marginTop: 0, marginBottom: 45}} ref={'flatList'} data={[1]}
                renderItem={({item, index}) => {
                    return(
                        <FlatListItem navigation={this.props.navigation} item={item} index={index} parents={this}></FlatListItem>
                    )
                }}
            >
            </FlatList>
            {/* <AddModal ref={'addModal'} parents={this}></AddModal>
            <EditModal ref={'editModal'} parents={this}></EditModal> */}
        </View>
      </>
    );
  }
}
