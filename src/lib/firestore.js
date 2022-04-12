import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    onSnapshot,
    deleteDoc,
    updateDoc,
    arrayRemove, 
    arrayUnion,
  } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";


import { auth } from "./index.js";
  
export const db = getFirestore();

export const createPost = (title,description, price, materials) => {
    let userName;
      if (auth.currentUser.displayName === null) {
        userName = auth.currentUser.email;
      } else {
        userName = auth.currentUser.displayName;
      };
    addDoc(collection(db, 'post'), {
      title, 
      description, 
      userName,
      price,
      materials, 
      userId:auth.currentUser.uid,
      like:[],
      numberLike:0,
      date:Date(Date.now()), //cambiar por TIMESTAMP
        })
}


  export const getPost = id => 
    getDoc(doc(db, 'post', id ))
  
  
    
  export const onGetPost = (callback) => {
    onSnapshot(collection(db, 'post'), callback )
  }

  export const deletePost =  id =>{
    deleteDoc(doc(db, 'post', id));
  } 

  export const editPost = (id, newDescription) => 
  updateDoc(doc(db,'post', id) , newDescription)

  //dar like a post
  export const likePost = async (id, userId)=>{
   const postRef = doc(db,'post',id);
   const docLike = await getDoc(postRef);
   const dataLike = docLike.data();
  console.log(dataLike)
   const likesCount = dataLike.numberLike;
   if((dataLike.like).includes(userId)){
    await updateDoc(postRef,{
    like:arrayRemove(userId),
    numberLike: likesCount  -1,
    });
   }else{
     await updateDoc(postRef,{
      like:arrayUnion(userId),
      numberLike: likesCount  +1,
     });
   }
  }