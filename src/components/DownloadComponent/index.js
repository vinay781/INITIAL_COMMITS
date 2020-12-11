import React, { useState } from "react";
import { Image,Text,TouchableHighlight,Modal,View,Alert} from "react-native";
import { Icon,Button} from 'native-base';
import {Actions} from 'react-native-router-flux';
import theme from "../../config/theme";
import {styles} from "./style";
export default function DownloadComponent(props) {
    const { id, title, artist, url } = props;
    const [modalVisible, setModalVisible] = useState(false);
    return(
    <View>
     <Icon name='arrow-collapse-down' type="MaterialCommunityIcons" style={styles.downloadComponentIcon} onPress={()=> {setModalVisible(true)} }/>
        <Modal
            animationType="slide"
            transparent={true}
            presentationStyle="overFullScreen"
            visible={modalVisible}
            onRequestClose={()=>{Alert.alert("Modal has been closed.")}}
        >
        <View style={styles.downloadComponentOuter}>
          <View style={styles.downloadComponentInner}>
            <View style={styles.downloadComponentClose}>
             <Button transparent style={styles.downloadComponentTopButton} onPress={()=> setModalVisible(false)} >
               <Icon name='close-circle' type="MaterialCommunityIcons" style={styles.downloadComponentTopIcon} />            
             </Button>                
            </View> 
            <View>
                <Image source={theme.PURCHASE} style={styles.downloadComponentImage} />  
            </View>
            <View style={styles.downloadComponentBody}>
                <Text style={styles.downloadComponentTextOne}> DOWNLOAD </Text>
                <Text style={styles.downloadComponentTextTwo}> FULL SONG! </Text>
                <TouchableHighlight onPress={()=>{setModalVisible(false);Actions.jump('terms')}}>
                    <Text note style={styles.downloadComponentTextThree} > T{`&`}C Apply</Text>
                </TouchableHighlight>
            </View> 
            <View style={styles.downloadComponentBottom}>
                <Button full style={styles.submitButton} onPress={()=>{setModalVisible(false);Actions.jump("purchase",{id:id,title:title,artist:artist,url:url}) }}>
                    <Text style={styles.linkText} >PAY WITH ORANGE MONEY</Text>
                    <Image source={theme.ORANGE} style={styles.downloadComponentBottomImage} /> 
                </Button>  
            </View>
         </View>
        </View>            
        </Modal>
    </View>
    );
}