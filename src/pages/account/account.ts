import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  ToastController,
  Platform,
  LoadingController,
  Loading,Events,
} from 'ionic-angular';

import {File} from '@ionic-native/file';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import {FilePath} from '@ionic-native/file-path';
import {HttpClient} from '@angular/common/http';

import {Validators, FormBuilder, FormGroup, AbstractControl} from '@angular/forms';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {ChangepassPage} from "../../pages/changepass/changepass";
import moment from 'moment';
//@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  date_1:any;
  isplat:any=false;
  lastImage: string = null;
  loading: Loading;
  istrue=true;
  emailistrue=true;
  userId:any;
  userData:any={photo:''};
  isnotify = 0;
  mygroup: FormGroup;
  firstname: AbstractControl;
  name:any
  emailid:any;
  lastname: AbstractControl;
  email: AbstractControl;
  imageBaseUrl='http://rezolve.betaplanets.com/rezolve/assets/userprofile/';
  errormsg:any;
  buttonenable=true;
  emailerrormsg:any;
  // @ts-ignore
  // @ts-ignore
  constructor(public navCtrl: NavController, public navParams: NavParams, public adingCtrl: LoadingController, public toastCtrl: ToastController, private camera: Camera, public transfer: Transfer, public file: File, public filePath: FilePath, public actionSheetCtrl: ActionSheetController, public platform: Platform, public loadingCtrl: LoadingController, public http: HttpClient, private formBuilder: FormBuilder,public events:Events) {
    this.isplat=this.platform.is('ios');
    this.formvalidation();
    this.userId =localStorage.getItem('id');
    this.initUserData()
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  initUserData(){
    this.loadingfunction();
    this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/profileById?user_id='+this.userId)
      .subscribe(res => {
      if (res) {
        var date = new Date();
        this.userData=res[0];
         date=this.userData.joiningdate;
         //console.log(date);
        this.date_1=moment(date).format("MM/DD/YYYY");
         //console.log(this.date_1);
         this.date_1="Date Joined : "+this.date_1
        console.log("data "+JSON.stringify(res));
        localStorage.setItem('userimage', res[0].photo) ;
          localStorage.setItem('username',res[0].username) ;
          this.name=res[0].username
          this.emailid=res[0].email
          this.events.publish('user:created', res[0].photo, res[0].username);
        this.loading.dismissAll();
      }
    }, (err) => {
      console.log(err);
      this.loading.dismissAll()
    });
  }

  formvalidation() {
    // pattern="^[a-zA-Z][a-zA-Z\\s]+$"
    this.mygroup = this.formBuilder.group({
      // firstname: ['', Validators.compose([Validators.required,Validators.pattern("^([a-zA-Z]{1,}\\s[a-zA-z]{0,}'?-?[a-zA-Z]{1,}\\s?([a-zA-Z]{0,})?)")])],
      //  lastname: ['', Validators.compose([Validators.required,Validators.pattern("^([a-zA-Z]{1,}\\s[a-zA-z]{0,}'?-?[a-zA-Z]{1,}\\s?([a-zA-Z]{0,})?)")])],  
      firstname: ['', Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")])],
      lastname: ['', Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")])],  
      email: ['', Validators.compose([Validators.required, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')
      ])],
    });

    this.firstname = this.mygroup.controls['firstname'];
     this.lastname = this.mygroup.controls['lastname'];
    this.email = this.mygroup.controls['email'];


  }

  userupdate(value) {
    console.log(value,this.isnotify)
    this.loadingfunction();
    this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/updateUser?userid=' +this.userId+ '&firstname=' +value.firstname + '&lastname=' +value.lastname + '&username='+this.name+'&email='+value.email+'&is_notify=' + this.isnotify).subscribe(res => {
      if (res) {
        this.loading.dismissAll();
        console.log("data "+JSON.stringify(res));
        this.buttonenable=true;
        this.istrue=true;
        this.emailistrue=true;
        this.initUserData()

      }

    }, (err) => {
      console.log(err);
    });
  }

  notify() {
    if (this.isnotify) {
      this.isnotify = 0;
    } else {
      this.isnotify = 1;
    }
    console.log(this.isnotify);
  }

  changepassword(){
    this.navCtrl.push(ChangepassPage);
  }

  /* %%%%%%%%%%%%%%%%%%%%%%%% upload image/file %%%%%%%%%%%%%%%%%%%%%% */
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            console.log("handler called");
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

   public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 10,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          //~ this.copyFileToLocalDir(correctPath, currentName, this.createFileName());       
          var path = correctPath +''+currentName ;
          var filename = this.createFileName();
          this.uploadImage(filename , path );
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      //~ this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      
      var path = correctPath +''+currentName ;
          var filename = this.createFileName();
          this.uploadImage(filename , path );
    }
  }, (err) => {
    this.presentToast('Not selecting image.');
  });
}

  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = "image_" + n + ".jpg";
    return newFileName.trim();
  }

// Copy the image to a local folder
 /* private copyFileToLocalDir(namePath, currentName, newFileName) {
    console.log("file  newFileName " + newFileName);
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      console.log("file success " + this.lastImage +" "+namePath+" "+success.nativeURL);

      this.uploadImage(this.lastImage,success.nativeURL)
    }, error => {
      this.presentToast('Error while storing file. ');
    });
  }*/
// Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return this.file.dataDirectory + img;
    }
  }

// Copy the image to a local folder
  /*private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
          this.presentToast('selecting image.');

    }, error => {
      this.presentToast('Error while storing file.');
    });
  }*/

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

// Always get the accurate path to your apps folder
  /*public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
   */


  public uploadImage(filename,path) {

    var url = "http://rezolve.betaplanets.com/rezolve/upload.php";
    var apiUrl = "http://rezolve.betaplanets.com/rezolve/authservice/";
    // File for Upload
    // var targetPath = this.pathForImage(this.lastImage);

    // File name only
    // var filename = this.lastImage;

    this.http.get(apiUrl + 'updatePhoto?userid=' + this.userId + '&photo=' + filename).subscribe(data => {
      console.log("updatePhoto "+this.userId +JSON.stringify(data))
    });

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {'fileName': filename}
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loadingfunction();

    fileTransfer.upload(path, url, options).then(data => {
      this.loading.dismissAll();
      this.presentToast('Image successfully uploaded');
      this.resetuserdata();
    }, err => {
      this.loading.dismissAll();
      console.log("image error "+JSON.stringify(err));
      this.presentToast('Error while uploading file.');
    });
  }

  loadingfunction() {
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();
  }

  resetuserdata(){
   
    this.userData=[];
    this.initUserData();
  }
  editname(){
    this.buttonenable=!this.buttonenable;
    //this.istrue=!this.istrue;
   
  }
  inputFirstName(event){
  console.log("event",event)
  if(event.value==""){
  }
  }
 
}
