import React, {Component} from 'react';
import { Text, View, Picker, Button, ScrollView, Linking } from 'react-native';
import FlatList1 from './FlatList1';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { SliderBox } from "react-native-image-slider-box";
//import { Dropdown } from 'react-native-material-dropdown';
export default class Details3Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
              "https://images.pexels.com/photos/1903702/pexels-photo-1903702.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              "https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              "https://images.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              "https://images.pexels.com/photos/917494/pexels-photo-917494.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", // Network image
            ]
          };
    }
    render() {
        
        return (
            <ScrollView style={{backgroundColor: '#eee'}} showsVerticalScrollIndicator={true}>
                <SliderBox images={this.state.images} />
                <View style={{marginBottom: 10, marginTop: 10, borderRadius: 20, backgroundColor: 'white', flex: 1, flexDirection: 'column', padding: 10}}>
                    <Text style={{
                        color: 'gray',
                        textTransform: 'uppercase',
                        fontSize: 12
                    }}>Phòng trọ</Text>
                    <Text style={{
                        fontSize: 19,
                        fontWeight: 'bold',
                        marginBottom: 10
                    }}>Phòng trọ giá phải chăng, gần trường bách khoa</Text>
                    <Text style={{
                        color: 'deeppink',
                        paddingBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: 'gray'
                    }}>Giá: 2000000VND/Tháng</Text>
                    <View style={{paddingTop: 10, flex: 1, flexDirection: 'row',justifyContent: 'center'}}>
                        <View style={{flex: 1, flexDirection: 'column', textAlign: 'center'}}>
                            <Text style={{textAlign: 'center', fontSize: 18}}>Diện tích</Text>
                            <Text style={{textAlign: 'center', fontSize: 20, color: 'deeppink'}}>35m2</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'column', textAlign: 'center'}}>
                            <Text style={{textAlign: 'center', fontSize: 18}}>Tình trạng</Text>
                            <Text style={{textAlign: 'center', fontSize: 20, color: 'deeppink'}}>Chưa đặt</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginBottom: 10, padding: 10, borderRadius: 20, backgroundColor: 'white'}}>
                    <Text style={{fontSize: 20, marginBottom: 10}}>Mô tả chi tiết</Text>
                    <Text>Điện nước miễn phí, wifi trả 1 tháng 50000, có điều hòa, wc riêng, an ninh tốt</Text>
                </View>
                <View style={{marginBottom: 10, padding: 10, borderRadius: 20, backgroundColor: 'white'}}>
                    <Text style={{fontSize: 20, marginBottom: 10}}>Địa chỉ chi tiết</Text>
                    <View style={{paddingTop: 10, flex: 1, flexDirection: 'row',justifyContent: 'space-between'}}>
                        <View style={{flex: 1, flexDirection: 'column', textAlign: 'center'}}>
                            <Text style={{textAlign: 'center', fontSize: 14}}>Số nhà, Đường</Text>
                            <Text style={{textAlign: 'center', fontSize: 14, color: 'deeppink'}}>K05/47 Lê Trọng Tấn</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'column', textAlign: 'center'}}>
                            <Text style={{textAlign: 'center', fontSize: 14}}>Quận/Huyện</Text>
                            <Text style={{textAlign: 'center', fontSize: 14, color: 'deeppink'}}>Thanh Khê</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'column', textAlign: 'center'}}>
                            <Text style={{textAlign: 'center', fontSize: 14}}>Tỉnh/Thành</Text>
                            <Text style={{textAlign: 'center', fontSize: 14, color: 'deeppink'}}>Đà Nẵng</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginBottom: 10, padding: 10, borderRadius: 20, backgroundColor: 'white'}}>
                    <Text style={{fontSize: 20, marginBottom: 10}}>Số điện thoại liên hệ</Text>
                    <Text>0335941792</Text>
                </View>
                <View style={{marginBottom: 10, padding: 10, borderRadius: 20, backgroundColor: 'white'}}>
                    <Text style={{fontSize: 20, marginBottom: 10}}>Ngày đăng</Text>
                    <Text>05/09/2020</Text>
                </View>
                <TouchableHighlight style={{marginBottom: 10, padding: 10, borderRadius: 20, backgroundColor: 'white'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <Text style={{fontSize: 20, marginBottom: 10}}>Người đăng</Text>
                            <Text>Hồ Gia Khánh</Text>
                        </View>
                        <Text style={{fontSize: 20, marginTop: 15}}>></Text>
                    </View>
                </TouchableHighlight>
                <View style={{flex: 100, flexDirection: 'row'}}>
                    <TouchableHighlight style={{flex: 50, marginBottom: 10, padding: 10, borderRadius: 20, backgroundColor: 'red'}}>
                        <Text style={{textAlign: 'center', color: 'white'}}>Hủy đặt</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={{flex: 50, marginBottom: 10, marginLeft: 10, padding: 10, borderRadius: 20, backgroundColor: 'coral'}}
                    onPress={() => {
                        Linking.openURL(`tel:0335941792`)
                    }}
                    >
                        <Text style={{textAlign: 'center'}}>Gọi điện thoại</Text>
                    </TouchableHighlight>
                </View>
                <View style={{padding: 10, borderRadius: 20, backgroundColor: 'white'}}>
                    <Text style={{fontSize: 20}}>Đánh giá của người dùng: 4/5</Text>
                    <View style={{paddingTop: 10, flex: 1, flexDirection: 'row'}}>
                        <Text style={{marginRight: 10, fontSize: 16, fontWeight: 'bold'}}>Nguyễn Văn A đã đánh giá:</Text>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'red'}}>4 sao</Text>
                    </View>        
                    <Text style={{fontSize: 12, color: 'gray', marginBottom: 7}}>12/05/2020</Text>
                    <Text style={{paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'silver'}}>Tốt, ổn so với tầm giá.</Text>

                    <View style={{paddingTop: 10, flex: 1, flexDirection: 'row'}}>
                        <Text style={{marginRight: 10, fontSize: 16, fontWeight: 'bold'}}>Nguyễn Văn A đã đánh giá:</Text>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'red'}}>4 sao</Text>
                    </View>        
                    <Text style={{fontSize: 12, color: 'gray', marginBottom: 7}}>12/05/2020</Text>
                    <Text style={{paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'silver'}}>Tốt, ổn so với tầm giá.</Text>
                </View>
            </ScrollView>
            
           
        )
    }
}