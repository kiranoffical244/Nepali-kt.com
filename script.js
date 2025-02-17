document.addEventListener("DOMContentLoaded", () => {

    loadPosts();

});

let cropper;

let croppedImage = "";

function previewImage(event) {

    let image = document.getElementById("image-preview");

    let file = event.target.files[0];

    if (file) {

        let reader = new FileReader();

        reader.onload = function (e) {

            image.src = e.target.result;

            if (cropper) {

                cropper.destroy();

            }

            cropper = new Cropper(image, {

                aspectRatio: 1,

                viewMode: 1

            });

        };

        reader.readAsDataURL(file);

    }

}

function cropImage() {

    if (cropper) {

        croppedImage = cropper.getCroppedCanvas().toDataURL();

        cropper.destroy();

        document.getElementById("image-preview").src = croppedImage;

    }

}

function toggleForm() {

    let formContainer = document.getElementById("form-container");

    formContainer.style.display = formContainer.style.display === "none" ? "block" : "none";

}

function addPost() {

    let facebookLink = document.getElementById("facebook-link").value;

    let name = document.getElementById("name").value;

    let age = document.getElementById("age").value;

    let address = document.getElementById("address").value;

    let category = document.getElementById("category").value;

    if (!facebookLink || !name || !age || !address || !croppedImage) {

        alert("Please fill in all details!");

        return;

    }

    let postContainer = document.getElementById("post-container");

    let post = document.createElement("div");

    post.className = "post-card";

    post.innerHTML = `

        <img src="${croppedImage}" alt="Profile Pic">

        <h3><a href="${facebookLink}" target="_blank">${name}</a></h3>

        <p>Age: ${age}</p>

        <p>Address: ${address}</p>

        <p>Category: ${category}</p>

        <button class="delete-btn" onclick="deletePost(this)">Delete</button>

    `;

    postContainer.prepend(post);

    savePosts();

    clearForm();

}

function clearForm() {

    document.getElementById("facebook-link").value = "";

    document.getElementById("name").value = "";

    document.getElementById("age").value = "";

    document.getElementById("address").value = "";

    document.getElementById("profile-pic").value = "";

    document.getElementById("form-container").style.display = "none";

}

function deletePost(button) {

    let pass = prompt("Enter password to delete:");

    if (pass === "8848") {

        button.parentElement.remove();

        savePosts();

    } else {

        alert("Incorrect password!");

    }

}

function deleteAllPosts() {

    let pass = prompt("Enter password to delete all posts:");

    if (pass === "8848") {

        document.getElementById("post-container").innerHTML = "";

        savePosts();

    } else {

        alert("Incorrect password!");

    }

}

function savePosts() {

    let posts = document.getElementById("post-container").innerHTML;

    localStorage.setItem("posts", posts);

}

function loadPosts() {

    let savedPosts = localStorage.getItem("posts");

    if (savedPosts) {

        document.getElementById("post-container").innerHTML = savedPosts;

    }

}