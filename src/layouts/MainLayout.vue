<template>
  <q-layout view="lHh lpR fFf" class="bg-secondary">

    <q-header bordered class="bg-secondary text-white topbar">
      <div class="row">
        <div class="col-8">
          <q-toolbar>
            <!-- <q-btn dense flat round icon="menu" @click="left = !left" class="lt-md" /> -->
            <q-toolbar-title class="text-weight-bold">
              <span class="gt-sm">{{ $route.name }}</span>
              <q-icon name="fas fa-cat" size="md" color="primary" class="lt-md" />
            </q-toolbar-title>
          </q-toolbar>
        </div>
        <div class="col searchbox">
          <q-input square filled dark placeholder="Search">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" class="sidebar gt-sm">
      <q-icon name="fas fa-cat" size="lg" color="primary" class="q-pa-md" />
      <q-list>
        <q-item to="/" clickable  exact>
          <q-item-section avatar class="q-ml-md">
            <q-icon name="fas fa-home" size="md" />
          </q-item-section>
          <q-item-section class="text-h6 text-weight-bolder">Home</q-item-section>
        </q-item>
        <q-item to="/profile" clickable  exact>
          <q-item-section avatar class="q-ml-md">
            <q-icon name="fas fa-user" size="md" />
          </q-item-section>
          <q-item-section class="text-h6 text-weight-bolder">Profile</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-footer bordered class="lt-md text-white footer">
        <div class="row">
          <div class="col-3">
            <q-item to="/" clickable  exact>
              <q-item-section avatar class="q-ml-md">
                <q-icon name="fas fa-home" size="md" class="footer-icon" />
              </q-item-section>
            </q-item>
          </div>
          <div class="col-3">
            <q-item to="/profile" clickable  exact>
              <q-item-section avatar class="q-ml-md">
                <q-icon name="fas fa-user" size="md" class="footer-icon" />
              </q-item-section>
            </q-item>
          </div>
        </div>
    </q-footer>

    <q-page-container class="text-white">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: false
    }
  }
}
</script>

<style lang="sass">
::-webkit-scrollbar 
    background: rgb(18, 18, 18)
    width: 10px

::-webkit-scrollbar-thumb 
    background: #00ffe7

.sidebar
  aside
    background-color: #1D1D1D
    border-right: solid 1px #00FFE7
    color: white
    position: fixed

.topbar
  border-bottom: solid 1px #00FFE7

.footer
  background-color: #1D1D1D
  border-top: solid 1px #00FFE7
  color: white
  position: fixed

.footer-icon
  position: absolute
  left: 50%
  transform: translateX(-50%)

.searchbox
  border-left: solid 1px #00FFE7
</style>


