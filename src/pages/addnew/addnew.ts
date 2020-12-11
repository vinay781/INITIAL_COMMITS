import {Component} from '@angular/core';
import {AlertController, LoadingController, Nav, ToastController,NavParams,NavController,Platform} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators, AbstractControl} from "@angular/forms";
import {VotePage} from "../../pages/vote/vote";
import {VoteRecordedPage} from "../../pages/vote-recorded/vote-recorded";
import {PostsubmitedPage} from "../../pages/postsubmited/postsubmited";
import {TabsPage} from '../../pages/tabs/tabs';
import { Keyboard } from '@ionic-native/keyboard';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {File} from '@ionic-native/file';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import {FilePath} from '@ionic-native/file-path';
@Component({
  selector: 'page-addnew',
  templateUrl: 'addnew.html'
})
export class AddNewPage {  category: any;
  user_id: any;
  loader: any;
  formgroup: FormGroup;
  formCategory: AbstractControl;
  formTitle: AbstractControl;
  formDispute: AbstractControl;
  formQuestion:AbstractControl;
  post_type: AbstractControl;

 // document: File = null ;
  newFileName:any ;
  attechmenterror = null ;
  filename : any ;
  filesize : any ;
  pagehead = false ;
  passid : any ;
  path:any

  constructor(public http: HttpClient, private alertCtrl: AlertController, public formbuilder: FormBuilder, private toastController: ToastController, private loadingController: LoadingController,public toastCtrl: ToastController,public navParams: NavParams,public navctrl: NavController,private keyboard: Keyboard,public nav:Nav,private camera: Camera, public transfer: Transfer, public file: File, public filePath: FilePath,public platform:Platform) {
    this.keyboard.disableScroll(false);
    this.keyboard.hideKeyboardAccessoryBar(false);

     if(this.navParams.get("fromhome"))
   {
     this.pagehead= true ;
     console.log("fromhome");
   }
   if(this.navParams.get("fromtab"))
   {
     this.pagehead= false ;
     console.log("fromhome");
   }
    this.initCategory();
    this.user_id = localStorage.getItem('id');
    this.initFormGroup();
  }

  ionViewWillEnter(){
    this.keyboard.hideKeyboardAccessoryBar(false);
  
  }

  private initFormGroup() {
    this.formgroup = this.formbuilder.group({
      formCategory: ['', Validators.required],

      formTitle: ['', Validators.required],
      formQuestion:['', Validators.required],
      formDispute: ['', Validators.required],
      //post_type: ['', Validators.required],
      post_type: [false,],

    });
    this.formCategory = this.formgroup.controls['formCategory'];
    this.formTitle = this.formgroup.controls['formTitle'];
    this.formQuestion=this.formgroup.controls['formQuestion']
    this.formDispute = this.formgroup.controls['formDispute'];
    this.post_type = this.formgroup.controls['post_type'];
  }


