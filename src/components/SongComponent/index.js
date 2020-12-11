import React, { Component, Fragment } from "react";
import { View,Modal,Alert} from 'react-native';
import { Button,Icon } from "native-base";
import {Actions} from 'react-native-router-flux';
import {styles} from "./style";
export default class SongComponent extends Component {
  render() {
    return (
      <View>
        <Modal 
          animationType="slide"
          transparent={true}
          presentationStyle="overFullScreen"          
          visible={modalVisible}
          onRequestClose={() => { Alert.alert('Modal has been closed.');  }}
        >
          <View style={styles.songComponentOuter}>
            <View style={styles.songComponentInner}>  
              <View style={styles.songComponentTop}>
                <Button transparent style={styles.songComponentButton} onPress={()=>this.setState({ modalVisible : false })} >
                  <Icon name='close' style={{ color :"#000" }}  />            
                </Button>                
              </View>             
              <View style={styles.songComponentBody}>                 

              </View>                  
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}