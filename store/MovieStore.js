/*
* @Author: @vedatbozkurt
* @Date:   2020-05-08 02:43:56
* @Last Modified by:   @vedatbozkurt
* @Last Modified time: 2020-05-13 16:49:44
*/
import {observable,computed,action} from 'mobx';
import axios from 'axios';

class MovieStore {
    @observable info = false;
    @observable loading = true;
    @observable snackbar = false;
    @observable movie1 = {};
    @observable movie2 = {};
    @observable rated = {};
    @observable movie1rating ='';
    @observable movie2rating ='';
    @observable opacity1 = 1;
    @observable opacity2 = 1;
    @observable border1 = 0;
    @observable border2 = 0;


    @action onDismissSnackBar(){
     this.snackbar = false;
    }

    @action showDialog(){
     this.info = true;
   }
    @action hideDialog(){
     this.info = false;
    }

    @action getMovies() {
        this.loading = true;
        axios.get('https://wedat.org/lavu/api/v1/ratemovies')
        .then(res => {
          const movie1 = res.data[0];
          const movie2 = res.data[1];
          this.movie1=movie1;
          this.movie2=movie2;
          const rating1 = Math.round(((this.movie1.vote)/(this.movie1.view))*100)
          const rating2 = Math.round(((this.movie2.vote)/(this.movie2.view))*100)
          this.movie1rating=rating1;
          this.movie2rating=rating2;
          this.opacity=1;
          this.border=0;
          this.loading=false;
      })
    }

    @action rateMovie(rated,viewed,sira) {
        this.changeStyle(sira);
        this.rated.rated = rated; //oy alan
        this.rated.viewed = viewed; //goruntulenen
        let uri = `https://wedat.org/lavu/api/v1/ratemovies`;
        axios.post(uri, this.rated).then((response) => {
          this.snackbar=true;
          this.getMovies();
          this.refreshStyle();
      })
        .catch(error => {
          alert('hata'+error);
      });
    }

    @action changeStyle(movieid){
        if(movieid===1){
          this.opacity1=.7;
          this.border1=2;
      }else{
          this.opacity2=.7;
          this.border2=2;
      }
  }

  @action refreshStyle(){
      this.opacity1=1;
      this.border1=0;
      this.opacity2=1;
      this.border2=0;
  }

  @computed get opacity1Style() {
     return {
       opacity: this.opacity1,
       flex:1,
       borderColor: "red",
       borderLeftWidth: this.border1,
       borderRightWidth: this.border1,
   }
}

@computed get opacity2Style() {
 return {
   opacity: this.opacity2,
   flex:1,
   borderColor: "red",
   borderRightWidth: this.border2,
   borderLeftWidth: this.border2
}
}



}
export default new MovieStore()
