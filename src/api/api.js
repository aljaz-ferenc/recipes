import { initializeApp} from "firebase/app";
import { collection, getDocs, getDoc, doc, getFirestore, query, where, setDoc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import {getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable} from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth()
const storage = getStorage()

export async function getUser(userId){
  const userRef = doc(db, 'users', userId)
  const docSnap = await getDoc(userRef)
  return docSnap.data()
}

export async function getAllRecipes() {
  const recipes = []
  const querySnapshot = await getDocs(collection(db, 'recipes'))
  querySnapshot.forEach(recipe => recipes.push({ ...recipe.data(), id: recipe.id }))
  return recipes
}

export async function getRecipeById(recipeId) {
  const docRef = doc(db, 'recipes', recipeId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) return docSnap.data()
}

export async function getFavorites(userId) {
  const docRef = doc(db, 'users', userId)
  const docSnap = await getDoc(docRef).catch(error => console.log(error))
  return docSnap.data().favorite_recipes
}

export async function getFavoriteRecipes(favorites) {
  if(favorites.lenght === 0) return
  const favoriteRecipes = [];
  const recipesRef = collection(db, 'recipes');
  const q = query(recipesRef, where('id', 'in', favorites));
  try {
    const querySnapshot = await getDocs(q);
    if(querySnapshot.empty) console.log('empty')
    querySnapshot.forEach((doc) => {
      favoriteRecipes.push(doc.data());
    });
  } catch (error) {
    console.error('Error getting recipes:', error);
  }
  return favoriteRecipes;
}

export async function addToFavorites(userId, recipeId) {
  const favoritesRef = doc(db, 'users', recipeId)
  await updateDoc(favoritesRef, {
    favorite_recipes: arrayUnion(userId)
  })
}

export async function removeFromFavorites(userId, recipeId) {
  const favoritesRef = doc(db, 'users', userId)
  await updateDoc(favoritesRef, {
    favorite_recipes: arrayRemove(recipeId)
  })
}

export async function addRecipe(recipeData) {
  await setDoc(doc(db, 'recipes', recipeData.id), {
    name: recipeData.name,
    description: recipeData.description,
    id: recipeData.id,
    ingredients: recipeData.ingredients,
    notes: recipeData.notes,
    steps: recipeData.steps,
    likes: 0,
    prepTime: recipeData.prepTime,
    cookTime: recipeData.cookTime,
    servings: recipeData.servings,
    authorId: recipeData.authorId,
    authorUsername: recipeData.authorUsername,
    date: new Date().getTime(),
    mealType: recipeData.mealType,
    cuisine: recipeData.cuisine,
    diet: recipeData.diet
  })
}

export async function createNewAccount(email, password) {
  let user = null
  let error = null
  await createUserWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      user = userCredentials.user
    })
    .catch(error => console.log(error.message))
  return user
}

export async function createUserDocument(id, username) {
  await setDoc(doc(db, 'users', id), { 
    favorite_recipes: [],
    liked_recipes: [] ,
    disliked_recipes: [],
    username: username,
    shopping_list: []
  })
}

export async function uploadImage(image, imageId){
  const storageRef = ref(storage, imageId)
  
  uploadBytes(storageRef, image)
    .then(snapshot => {
      console.log('uploaded')
    })
}

export async function getImageURL(imageName){
  const storage = getStorage();
  let imageUrl
  
await getDownloadURL(ref(storage, imageName))
  .then((url) => {
    imageUrl = url
  })
  .catch((error) => {
    console.log(error)
  });
  return imageUrl
}

export async function updateLikes(recipeId, value){
  const reicpeRef = doc(db, 'recipes', recipeId)

  await updateDoc(reicpeRef, {
    likes: value
  })
}

export async function addLikedRecipe(recipeId, userId){
  const userRef = doc(db, 'users', userId)
  await updateDoc(userRef, {
    liked_recipes: arrayUnion(recipeId)
  })
}

export async function removeLikedRecipe(recipeId, userId){
  const userRef = doc(db, 'users', userId)
  await updateDoc(userRef, {
    liked_recipes: arrayRemove(recipeId)
  })
}
export async function addDislikedRecipe(recipeId, userId){
  const userRef = doc(db, 'users', userId)
  await updateDoc(userRef, {
    disliked_recipes: arrayUnion(recipeId)
  })
}

export async function removeDislikedRecipe(recipeId, userId){
  const userRef = doc(db, 'users', userId)
  await updateDoc(userRef, {
    disliked_recipes: arrayRemove(recipeId)
  })
}

export async function getCommentsByRecipe(recipe){
  const comments = []
  const q = query(collection(db, 'comments'), where('recipeId', '==', recipe))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach(doc => {
    comments.push({...doc.data(), id: doc.id})
  })
  return comments
}

export async function postComment(comment, userId, commentId, username, recipeId) {
  await setDoc(doc(db, 'comments', commentId), {  
    authorId: userId,
    authorUsername: username,
    text: comment,
    id: commentId,
    recipeId: recipeId,
    date: new Date().getTime()
  })
}

export async function getRecipesByUser(userId){
  const recipes = []
  const q = query(collection(db, 'recipes'), where('authorId', '==', userId))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach(doc => {
    recipes.push({...doc.data(), id: doc.id})
  })
  return recipes
}

export async function removeShoppingItem(userId, item){
  const userRef = doc(db, 'users', userId)
  await updateDoc(userRef, {
    shopping_list: arrayRemove(item)
  })
}

export async function addShoppingItem(userId, item){
  const userRef = doc(db, 'users', userId)
  await updateDoc(userRef, {
    shopping_list: arrayUnion(item)
  })
}


// export async function signIn(email, password){
//   let user = null
//   let error1 = null
//   await signInWithEmailAndPassword(auth, email, password)
//     .then(userCreadentials => {
//       user = userCreadentials.user
//     })
//     .catch(error => error = error.message)
//     // return user || error
// }