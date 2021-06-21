import React, {Component} from 'react';

import {
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

console.disableYellowBox = true;
export default class app extends Component {
  constructor() {
    super();
    this.page = 1;
    this.notAvilable = false;
    this.state = {
      data: [],
    };
  }

  callApi = async () => {
    let url = 'https://reqres.in/api/users?page=' + this.page + '';
    let obj = {
      method: 'GET',
    };
    try {
      let res = await fetch(url, obj);
      res = await res.json();
      // console.warn('res', res.data);
      res.data == null || res.data == ''
        ? (this.notAvilable = true)
        : (this.notAvilable = false);

      this.setState({data: res.data});
    } catch (error) {
      console.warn('error', error);
    }
  };
  renderItem = item => {
    console.warn('object', item.item.id);
    return (
      <>
        <View style={{top: 10}}>
          <View
            style={{
              height: Dimensions.get('window').height / 8,
              width: '100%',
              backgroundColor: '#fff',
              // top:20,
              // bottom:20
            }}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#E8EAED',
                elevation: 5,
                borderRadius: 10,
              }}>
              <View
                style={{
                  // height: 60,
                  // width: 60,
                  flexDirection: 'row',
                  left: 10,
                  // backgroundColor: 'green',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    //  top: 10,
                    borderRadius: 30,
                  }}
                  source={{uri: item.item.avatar}}
                />
              </View>
              <View
                style={{
                  // flex: 1,
                  // flexDirection: 'column',
                  left: 20,
                }}>
                <Text style={{}}>{'ID: ' + item.item.id + ''}</Text>
                <Text style={{}}>
                  {'First name: ' + item.item.first_name + ''}
                </Text>
                <Text>{'Last name:' + item.item.last_name + ''}</Text>
                <Text>{'E-mail: ' + item.item.email + ''}</Text>
              </View>
            </View>
          </View>
        </View>
        {/* <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#fff',
            bottom: 20,
            top: 20,
          }}>
          <View
            style={{
              height: '100%',
              width: '80%',
              backgroundColor: '#fff',
              left: 25,
              elevation: 10,
              // bottom:20,
              // justifyContent: 'space-around',
              flexDirection:'row',
              borderRadius: 10,
            }}>
            <View style={{backgroundColor:"red",alignItems:'center',justifyContent:'center'}}>
              <Image
                style={{height: 50, width: 50,
                  //  top: 10,
                    borderRadius: 30}}
                source={{uri: item.item.avatar}}
              />
            </View>
            <View style={{flex: 1, flexDirection: 'column', left: 10}}>
              <Text style={{borderWidth: 1}}>{'ID: ' + item.item.id + ''}</Text>
              <Text style={{borderWidth: 1}}>
                {'First_name: ' + item.item.first_name + ''}
              </Text>
              <Text>{'Last_name:' + item.item.last_name + ''}</Text>
              <Text>{'E-mail: ' + item.item.email + ''}</Text>
            </View>
          </View>
        </View>
      </> */}
      </>
    );
  };
  componentDidMount() {
    this.callApi();
  }
  render() {
    return (
      <>
      <View style={{justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:15}}>{"Page number  "+this.page+""}</Text>
      </View>
        <View
          style={{
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            backgroundColor: '#fff',
          }}>
          {this.notAvilable == false ? (
            <FlatList
              style={{}}
              data={this.state.data}
              renderItem={this.renderItem}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                Data not Avilable
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            height: 40,
            position: 'absolute',
            width: Dimensions.get('window').width,
            // backgroundColor: 'orange',
            bottom: 80,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '30%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#E8EAED',
              elevation: 20,
              borderTopRightRadius: 50,
              borderBottomRightRadius: 50,
              // left: 20
            }}
            onPress={() => {
              this.page > 1 ? this.page-- && this.callApi() : '';

              // ;
              // console.warn('page', this.page);
            }}>
            <Text>{'Prev'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: '100%',
              width: '30%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#E8EAED',
              elevation: 20,
              borderTopLeftRadius: 50,
              borderBottomLeftRadius: 50,
            }}
            onPress={() => {
              this.page++;
              this.callApi();
            }}>
            <Text>{'Next'}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
