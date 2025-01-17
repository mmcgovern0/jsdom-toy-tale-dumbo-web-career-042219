const addBtn = document.querySelector('#new-toy-btn')
const addToyForm = document.querySelector('.add-toy-form')
const toyForm = document.querySelector('.container')

let addToy = false



// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})



let toyURL = 'http://localhost:3000/toys';

//get function
const get = (url) => {
	return fetch(url).then(resp => resp.json())
}

//post function
const post = (url, params) => {
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(params),
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	}).then(resp => resp.json()).catch(err => {
		console.error(err)
	})
}


//patch function


const patch = (url, params) => {
	return fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
		method: 'PATCH',
		body: JSON.stringify(params),
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	}).then(resp => resp.json()).catch(err => {
		console.error(err)
	})
}


// Dom Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', () => {
	// selectors
	const toyCollection = document.querySelector("#toy-collection");
	const likeBtn = document.querySelectorAll(".like-btn")

	// Read all toys - calling above get function
	get(toyURL).then(toyInfo => {
		toyInfo.forEach(toy => {
			toyCollection.innerHTML += `<div data-id="${toy.id}" class="card">
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p data-likes="${toy.likes}">${toy.likes} Likes </p>
    <button class="like-btn id="like">Like <3</button>
  </div>` 
		})
	})

	// Post New Toys
	addToyForm.addEventListener('submit', (e) => {
		e.preventDefault()
		post(toyURL, { 
			name: e.target.name.value,
			image: e.target.image.value,
			likes: 0
		}).then(newToy => {
			toyCollection.innerHTML += `<div data-id="${newToy.id}" class="card">
    		<h2>${newToy.name}</h2>
    		<img src="${newToy.image}" class="toy-avatar" />
    		<p data-likes="${newToy.likes}">${newToy.likes} Likes </p>
    		<button class="like-btn" id="like">Like <3</button>
 			</div>` 
			e.target.reset() 

		})
	})


	// // Patch Likes
	// likeBtn.forEach(likes => {
	// 	likes.addEventListener('click', (e) => {
	// 		e.preventDefault
	// 		patch(`http://localhost:3000/toys/${e.target.dataset.id}`, {

	// 		}).then()
	// 	})
	// })


	// add likes
	let likes = 0
	toyCollection.addEventListener('click', function(event){
		if (event.target.tagName === "BUTTON") {
			const buttonTag = event.target
			let likeTag = buttonTag.parentElement.querySelector('p')
			let updateLikes = parseInt(likeTag.dataset.likes)
			updateLikes++

			likeTag.dataset.likes = updateLikes

			likeTag.innerHTML = `${updateLikes} Likes`







		}
	})



	console.log('test');


});