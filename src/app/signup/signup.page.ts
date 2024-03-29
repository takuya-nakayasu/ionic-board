import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
  signup: {
    email: string;
    password: string;
    name: string;
  } = {
    email: '',
    password: '',
    name: ''
  };

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {}

  signUp() {
    this.afAuth.auth
      .createUserWithEmailAndPassword(this.signup.email, this.signup.password)
      // ユーザー登録が成功したら then の中が実行される
      .then(created => {
        const newUser = created.user;
        newUser
          // 作成したユーザーに対して displaName を設定する
          .updateProfile({
            displayName: this.signup.name,
            photoURL: ''
          })
          // displayName の設定が完了したら
          .then(async () => {
            const toast = await this.toastCtrl.create({
              message: `${created.user.displayName}さんを登録しました`,
              duration: 3000
            });
            await toast.present();
          })
          .catch(async error => {
            const toast = await this.toastCtrl.create({
              message: error.toString(),
              duration: 3000
            });
            await toast.present();
          });
        this.goBack();
      })
      .catch(async error => {
        const toast = await this.toastCtrl.create({
          message: error.toString(),
          duration: 3000
        });
        await toast.present();
      });
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
