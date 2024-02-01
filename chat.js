//ADD YOUR FIREBASE LINKS HERE
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDVohb-7dA2mXgq4vO98VdvCtPY3fHx538",
    authDomain: "kwitter-6bb36.firebaseapp.com",
    databaseURL:"https://kwitter-6bb36-default-rtdb.firebaseio.com/",
    projectId: "kwitter-6bb36",
    storageBucket: "kwitter-6bb36.appspot.com",
    messagingSenderId: "56006693520",
    appId: "1:56006693520:web:3f58be45aa8c81ae3dfe15",
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name=localStorage.getItem("user_name")
room_name=localStorage.getItem("room_name")

function send(){
msg=document.getElementById("msg").value
firebase.database().ref(room_name).push({
  name:user_name,message:msg,like:0
})
document.getElementById("msg").value=""
}
function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        //Start code
        console.log(firebase_message_id);
        console.log(message_data);
        name = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        n="<h4> "+name+"<img class='user_tick' src='tick.png'></h4>";
        m="<h4 class='message_h4'> "+message+"</h4>";
        b="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='update_like(this.id)'>";
        i="<span class='glyphicon glyphicon-thumbs-up'> like:"+like+"</span></button><hr>"; 
        x=n+m+b+i
        document.getElementById("output").innerHTML+=x

      }
    });
  });
}
getData();
function update_like(message_id)
{
console.log("cClick On Like Button"+message_id)
button_id=message_id
likes=document.getElementById(button_id).value
updated_likes=Number(likes)+1
firebase.database().ref(room_name).child(message_id).update({like:updated_likes})

}

function logout(){
localStorage.removeItem("user_name")
localStorage.removeItem("room_name")
window.location="index.html"

}