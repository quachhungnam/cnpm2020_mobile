import React, { Component } from 'react';
import { TextInput, Text, View, TouchableHighlight, StyleSheet, ScrollView, FlatList } from 'react-native';
import { get_one_district, get_one_province, get_one_posttype, searchByAddress } from '../networking/Server';
import HomeFlatListItem from '../components/HomeFlatListItem';
export default class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textSearch: '',
            postsFromServer: [],
            province: '',
            district: '',
            posttype: '',
            districtCode: -1,
            provinceCode: -1,
            posttypeId: -1
        }
    }
    componentDidMount() {
        this.ref.focus();
        const { district } = this.props.route.params;
        const { province } = this.props.route.params;
        const { posttypes } = this.props.route.params;
        this.setState({ districtCode: district });
        this.setState({ provinceCode: province });
        this.setState({ posttypeId: posttypes });
        this.getOneDistrict(district);
        this.getOneProvince(province);
        this.getOnePosttype(posttypes);
        console.log("PROPS " + district);
        console.log("PROPS " + province);
        console.log("PROPS " + posttypes);
        //alert(this.route.district);
    }
    getOneDistrict(districtCode) {
        if (districtCode === -1) return;
        get_one_district(districtCode).then(res => {
            this.setState({ district: res.name_with_type });
        }).catch(err => {
            console.log(err);
        })
    }
    getOneProvince(provinceCode) {
        get_one_province(provinceCode).then(res => {
            this.setState({ province: res.name_with_type });
        }).catch(err => {

        })
    }
    getOnePosttype(posttypeId) {
        get_one_posttype(posttypeId).then(res => {
            this.setState({ posttype: res.name });
        }).catch(err => {

        })
    }
    getSearchedPost = (text) => {
        console.log(text);
        searchByAddress(text)
            .then(res => {
                if (res.error) {
                    return this.setState({ postsFromServer: [] });
                }
                this.setState({
                    postsFromServer: res.post.filter(
                        item => item.status_id.code === 1 || item.status_id.code === 2
                    ).filter(item => item.province_id.code === this.state.provinceCode).filter(item => item.post_type_id._id === this.state.posttypeId)
                });
            }, error => {
                this.setState({ postsFromServer: [] });
                console.log(error);
            })
    }
    render() {
        let flatListz;
        if (this.state.postsFromServer.length === 0) {
            flatListz = (<Text style={{
                marginLeft: 10, marginRight: 20,
                marginTop: 0, fontSize: 18
            }}>Chưa có bài đăng nào</Text>)
        } else {
            flatListz = (
                <FlatList
                    style={{ marginTop: 0 }}
                    ref={'flatList'}
                    data={this.state.postsFromServer}
                    renderItem={({ item, index }) => {
                        return (
                            <HomeFlatListItem
                                navigation={this.props.navigation}
                                item={item}
                                index={index}
                                parents={this}
                            />
                        );
                    }}
                    keyExtractor={(item, index) => item._id}
                // refreshControl={
                // <RefreshControl
                //     refreshing={this.state.refreshing}
                //     onRefresh={this.onRefresh}
                // />
                // }
                />
            )
        }
        let tieuchi;
        if (this.state.districtCode === -1) {
            tieuchi = (<Text style={{ marginLeft: 10, fontSize: 16 }}>{this.state.province}</Text>)
        } else {
            tieuchi = (<Text style={{ marginLeft: 10, fontSize: 16 }}>{this.state.district + ','} {this.state.province}</Text>)
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold' }}>Tiêu chí tìm kiếm</Text>
                {tieuchi}
                <Text style={{ marginLeft: 10, fontSize: 16 }}>Loại tin {this.state.posttype}</Text>
                <View style={{ flex: 1, flexDirection: 'row', height: 50 }}>
                    {/* <TouchableHighlight
                        style={styles.buttonSearch}
                        disabled={this.state.textSearch.length === 0}
                        onPress={() => {
                        this.getSearchedPost();
                        }}
                    > 
                        <Text style={{ textAlign: 'center', color: '#333', fontSize: 16 }}>
                        Tìm kiếm
                        </Text>
                    </TouchableHighlight> */}
                    <TextInput
                        autoFocus={true}
                        style={styles.InputSearch}
                        returnKeyType="go"
                        autoCorrect={false}
                        placeholder="Nhập tên đường, số nhà"
                        placeholderTextColor="gray"
                        onChangeText={text => {
                            if (text.length > 3) {
                                this.getSearchedPost(text);
                            }
                        }}
                        ref={ref => (this.ref = ref)}
                    />
                    <TouchableHighlight
                        style={styles.buttonSearch}
                        onPress={() => this.props.navigation.goBack(null)}
                    >
                        <Text style={{ textAlign: 'center', color: '#333', fontSize: 16 }}>
                            Hủy
                        </Text>
                    </TouchableHighlight>
                </View>
                <ScrollView>{flatListz}</ScrollView>

            </View>


        )
    }
}
const styles = StyleSheet.create({
    picker_pro_dis: {
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
    },
    InputSearch: {
        marginTop: 10,
        height: 40,
        marginHorizontal: 10,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingLeft: 0,
        flex: 3,
    },
    buttonSearch: {
        marginTop: 5,
        backgroundColor: '#ffceb5',
        paddingVertical: 10,
        marginTop: 10,
        margin: 10,
        borderRadius: 8,
        flex: 1,
        height: 40
    }

})