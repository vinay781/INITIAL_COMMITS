import React, { Component } from 'react';
import { Dimensions } from "react-native";
import { Footer,FooterTab,Button,Icon,Text } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {styles} from '../../config/style';
import theme from  '../../config/theme';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class FooterComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'home'
        };
    }
    renderHome = async () => {
        Actions.jump('home');        
    }
    renderPlaylist = async () => {
        Actions.jump('playlist');        
    }
    renderLibrary = async () => {
        Actions.jump("library")         
    }
    renderBuzz = async () => {
        Actions.jump("buzz")         
    }
    renderProfile = async () => {
        Actions.jump("profile")         
    }
    render() {   
        const { activeTab } = this.props                
        return ( 
            <Footer style={styles.footerSize} >
                <FooterTab style={{backgroundColor:theme.PINK_COLOR}}  >
                <Button onPress={()=> this.renderHome()} >
                    {activeTab == 'home' ? <Icon name="control-play" type="SimpleLineIcons" style={styles.footerIcon}/> : <Icon name="control-play" type="SimpleLineIcons" style={{fontSize:(SCREEN_WIDTH * 5)/100,color:'#0A151F'}}/>}  
                    <Text style={{ color : activeTab == 'home' ? "#fff": '#0A151F', fontSize:7}}>Featured</Text>             
                </Button>
                <Button onPress={()=> this.renderPlaylist()} >
                    {activeTab == 'playlist' ? <Icon name="music-tone" type="SimpleLineIcons" style={styles.footerIcon}/> : <Icon name="music-tone" type="SimpleLineIcons" style={{fontSize:(SCREEN_WIDTH * 5)/100,color:'#0A151F'}}/>}
                    <Text style={{ color : activeTab == 'playlist' ? "#fff": '#0A151F', fontSize:7}}>Playlists</Text>  
                </Button>
                <Button onPress={()=> this.renderLibrary()} >
                    {activeTab == 'library' ? <Icon name="library-music" type="MaterialIcons" style={styles.footerIcon}/> : <Icon name="library-music" type="MaterialIcons" style={{fontSize:(SCREEN_WIDTH * 5)/100,color:'#0A151F'}}/> }
                    <Text style={{ color : activeTab == 'library' ? "#fff": '#0A151F', fontSize:7}}>Library</Text>  
                </Button>
                <Button onPress={()=> this.renderBuzz()} >
                    {activeTab == 'buzz' ? <Icon name="vibrate" type="MaterialCommunityIcons" style={styles.footerIcon} /> : <Icon name="vibrate" type="MaterialCommunityIcons" style={{fontSize:(SCREEN_WIDTH * 5)/100,color:'#0A151F'}} />}
                    <Text style={{ color : activeTab == 'buzz' ? "#fff": '#0A151F', fontSize:7}}>Geez</Text> 
                </Button>
                <Button onPress={()=> this.renderProfile()} >
                    {activeTab == 'profile' ? <Icon name="user" type="AntDesign" style={styles.footerIcon} /> : <Icon name="user" type="AntDesign" style={{fontSize:(SCREEN_WIDTH * 5)/100,color:'#0A151F'}} />}
                    <Text style={{ color : activeTab == 'profile' ? "#fff": '#0A151F', fontSize:7}}>Account</Text> 
                </Button>
                </FooterTab>
            </Footer>
        )
    }
}