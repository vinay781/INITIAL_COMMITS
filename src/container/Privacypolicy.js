import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {styles} from '../config/style';
import theme from '../config/theme';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Left, Right, Body, Title, Button, Icon} from 'native-base';

export default class Privacypolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Container style={styles.containerMainDiscover} >
        <Header transparent>
          <Left>
            <Button transparent style={{ paddingLeft: 15 }} onPress={() => Actions.pop()}>
              <Icon name='arrow-back' style={{ color: "#fff" }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "white" }}> Privacy Policy</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content style={{ backgroundColor: theme.DEFAULT_COLOR }} >
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
            <Text style={styles1.text}>
            Protecting your private information is our priority. This Statement of Privacy applies to "Tunes Liberia"(Mobile App)and governs data collection and usage. For the purposes of this Privacy Policy, unless otherwise noted, all references to "Tunes Liberia"(Mobile App)  include "Tunes Liberia"(Mobile App) . The "Tunes Liberia"(Mobile App)website is a "Tunes Liberia"(Mobile App)site. By using the "Tunes Liberia"(Mobile App)website, you consent to the data practices described in this statement. 
            </Text>

            <Text style={styles1.textHead}>Collection of your Personal Information </Text>
            <Text style={styles1.text}>In order to better provide you with products and services offered on our Site, "Tunes Liberia"(Mobile App)may collect personally identifiable information, such as your:</Text>

            <View style={styles1.outerView}>
                <View style={styles1.innerView1}>
                    <Icon type='Octicons' name='dash' style={{ color:'#fff', marginStart: 10 }}/>
                </View>
                <View style={styles1.innerView2}>
                    <Text style={[styles1.text, {paddingTop:0}]}>First and Last Name </Text>
                </View>
            </View>
            <View style={styles1.outerView}>
                <View style={styles1.innerView1}>
                    <Icon type='Octicons' name='dash' style={{ color:'#fff', marginStart: 10 }}/>
                </View>
                <View style={styles1.innerView2}>
                    <Text style={[styles1.text, {paddingTop:0}]}>Mailing Address  </Text>
                </View>
            </View>
            <View style={styles1.outerView}>
                <View style={styles1.innerView1}>
                    <Icon type='Octicons' name='dash' style={{ color:'#fff', marginStart: 10 }}/>
                </View>
                <View style={styles1.innerView2}>
                    <Text style={[styles1.text, {paddingTop:0}]}>E-mail Address  </Text>
                </View>
            </View>
            <View style={styles1.outerView}>
                <View style={styles1.innerView1}>
                    <Icon type='Octicons' name='dash' style={{ color:'#fff', marginStart: 10 }}/>
                </View>
                <View style={styles1.innerView2}>
                    <Text style={[styles1.text, {paddingTop:0}]}>Phone Number  </Text>
                </View>
            </View>
            <Text style={styles1.text}>We do not collect any personal information about you unless you voluntarily provide it to us. However, you may be required to provide certain personal information to us when you elect to use certain products or services available on the Site. These may include: (a) registering for an account on our Site; (b) entering a sweepstakes or contest sponsored by us or one of our partners; (c) signing up for special offers from selected third parties; (d) sending us an email message; (e) submitting your credit card or other payment information when ordering and purchasing products and services on our Site. To wit, we will use your information for, but not limited to, communicating with you in relation to services and/or products you have requested from us. We also may gather additional personal or non-personal information in the future.</Text>

            <Text style={styles1.textHead}>Use of your Personal Information </Text>
            <Text style={styles1.text}>"Tunes Liberia"(Mobile App)  collects and uses your personal information to operate its website(s) and deliver the services you have requested.</Text>
            <Text style={styles1.text}>"Tunes Liberia"(Mobile App)  may also use your personally identifiable information to inform you of other products or services available from "America's Boating Club"(Mobile App)  and its affiliates. </Text>

            <Text style={styles1.textHead}>Sharing Information with Third Parties</Text>
            <Text style={styles1.text}>"Tunes Liberia"(Mobile App)  does not sell, rent or lease its customer lists to third parties. </Text>
            <Text style={styles1.text}>"Tunes Liberia"(Mobile App) may share data with trusted partners to help perform statistical analysis, send you email or postal mail, provide customer support, or arrange for deliveries. All such third parties are prohibited from using your personal information except to provide these services to "Tunes Liberia"(Mobile App) , and they are required to maintain the confidentiality of your information.</Text>
            <Text style={styles1.text}>"Tunes Liberia"(Mobile App)  may disclose your personal information, without notice, if required to do so by law or in the good faith belief that such action is necessary to: (a) conform to the edicts of the law or comply with legal process served on "Tunes Liberia"(Mobile App)  or the site; (b) protect and defend the rights or property of "Tunes Liberia"(Mobile App) ; and/or (c) act under exigent circumstances to protect the personal safety of users of "Tunes Liberia"(Mobile App) , or the public.</Text>

            <Text style={styles1.textHead}>Automatically Collected Information</Text>
            <Text style={styles1.text}>Information about your computer hardware and software may be automatically collected by "Tunes Liberia"(Mobile App) . This information can include: your IP address, browser type, domain names, access times and referring website addresses. This information is used for the operation of the service, to maintain quality of the service, and to provide general statistics regarding use of the "Tunes Liberia"(Mobile App)  website. </Text>

            <Text style={styles1.textHead}>Security of your Personal Information </Text>
            <Text style={styles1.text}>"Tunes Liberia"(Mobile App) secures your personal information from unauthorized access, use, or disclosure. "Tunes Liberia"(Mobile App)  uses the following methods for this purpose: </Text>

            <View style={styles1.outerView}>
                <View style={styles1.innerView1}>
                    <Icon type='Octicons' name='dash' style={{ color:'#fff', marginStart: 10 }}/>
                </View>
                <View style={styles1.innerView2}>
                    <Text style={[styles1.text, {paddingTop: 0}]}>SSL Protocol </Text>
                </View>
            </View>
            <Text style={styles1.text}>When personal information (such as a credit card number) is transmitted to other websites, it is protected through the use of encryption, such as the Secure Sockets Layer (SSL) protocol.</Text>
            <Text style={styles1.text}>We strive to take appropriate security measures to protect against unauthorized access to or alteration of your personal information. Unfortunately, no data transmission over the Internet or any wireless network can be guaranteed to be 100% secure. As a result, while we strive to protect your personal information, you acknowledge that: (a) there are security and privacy limitations inherent to the Internet which are beyond our control; and (b) security, integrity, and privacy of any and all information and data exchanged between you and us through this Site cannot be guaranteed.</Text>

            <Text style={styles1.textHead}>Children Under Thirteen </Text>
            <Text style={styles1.text}>"Tunes Liberia"(Mobile App)  does not knowingly collect personally identifiable information from children under the age of thirteen. If you are under the age of thirteen, you must ask your parent or guardian for permission to use this website.</Text>

            <Text style={styles1.textHead}>E-mail Communications </Text>
            <Text style={styles1.text}>From time to time, "Tunes Liberia"(Mobile App)  may contact you via email for the purpose of providing announcements, promotional offers, alerts, confirmations, surveys, and/or other general communication. </Text>
            <Text style={styles1.text}>If you would like to stop receiving marketing or promotional communications via email from "Tunes Liberia"(Mobile App) , you may opt out of such communications by Unsubscribe.</Text>

            <Text style={styles1.textHead}>External Data Storage Sites</Text>
            <Text style={styles1.text}>We may store your data on servers provided by third party hosting vendors with whom we have contracted. </Text>

            <Text style={styles1.textHead}>Changes to this Statement </Text>
            <Text style={styles1.text}>"Tunes Liberia"(Mobile App)  reserves the right to change this Privacy Policy from time to time. We will notify you about significant changes in the way we treat personal information by sending a notice to the primary email address specified in your account, by placing a prominent notice on our site, and/or by updating any privacy information on this page. Your continued use of the Site and/or Services available through this Site after such modifications will constitute your: (a) acknowledgment of the modified Privacy Policy; and (b) agreement to abide and be bound by that Policy.</Text>

            <Text style={[styles1.text, {paddingBottom:10}]}>Effective as of February 22, 2020 </Text>
        </View>
        </Content>
      </Container>
    );
  }
}

const styles1 = StyleSheet.create({
    text: {
        fontSize: 15,
        color: '#fff',
        paddingTop: 10
    },
    textHead: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
        paddingTop: 15
    },
    outerView:{
        justifyContent:'center',
        flexDirection:'row',
        paddingTop: 10
    },
    innerView1: {
        flex: 0.3,
        justifyContent:'center',
    },
    innerView2: {
        flex: 2,
        justifyContent:'center',
    }
})
