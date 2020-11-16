<template>
  <div id="app">
    <Header></Header>
    <b-container>
      <b-row>
        <b-col md="4"><Sidenav/></b-col>
        <b-col md="8"><MovieList/></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from './components/Header'
import Sidenav from './components/Sidenav'
import MovieList from './components/MovieList'
export default {
  name: 'App',
  components: {
    Header,
    Sidenav,
    MovieList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
