const photos_element = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosarray = [];
let loading = false;
const apiCount = 30;
const apiKey = "Fs4J2hq1xpXCLiXxKdpWa8w1gwGaqyvO_bCZtTpCVO0";

const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${apiCount}`;

let number_of_image_loaded=0;
let number_of_total_images=0;

function ImageLoaded() {
    number_of_image_loaded++;
    if(number_of_image_loaded===number_of_total_images){
        loader.hidden = true;
        loading=false;
    }
}

const ShowPhotos = ()=>{
    number_of_total_images=photosarray.length;
    number_of_image_loaded = 0;
    photosarray.forEach((photo) => {
        const item = document.createElement("a");
        item.setAttribute("href",photo.links.html);
        item.setAttribute("target","_blank");

        const img = document.createElement("img");
        img.setAttribute("src",photo.urls.regular);
        img.setAttribute("alt",photo.alt_description);
        img.setAttribute("title",photo.alt_description);

        img.addEventListener("load",ImageLoaded);
        item.appendChild(img);
        photos_element.appendChild(item);
    })
}

const GetPhotos = async ()=>{
     try{
        const response = await fetch(apiURL);
        photosarray =  await response.json();
        ShowPhotos();
     }catch{

     }
}
GetPhotos();

window.addEventListener("scroll",()=>{
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight-1000 & !loading){
        loading= true;
        GetPhotos();
    }
})
