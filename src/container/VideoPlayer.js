import React, { Component } from 'react';
import { Platform, BackHandler, Dimensions, StyleSheet,Slider, View, TouchableWithoutFeedback, Picker, ToastAndroid, ProgressBarAndroid, ProgressViewIOS } from 'react-native';
import { Container, Header, Content,Form ,Input,Item, Footer,Left,Right,Body,Title, FooterTab, Button, Icon, Text,Card, CardItem, Thumbnail, ListItem, List, Spinner } from 'native-base';
import Video from 'react-native-video';
import { Actions } from 'react-native-router-flux';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    // init state variables
    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      paused: true,
      pickerValueHolder: '1.0',
      pausedText: 'Play',
      hideControls: false,
      showpicker: false,
    };
    this.video = Video;
  }

  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
  }
  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
  }
  componentWillUnmount() {    
    this.backHandler.remove();     
  }
  handleBackPress = () => {
    this.closePlayer();    
    return true;
  }

  // load video event
  onLoad = (data) => {
    this.setState({ duration: data.duration });
  };

  // video is playing
  onProgress = (data) => {
    this.setState({ currentTime: data.currentTime });
  };

  // video ends
  onEnd = () => {    
    this.setState({ paused: true, pausedText: 'Play'})
    this.video.seek(0);
  };

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    }
    return 0;
  };

  onChangeRate(itemValue, itemIndex) {
    var rate = parseFloat(itemValue);
    this.setState({pickerValueHolder: itemValue, rate: rate});
  }

  // pressing on 'play' button
  onPressBtnPlay() {
    var pausedText = '';
    if(!this.state.paused){
      pausedText = 'Play';

      // always show controls
      if(this.timeoutHandle)
        clearTimeout(this.timeoutHandle);
    }
    else {
      pausedText = 'Pause';

      // hide controls after 5s
      this.timeoutHandle = setTimeout(()=>{
        this.setState({hideControls: true});
      }, 5000);
    }
    this.setState({ paused: !this.state.paused, pausedText: pausedText });
  }

  // on press video event
  onPressVideo() {
    // showing controls if they don't show
    if(this.state.hideControls){
      this.setState({hideControls: false});
      this.timeoutHandle = setTimeout(()=>{
        this.setState({hideControls: true});
      }, 8000);
    }
  }

  // parse seconds to time (hour:minute:second)
  parseSecToTime(sec) {
    var sec_num = parseInt(sec, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0" + hours;}
    if (minutes < 10) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}

    return hours + ':' + minutes + ':' + seconds;
  }

  closePlayer(){    
    var pausedText = 'Pause';
    this.setState({ paused: !this.state.paused, pausedText: pausedText }); 
    Actions.pop(); 
  }
  onPressBtnBackward(duration){
    let seektime = duration - 5;    
    this.video.seek(seektime);
  }
  onPressBtnForward(duration){
    let seektime = duration + 5;    
    this.video.seek(seektime);
  }
  openPicker(picker){
    this.setState({ showpicker : !picker})
  }

  onSlide(value){
    let seektime = value;    
    this.video.seek(seektime);
  }

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;    
    const { title, url } = this.props    
    
    return ( 
      <Container style={{ backgroundColor: "#0A151F" }}>
        {Platform.OS === 'ios' && <View style={{alignItems:"center"}}>
        { !this.state.hideControls ?
          <View style={{ flexDirection: "row", alignItems : "center", height : 120, top: 50, left: 20 }}>
              <Button transparent onPress={()=>this.closePlayer() }>
                <Icon name='close' type="MaterialCommunityIcons" style={{ color :"#fff" }}  />
              </Button>      
          </View> : (null) }   
        </View>}
        {Platform.OS === 'android' && <View  >
        { !this.state.hideControls ?
          <View style={{ flexDirection: "row", alignItems : "center", height : 80, top: 10, left: 10,paddingTop:15 }}>
              <Button transparent onPress={()=>this.closePlayer() }>
                <Icon name='close' type="MaterialCommunityIcons" style={{ color :"#fff" }}  />
              </Button>          
          </View> : (null) }  
        </View>}
      
      <View style={styles.container}>
        <TouchableWithoutFeedback
          style={styles.fullScreen}
          onPress={() => this.onPressVideo()}>
          <Video
            ref={(ref) => { this.video = ref }}
            /* For ExoPlayer */
            source={{ uri:url }}             
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}            
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            onAudioBecomingNoisy={this.onAudioBecomingNoisy}
            onAudioFocusChanged={this.onAudioFocusChanged}
            repeat={false}
            playInBackground={false}
            onSeek={(time)=> console.log("seek time : ", time )}
          />
        </TouchableWithoutFeedback> 
       
      { !this.state.hideControls ?
      <View style={{top : 200, opacity : 0.4}}>
        <View style={{ backgroundColor:"#0A151F", flexDirection : "row", }}>

            <Button transparent onPress={() => this.onPressBtnBackward(this.state.currentTime)}>
              <Icon name='skip-backward' type="MaterialCommunityIcons" style={{ color :"#fff" }} />              
            </Button>

            <Button transparent onPress={() => this.openPicker(this.state.showpicker)}>
              <Icon name='play-speed' type="MaterialCommunityIcons" style={{ color :"#fff" }} />              
            </Button>

            <Button transparent onPress={() => this.onPressBtnPlay()}>
              { this.state.pausedText == 'Play' && <Icon name='play' type="MaterialCommunityIcons" style={{ color :"#fff" }}  />}
              { this.state.pausedText == 'Pause' && <Icon name='pause' type="MaterialCommunityIcons" style={{ color :"#fff" }}  />}
            </Button>

            { this.state.resizeMode == 'contain' && <Button transparent onPress={()=>this.setState({resizeMode: 'cover'}) }>
             <Icon name='fullscreen' type="MaterialCommunityIcons" style={{ color :"#fff" }}  />
             </Button>}
            { this.state.resizeMode == 'cover' && <Button transparent onPress={()=>this.setState({resizeMode: 'contain'}) }>
             <Icon name='fullscreen-exit' type="MaterialCommunityIcons" style={{ color :"#fff" }}  />
             </Button>}            
            
             <Button transparent onPress={() => this.onPressBtnForward(this.state.currentTime)}>
              <Icon name='skip-forward' type="MaterialCommunityIcons" style={{ color :"#fff" }} />              
            </Button>
        </View> 
        <View style={{ flexDirection : "row"}}>
              <View style={{ width : (SCREEN_WIDTH * 60)/100}}>             
              <Slider value={this.state.currentTime} maximumValue={this.state.duration} onValueChange={(value)=>{this.onSlide(value)}} minimumTrackTintColor="red" thumbTintColor="red" maximumTrackTintColor="#ccc"/>
              </View>
              <View style={{ width : (SCREEN_WIDTH * 30)/100, paddingLeft : 5}}>
                <Text style={{ color : "#fff", fontSize : 12}}>
                  {this.parseSecToTime(parseInt(this.state.currentTime))}/{this.parseSecToTime(parseInt(this.state.duration))}
                </Text>
              </View>       
            </View>     
        </View>: (null) }        
       {this.state.showpicker && 
       <View> 
        <Picker
          mode="dropdown"
          style={{width: 110}}
          itemStyle={{ color : "#000", fontSize : 35}}
          selectedValue={this.state.pickerValueHolder}
          onValueChange={(itemValue, itemIndex) => this.onChangeRate(itemValue, itemIndex)} 
        >
          <Picker.Item label="x1.5" value="1.5"/>
          <Picker.Item label="x1.25" value="1.25"/>
          <Picker.Item label="x1.0" value="1.0"/>
          <Picker.Item label="x0.75" value="0.75"/>
          <Picker.Item label="x0.5" value="0.5"/>
        </Picker>
        </View>
       }

        { !this.state.hideControls ?
        <View style={{ backgroundColor:"#0A151F", flexDirection : "row", top : 270, opacity : 0.4}}>
           { Platform.OS === 'ios' &&  
            <View style={{ flexDirection : "row"}}>
              <View style={{ width : (SCREEN_WIDTH * 60)/100}}>
              <ProgressViewIOS
                style={{ width : (this.state.duration * 100)/100, paddingVertical : 5}}
                progressTintColor="#fff"
                progress={flexCompleted/100}
                progressViewStyle="bar"
              />
              </View>
              <View style={{ width : (SCREEN_WIDTH * 30)/100, paddingLeft : 5}}>
                <Text style={{ color : "#fff", fontSize : 12}}>
                  {this.parseSecToTime(parseInt(this.state.currentTime))}/{this.parseSecToTime(parseInt(this.state.duration))}
                </Text>
              </View>       
            </View>     
           }          
        </View>         
        : (null) }
      </View>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A151F',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  playButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  controls: {
    backgroundColor: 'white',
    opacity: 0.7,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  playControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});