  private initCategory() {
    this.showLoading();
    this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/categories').subscribe(res => {
      if (res) {
        this.category = res;
        this.category.splice(0,1)
        this.hideLoading();
      }
    }, (err) => {
      console.log(err);
      this.hideLoading();
    });
  }

 

  showWorkingAlert() {
    let alert = this.alertCtrl.create({
      title: 'Update',
      subTitle: 'Currently work in progress for this',
      buttons: ['Dismiss']
    });
    alert.present()
  }

  async showLoading() {
    this.loader = await this.loadingController.create({content: 'Loading...'});
    return await this.loader.present();

  }

  hideLoading() {
    this.loader.dismiss();
  }

  async presentToastWithOptions(mess) {
    const toast = await this.toastController.create({
      message: mess,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

  //  onFileChanged(event) {
  //   this.document = <File>event.target.files[0] ;
  //   this.filename=this.document.name;
  //   this.filesize=(this.document.size/1024).toFixed(2);
  //   this.getnewname(this.document.name); 
  // }

   cancelattechment(){
   // this.document= null ;
    this.newFileName = null;
    this.attechmenterror = null ;
    this.filename = null ;
    this.filesize = null ;
    this.newFileName=null;
    this.path=null;
  }

  getnewname(val)
  {
   var array=  val.split(".");
    // console.log(filename[1]);
     var d = new Date();
     var  n = d.getTime();
      this.newFileName = "image_" + n + '.'+ array[array.length-1]  ;
    // return newFileName.trim();
    //this.isAttechmentValid(array[array.length-1]);
    console.log(this.newFileName);
 }

  // isAttechmentValid(val){
  //   console.log(val,"val")
  //     if(val=="mp4"||val=="avi"||val=="flv"||val=="gif"||val=="mpeg-4"||val=="wmv"||val=="mov"){
  //      if(this.document.size <= 9000000){
  //        this.attechmenterror= null ;    
  //      }
  //      else{
  //       this.attechmenterror= null ;
  //      }
  //    }
  //    else{
  //      if(val=="png"||val=="jpeg"||val=="jpg"){
  //        if(this.document.size <= 1000000){
  //          this.attechmenterror= null ;    
  //        }
  //        else{
  //         this.attechmenterror= null ;
  //        }
  //      }
  //      else{
  //        this.attechmenterror="Upload Only Images Or Videos";
  //      }
  //    }
  // }

  async postdispute(data) {
   
    let value;
    console.log(data.post_type);
    if (data.post_type) {
      value = 1;
    } else {
      value = 0;
    }
    console.log(data.post_type,value);
    this.showLoading();
    console.log(value);

    this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/addNewDisputes?user_id=' + this.user_id + '&cat_id=' + data.formCategory + '&title=' + data.formTitle + '&description='+data.formDispute+'&file='+this.newFileName+'&is_anonymous=' + value + '&dispute_que='+ data.formQuestion)
      .subscribe(res => {
        this.passid=res[0].id;
        console.log("addnewdispute",this.passid);
        if(res){
        if((!this.newFileName)){ 
          this.hideLoading();
          this.formgroup.reset()
         this.navctrl.push(PostsubmitedPage,{disid:this.passid});
        }else{
          const uploadData = new FormData();
          //uploadData.append('file', this.document , this.newFileName);
          this.uploadImage();        
          // this.http.post('http://rezolve.betaplanets.com/rezolve/welcome',uploadData).subscribe(res =>  {
          //   this.hideLoading();
          //   console.log(res)
          //   this.navctrl.push(PostsubmitedPage,{disid:this.passid});
          //   this.presentToastWithOptions('Dispute Added Successfully..');
            
          // },err=>{

          //   console.log(err)
          //   this.hideLoading();
          //   this.navctrl.setRoot(PostsubmitedPage,{disid:this.passid});

          // });
        }
         
        }
            
      }, (err) => {
        this.hideLoading();
        this.presentToastWithOptions('An error occured, please try again.');
        console.log(err);
      });

    
  

  }

  inputclick(){
    console.log("click input")
  }

  onAddAttachment() {
    console.log("onAddAttch");
    this.showWorkingAlert()
  }
  public previosPage() {
      var back=localStorage.getItem('back')
    console.log(back,"value of back")
    if(back=='2'){
      this.nav.pop();
       console.log(back,"value of back")
      localStorage.removeItem('back')
    }else{
      this.nav.setRoot(TabsPage);
      localStorage.removeItem('back')      
    }
  // this.navctrl.setRoot(TabsPage);
  }

    ionViewDidLeave(){
    console.log('ionViewDidLeave')
    localStorage.removeItem('back')
  }
  
     public selectImage() {
  // Create options for the Camera Dialog
  var options = {
    quality: 40,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum: false,
    correctOrientation: true,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    
    if (this.platform.is('android')) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
           
          var path = correctPath +''+currentName ;
          var filename = this.createFileName();
          this.newFileName=filename
           this.path=path;
         // this.uploadImage(filename , path );
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      //~ this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      
      var path = correctPath +''+currentName ;
          var filename = this.createFileName();
          this.newFileName=filename
          this.path=path;
          //this.uploadImage(filename , path );
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

  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return this.file.dataDirectory + img;
    }
  }


  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }


  public uploadImage() {
    var options = {
      fileKey: "file",
      fileName: this.newFileName,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {'fileName': this.newFileName}
    };

    const fileTransfer: TransferObject = this.transfer.create();
    fileTransfer.upload(this.path, 'http://rezolve.betaplanets.com/rezolve/welcome/uploadAttachment', options).then(data => {
       this.hideLoading();
       this.formgroup.reset()
       this.newFileName=null;
       this.path=null;
     // this.presentToast('Image successfully uploaded');
      this.navctrl.push(PostsubmitedPage,{disid:this.passid});
    }, err => {
      this.hideLoading();
      
      this.presentToast('Error while uploading file.');
      this.formgroup.reset()
      this.newFileName=null;
      this.path=null;
      this.navctrl.push(PostsubmitedPage,{disid:this.passid});
    });
  }

}
                                         
                                          
