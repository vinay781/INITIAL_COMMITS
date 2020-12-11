import React, { Component } from 'react';
import {Router,Scene, Modal, Tabs} from 'react-native-router-flux';
import Auth from './container/Auth';
import SignIn from  './container/SignIn' ;
import SignUp from  './container/SignUp' ;
import Home from './container/Home';
import Profile from './container/Profile';
import Settings from './container/Settings';
import Playlist from './container/Playlist';
import Library from './container/Library';
import Buzz from './container/Buzz';
import BuzzPreview from "./container/BuzzPreview"
import Notification from './container/Notification';
import Search from './container/Search';
import EditProfile from  './container/EditProfile';
import ChangePassword from  './container/ChangePassword';
import ForgotPassword from './container/ForgotPassword';
import SeeAll from  './container/SeeAll';
import FullView from  './container/FullView';
import SelectPlaylist from  './container/SelectPlaylist';
import PurchaseSong from  './container/Payment/PurchaseSong';
import TermsAndConditions from  './container/Payment/TermsAndConditions';
import Downloads from  './container/Library/Downloads';
import Favourites from  './container/Library/Favourites';
import MyPlaylists from  './container/Library/MyPlaylists';
import MyPlaylistSongs from  './container/Library/MyPlaylistSongs';
import Videos from  './container/Library/Videos';
import LandingScreen from "./react/screens/LandingScreen";
import PlaylistScreen from "./react/screens/PlaylistScreen";
import VideoPlayer from "./container/VideoPlayer";
import OurPlans from './container/Payment/OurPlans';
import Plus from './container/Payment/Plus';
import Premium from './container/Payment/Premium';
import PaymentWithVisa from './container/Payment/PaymentWithVisa';
import AlbumView from './container/Album/AlbumView';
import AlbumMain from './container/Album/AlbumMain';
import GenresView from './container/Genres/GenresView';
import VideosView from './container/Videos/VideosView';
import NewReleasesView from './container/NewReleases/NewReleasesView';
import FreeMusicView from './container/FreeMusic/FreeMusicView';
import ArtistListView from './container/Artist/ArtistListView';
import ArtistView from './container/Artist/ArtistView';
import About from './container/About';
import MyAccount from './container/MyAccount';
import Privacypolicy from './container/Privacypolicy';
import ContactUs from './container/ContactUs';
import SongsQueList from './container/SongsQueList';
import PlaylistCategoryView from './container/FeaturedPlaylist/PlaylistCategoryView';
import PlaylistViewlist from './container/FeaturedPlaylist/PlaylistViewlist';

const Routes = () => (
<Router>
   <Scene hideNavBar={true}>
      <Scene key="auth">
        <Scene key="login" component={SignIn} hideNavBar />
      </Scene>  
      <Scene key="signup" component={SignUp} title="SignUp" hideNavBar={true}  /> 
      <Scene key="downloads" component={Downloads} title="" hideNavBar={true}/>        
      <Scene key="playlist" component={Playlist} title="" hideNavBar={true}/>  
      <Scene key="profile" component={Profile} title="" hideNavBar={true}/>   
      <Scene key="settings" component={Settings} title="" hideNavBar={true}/>             
      <Scene key="buzz" component={Buzz} title="" hideNavBar={true}/>    
      <Scene key="buzzpreview" component={BuzzPreview} title="" hideNavBar={true}/>        
      <Scene key="library" component={Library} title="" hideNavBar={true}/>  
      <Scene key="notification" component={Notification} title="Notification"/> 
      <Scene key="editprofile" component={EditProfile} title="Edit Profile"/>    
      <Scene key="seeall" component={SeeAll} title="See All"/>    
      <Scene key="about" component={About} title="About"/>    
      <Scene key="myaccount" component={MyAccount} title="MyAccount"/>
      <Scene key="privacypolicy" component={Privacypolicy} title="Privacypolicy"/>
      <Scene key='contactus' component={ContactUs} title="ContactUs"/>        
      <Scene key="albumview" component={AlbumView} title="AlbumView"/> 
      <Scene key="albummain" component={AlbumMain} title="AlbumMain"/>        
      <Scene key="genresview" component={GenresView} title="GenresView"/>       
      <Scene key="videosview" component={VideosView} title="VideosView"/>   
      <Scene key="newreleasesview" component={NewReleasesView} title="NewReleasesView"/>       
      <Scene key="freemusicview" component={FreeMusicView} title="FreeMusicView"/>         
      <Scene key="artistlistview" component={ArtistListView} title="ArtistListView"/>     
      <Scene key="artistview" component={ArtistView} title="ArtistView"/>     
      <Scene key="songsquelist" component={SongsQueList} title="SongsQueList"/>         
      <Scene key="playlistcategoryview" component={PlaylistCategoryView} title="PlaylistCategoryView"/>  
      <Scene key="playlistviewlist" component={PlaylistViewlist} title="PlaylistViewlist"/>  
      <Scene key="fullview" component={FullView} title="FullView"/>     
      <Scene key="videoplayer" component={VideoPlayer} title="Video Player"/> 
      <Scene key="favourites" component={Favourites} title="Favorite"/>        
      <Scene key="myplaylists" component={MyPlaylists} title="My Playlists"/> 
      <Scene key="selectplaylist" component={SelectPlaylist} title="Select Playlist"/> 
      <Scene key="videos" component={Videos} title="Videos"/> 
      <Scene key="landingscreen" component={LandingScreen} title="Landing Screen"/>                           
      <Scene key="forgotpassword" component={ForgotPassword} title="Forgot Password"/>            
      <Scene key="changepassword" component={ChangePassword} title="Change Password"/> 
      <Scene key="ourplans" component={OurPlans} title="Our Plans"/>     
      <Scene key="plus" component={Plus} title="Plus"/>     
      <Scene key="premium" component={Premium} title="Premium"/>  
      <Scene key="paymentwithvisa" component={PaymentWithVisa} title="PaymentWithVisa" />
      <Scene key="purchase" component={PurchaseSong} title="Pay"/>     
      <Scene key="terms" component={TermsAndConditions} title="TermsAndConditions"/>      
      <Scene key="myplaylistsong" component={MyPlaylistSongs} title="" hideNavBar={true}/>       
      <Scene key="search" component={Search} title="" hideNavBar={true}/>  
      <Scene key="home" component={Home} title="" hideNavBar={true} />  
      <Modal>
        <Scene key="playlistscreen" component={PlaylistScreen} title="" hideNavBar={true}/>                  
      </Modal>          
      <Scene key="checkauth"  
        initial={true} 
        component={Auth} 
        hideNavBar 
      />        
   </Scene>
</Router>     
)
export default Routes ;