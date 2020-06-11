/*
* @Author: @vedatbozkurt
* @Date:   2020-05-08 02:43:56
* @Last Modified by:   @vedatbozkurt
* @Last Modified time: 2020-05-13 16:50:19
*/
import {observable,computed,action} from 'mobx';
import axios from 'axios';
// import { AsyncStorage } from 'react-native';


class LoginStore {
  @observable email = '';
  @observable password = '';
  @observable name = '';
  @observable password_confirmation = '';
  @observable token = null;
  @observable loginSnackbar = false;
  @observable logutSnackbar = false;
  @observable registerSnackbar = false;
  @observable updateProfileSnackbar = false;
  @observable loading = false;
  @observable errors = {};

  @observable menu = false;

  @action _openMenu(){ this.menu = true; }
  @action _closeMenu(){ this.menu = false; }

  @action handleEmail(text){this.email = text;}
  @action handlePassword(text){this.password = text;}
  @action handlePasswordC(text){this.password_confirmation = text;}
  @action handleName(text){this.name = text;}

  @action onDismissLoginSnackbar(){this.loginSnackbar = false;}
  @action onDismissLogutSnackbar(){this.logutSnackbar = false;}
  @action onDismissRegisterSnackbar(){this.registerSnackbar = false;}
  @action onDismissUpdateProfileSnackbar(){this.updateProfileSnackbar = false;}

  @action logOut = async () => {
         this.name = null;
         this.email = null;
         this.password = null;
         this.token = null;
         this.logutSnackbar = true;
  }

   @action async login() {
    this.loading = true;
    let formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.password);

    let uri = 'https://wedat.org/lavu/api/v1/login';
    await axios.post(uri, formData)
    .then((response) => {
      // AsyncStorage.setItem('@role', '1');
      //AsyncStorage.setItem('@token', response.data.data.token);
      this.token = response.data.data.token;
      this.loginSnackbar = true;
    })
    .catch(error => {
      alert('Login failed')
    });
      this.loading = false;
  }

  @action async register() {
    this.loading = true;
    let formData = new FormData();
    formData.append('email', this.email);
    formData.append('name', this.name);
    formData.append('password', this.password);
    formData.append('password_confirmation', this.password_confirmation);

    let uri = 'https://wedat.org/lavu/api/v1/register';
    await axios.post(uri, formData, {headers: {"Accept": "application/json"}})
    .then((response) => {
      //console.log(response.data.data.token);
      this.token = response.data.data.token;
      this.registerSnackbar = true;

    })
    .catch(error => {
      this.errors = error.response.data.data;
      //console.log(error.response.data.data.email[0]);
      //alert('Register failed')
    });
    this.loading = false;
    this.email = '';
    this.name = '';
    this.password = '';
    this.password_confirmation = '';
  }

  @action async getUser() {
    this.errors = '';
    this.loading = true; //loading iconu göster && uye bilgi formu
    let uri = 'https://wedat.org/lavu/api/v1/user';
    await axios.get(uri, {headers: {
    'Accept': 'application/json' ,
    'Authorization': `Bearer ${this.token}`}})
    .then((response) => {
      //console.log(response.data);
      //console.log('basarili');
      this.name = response.data.data.name;
      this.email = response.data.data.email;
    })
    .catch(error => {
      console.log(error);
      console.log('Login failed');
    });
      this.loading = false;
  }

  @action async updateProfile() {
    this.loading = true;
    let formData = new FormData();
    formData.append('email', this.email);
    formData.append('name', this.name);
    if (this.password) {formData.append('password', this.password);}

    let uri = 'https://wedat.org/lavu/api/v1/user';
    await axios.post(uri, formData, {headers: {
    'Accept': 'application/json' ,
    'Authorization': `Bearer ${this.token}`}})
    .then((response) => {
      //console.log(response);
      this.errors = '';
      this.updateProfileSnackbar = true;

    })
    .catch(error => {
      //console.log(error.response.data.errors);
      this.errors = error.response.data.errors;
      //this.errors = error.response.data.data;
    });
    this.loading = false;
  }

  @computed get getToken() {
     return ;
}


}
export default new LoginStore()
