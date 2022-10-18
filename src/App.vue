<template>
    
    <div class="container">
     <div class="d-flex justify-content-center">
    <h1 class="mt-5">IronContacts</h1> 
    </div>
    <div class="d-flex justify-content-center">
      <button @click="addContact()" class="btn btn-info mx-3 my-5">Add Random</button>
      <button @click="sortName()" class="btn btn-success mx-3 my-5">Sort by Name</button>
      <button @click="sortPopularity()" class="btn btn-warning mx-3 my-5">Sort by Popularity</button>
    </div>
    <div class="table-responsive d-flex justify-content-center" >
      <table class="table table-striped align-middle text-center">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>  
          <tr v-for="(contact, index) in contactsToRender" :key="index">
              <td><img :src="contact.pictureUrl" class="img-fluid" style="width: 100px" /></td>
              <td>{{contact.name}}</td>
              <td>{{contact.popularity}}</td>
              <td><i v-if="contact.wonOscar" class="fad fa-trophy"></i></td>
              <td><i v-if="contact.wonEmmy" class="fad fa-trophy"></i></td>
              <td><button @click = "removeContact(contact.name)"  class="btn btn-dark">Delete</button></td>
            </tr>
        </tbody>    
      </table>      
    </div>
    <Modal v-show="showModal" @close-modal="showModal = false" />
  </div>
</template>
<script setup>
import contacts from "./contacts.json";
import {ref} from 'vue'
import Modal from './components/Modal.vue'

const contactsToRender = ref(contacts.slice(0,5))
const contact = ref(undefined)
const contactsLeft = ref(contacts.slice(5, contacts.length))
const showModal= ref(false);


const addContact = () =>{
  if (contactsLeft.value.length > 0){
    contact.value = contactsLeft.value[Math.floor(Math.random() * contactsLeft.value.length)]   
    contactsToRender.value.push(contact.value);  
    let key = contactsLeft.value.findIndex((e)=> e == contact.value)
    contactsLeft.value.splice(key ,1)
  }else{
    showModal.value = true;
  }
}

const removeContact = (name) =>{
  contact.value =  contacts.find((e)=> e.name == name)  
  let key = contactsToRender.value.findIndex((e)=> e == contact.value)
  contactsToRender.value.splice(key ,1)
  contactsLeft.value.push(contact.value); 
}

const sorted = (sorting, direction="asc") => {
 
  contactsToRender.value = contactsToRender.value.sort( (curr, prev) =>{
    if (direction == "asc"){
      return curr[sorting] > prev[sorting] ?  1 : -1
    }else{
      return curr[sorting] > prev[sorting] ?  -1 : 1
    }
  });  
}

const sortName = () => sorted("name");
const sortPopularity= () => sorted("popularity", "desc");

</script>
<style scoped>
</style>
