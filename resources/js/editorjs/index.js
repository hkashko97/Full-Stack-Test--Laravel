import EditorJS from '@editorjs/editorjs';
import AddGif from './tools/add-gif.tool';
import PasteURL from './tools/paste-url.tool';


let editedData = (document.getElementById("content").value !== null && document.getElementById("content").value !== "") ? JSON.parse(document.getElementById("content").value) : {};
const editor = new EditorJS({
	/** 
	 * Id of Element that should contain the Editor 
	 */
	holder: 'editorjs',

	/** 
	 * Available Tools list. 
	 * Pass Tool's class or Settings object for each Tool you want to use 
	 */

	autofocus: false,
	tools: {
		image: {
			class: AddGif,
			inlineToolbar: false,
			config: {
				placeholder: ''
			}
		},
		url: {
			class: PasteURL,
			inlineToolbar: false,
			config: {
				placeholder: ''
			}
		}
	},
	data: editedData
});



// Search for gif API
function getUserInput() {
	var inputValue = document.querySelector(".search-for-gif").value;
	return inputValue;
}


document.querySelector(".search-for-gif").addEventListener("keyup", function (e) {
	// If the Key Enter is Pressed 
	if (e.which === 13) {
		var userInput = getUserInput();
		searchGiphy(userInput);
	}
});



function searchGiphy(searchQuery) {
	var url = "http://localhost:1234/api/gif/search?searchKey=" + searchQuery; 

	var container = document.querySelector(".all-gifs-results");

	container.innerHTML = `
	<div role="status" style="display:flex; justify-content:center; align-items:center; margin-top:100px">
    <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
	</div>
	`;


	fetch(url)
	.then(res => {
		return res.json()
	})
	.then(result => {
		pushToDOM(result);
	})
	.catch(err => {
		console.log(err);
	})
}

function pushToDOM(images) {

	console.log(images,'images');
	// Find the container to hold the response in DOM
	var container = document.querySelector(".all-gifs-results");

	// Clear the old content since this function 
	// will be used on every search that we want
	// to reset the div
	container.innerHTML = "";

	// Loop through data array and add IMG html
	images.forEach(function (image) {

		// Find image src
		var src = image.url;

		// Concatenate a new IMG tag
		container.innerHTML += "<div class='col-3 single-gif pt-2 mt-2' data-url='" + src + "'><div class='image-container'><img src='"
				+ src + "' class='container-image' loading='lazy'/></div></div>";
	});
	const allGifs = document.querySelectorAll('.single-gif');

	allGifs.forEach(gif => {
		gif.addEventListener('click', function handleClick() {
			let selectedUrl = this.getAttribute('data-url');

			const allSelectedGifs = document.querySelectorAll('.single-gif');
			allSelectedGifs.forEach(SelectedGif => {
				//  Remove class from each element
				SelectedGif.classList.remove('gif-selected');
			});

			this.classList.add('gif-selected');
			document.getElementById('add-gif-tool').innerHTML = '<img src="' + selectedUrl + '">';
			editor.save().then((savedData) => {
				console.log("savedData in select", savedData);
			});
		});
	});
}


// insert the selected gifs into editor 
const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', () => {

	editor.save().then((savedData) => {
		document.getElementById('content').innerHTML = JSON.stringify(savedData);
		document.getElementById('gifs-popup').style.display = 'none';
		// empty search for gif input and remove old result
		document.querySelector(".search-for-gif").value = '';
		document.querySelector(".all-gifs-results").innerHTML = '';
		// remove inner input if we didn't select gif
		let innerInput = document.getElementById('add-gif-tool').querySelector('input');
		if (innerInput !== null && innerInput !== undefined) {
			innerInput.remove();
		}
	});
});

// Add the content to the hidden textare in order to save it to the database
document.getElementById('submit-article').addEventListener('click', () => {
	editor.save().then((savedData) => {
		document.getElementById('content').innerHTML = JSON.stringify(savedData);
		document.getElementById('gifs-popup').style.display = 'none';
	});
});