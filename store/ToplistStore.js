/*
* @Author: @vedatbozkurt
* @Date:   2020-05-08 02:43:56
* @Last Modified by:   @vedatbozkurt
* @Last Modified time: 2020-05-13 16:50:39
*/
import React, {Component} from 'react';
import { Text, View } from 'react-native';
import {observable,computed,action} from 'mobx';
import axios from 'axios';

class ToplistStore {
    @observable loading = false;
    @observable fetching_from_server = false;
    @observable isListEnd = false;
    @observable movies = [];
    @observable offset = 1;



    @action getMoviess() {
        this.loading = true;
        axios.get('https://wedat.org/lavu/api/v1/movies')
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

    @action getMovies = () => {
    if (!this.fetching_from_server && !this.isListEnd) {
      this.fetching_from_server = true;
        axios.get('https://wedat.org/lavu/api/v1/movies?page=' + this.offset)
          .then(response  => {
            if (response.data.data.length > 0) {
              this.offset = this.offset + 1;
                this.movies = [...this.movies, ...response.data.data];
                this.fetching_from_server= false;
            } else {
                this.fetching_from_server= false;
                this.isListEnd= true;
            }
          })
          .catch(error => {
            console.error(error);
          });
    }
  };




}
export default new ToplistStore()
