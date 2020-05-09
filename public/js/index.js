
const TOKEN = "2abbf7c3-245b-404f-9473-ade729ed4653"; 

//Fetch to call all bookmarks
function fetchBookmarks(){
    let url = "/bookmarks";
    let settings = {
        method : 'GET',
        headers : {
            Authorization : `Bearer ${TOKEN}`
        }
    }

    let results = document.querySelector('.resultsAllBookmarks');
    results.innerHTML = "";
    fetch(url, settings)
        .then(response =>{
            if(response.ok)
            {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then( responseJSON => {
            console.log(responseJSON);
            for(let i = 0; i<responseJSON.length;i++){
                results.innerHTML += `<br> <div> 
                    <h6> ${i+1} - ${responseJSON[i].title} </h6>
                    <p> ID: ${responseJSON[i].id} </p>
                    <p> Rating: ${responseJSON[i].rating} </p>
                    <p> Description: ${responseJSON[i].description} </p>
                    <a class="btn btn-primary" href="${responseJSON[i].url} target="_blank" role="button">Buy Now</a>
                </div>`;
            }
        })
        .catch(err => {
            results.innerHTML = `<div> The authorization token is invalid </div>`;

        })


}

function fetchCreateBookmark(titlePost, descriptionPost,ratingPost, urlPost)
{
    let url = "/bookmarks";
    let data = {
        title : titlePost,
        url : urlPost,
        description: descriptionPost,
        rating: Number(ratingPost)
    }
    let settings = {
        method : 'POST',
        headers : {
            Authorization : `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    }

    let results = document.querySelector('.resultsPostBookmark');

    fetch(url, settings)
        .then(response =>{
            if(response.ok)
            {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then( responseJSON => {
            console.log(responseJSON);
            
            console.log(responseJSON.name)

            if(responseJSON.name === "MongoError"){
                results.innerHTML = `
                <div> 
                    <h6 class="text-danger"> The title already exist</h6>
                </div>`;

            }
            else{
                results.innerHTML = `
                <div> 
                    <h6 class="text-success"> Added successfully and the list has been updated</h6>
                    <p> Title: ${responseJSON.title} </p>
                    <p> Rating: ${responseJSON.rating} </p>
                    <p> Description: ${responseJSON.description} </p>
                    <a class="btn btn-primary" href="${responseJSON.url} target="_blank" role="button">Buy Now</a>
                </div>`;

            }
            fetchBookmarks();

        })
        .catch(err => {
            results.innerHTML = `<div>The authorization token is invalid </div>`;

        })   
}

function fetchDeleteBookmark(idBookmark)
{
    let url = "/bookmark/"+idBookmark;
    let settings = {
        method : 'DELETE',
        headers : {
            Authorization : `Bearer ${TOKEN}`
        }
    }

    let results = document.querySelector('.resultsDeleteBookmark');

    fetch(url, settings)
        .then(response =>{
            if(response.ok)
            {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then( responseJSON => {
            console.log(responseJSON);
            console.log(responseJSON.title);

            if(responseJSON.deletedCount > 0)
            {
                results.innerHTML = `
                <div> 
                <h6 class="text-success">The bookmark has been successfully removed and the list has been updated</h6>
                </div>`;

                fetchBookmarks();
            }
            else {
                results.innerHTML = `
                <div> 
                <h6 class="text-danger"> There's no bookmark with that id </h6>
                </div>`;
            }

        })
        .catch(err => {
            results.innerHTML = `<div> The authorization token is invalid </div>`;

        }) 
}

function fetchGetByTitleBookmark(titleBookmark){
    let url = "/bookmark?title=" + titleBookmark;
    let data = {
        title : titleBookmark
    }
    let settings = {
        method : 'GET',
        headers : {
            Authorization : `Bearer ${TOKEN}`        
        }
    }

    let results = document.querySelector('.resultsGetBookmarkByTitle');

    fetch(url, settings)
        .then(response =>{
            if(response.ok)
            {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then( responseJSON => {
            console.log(responseJSON);

            if(responseJSON.length > 0 )
            {
                for(let i = 0; i < responseJSON.length; i++)
                {
                    results.innerHTML = `
                    <div> 
                        <h6 class="text-success"> Result </h6>
                        <p> Title: ${responseJSON[i].title} </p>
                        <p> Rating: ${responseJSON[i].rating} </p>
                        <p> Description: ${responseJSON[i].description} </p>
                        <a class="btn btn-primary" href="${responseJSON[i].url} target="_blank" role="button">Buy Now</a>
                    </div>`;
                }
            }
            else {
                results.innerHTML = `
                    <div> 
                        <h6 class="text-danger"> There's no bookmark with this title </h6>
                    </div>`;
            }
           
            

        })
        .catch(err => {
            console.log(err)
            results.innerHTML = `<div> The authorization token is invalid </div>`;

        }) 
    
}

function fetchUpdateBookmark(updateBookMark,idBookmark){
    let url = "/bookmark/" + idBookmark;
    let settings = {
        method : 'PATCH',
        headers : {
            Authorization : `Bearer ${TOKEN}`,        
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(updateBookMark)

    }

    let results = document.querySelector('.resultsUpdateBookmark');

    fetch(url, settings)
        .then(response =>{
            if(response.ok)
            {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then( responseJSON => {
            console.log(responseJSON);

            if(responseJSON.nModified > 0 )
            {
                    results.innerHTML = `
                    <div> 
                        <h6 class="text-success"> Updated successfully and the list has been updated</h6>
                    </div>`;
                    fetchBookmarks();
            }
            else {
                results.innerHTML = `
                    <div> 
                        <h6 class="text-danger"> There's no bookmark with this ID </h6>
                    </div>`;
            }
           
        })
        .catch(err => {
            console.log(err)
            results.innerHTML = `<div> The authorization token is invalid </div>`;

        }) 


}

//Cuando el boton de all bookmarks sea presionado
function allBookmarks(){
    let allBookmarksForm = document.querySelector('.allBookmarks-form');

    allBookmarksForm.addEventListener('submit', (event)  => {

        event.preventDefault();
        console.log("Click");
        fetchBookmarks();
    });
}

function createBookmark(){
    let allBookmarksForm = document.querySelector('.postBookmark-form');

    allBookmarksForm.addEventListener('submit', (event)  => {

        event.preventDefault();
        console.log("Create Bookmark");

        let title = document.getElementById("titlePOST").value;
        let description = document.getElementById("descriptionPOST").value;
        let rating = document.getElementById("ratingPOST").value;
        let url = document.getElementById("urlPOST").value;

        let validationForm = document.getElementById("validationFormPOST");
        
        if(title === "" || description === "" || rating === "" || url === "")
        {
            console.log("FALTA ALGO");
            validationForm.innerHTML = `<label class="text-danger"> Some fields are not complete </label>`;
        }
        else{
            validationForm.innerHTML = "";
            fetchCreateBookmark(title,description,rating,url);

        }

        
    });
}

function deleteBookmark()
{
    let deleteBookmarkForm = document.querySelector('.deleteBookmark-form');

    deleteBookmarkForm.addEventListener('submit', (event)  => {
        event.preventDefault();
        console.log("Delete Bookmark");

        let idBokmark = document.getElementById("idDELETE").value;

        let validationForm = document.getElementById("validationFormDELETE");

        if(idBokmark === "")
        {
            validationForm.innerHTML = `<p class="text-danger"> You need to put an ID </p>`;
        }
        else{
            validationForm.innerHTML ="";
            fetchDeleteBookmark(idBokmark);
        }

    });
}

function getByTitleBookmark(){
    let getByTitleBookmarkForm = document.querySelector('.getBookmarkbyTitle-form');

    getByTitleBookmarkForm.addEventListener('submit', (event)  => {
        event.preventDefault();
        console.log("Getting Element by title");

        let idBokmarkTitle = document.getElementById("titleGET").value;

        let validationForm = document.getElementById("validationFormGetByTitle");

        if(idBokmarkTitle === "")
        {
            validationForm.innerHTML = `<p class="text-danger"> You need to put a Title </p>`;
        }
        else{
            validationForm.innerHTML = "";
            fetchGetByTitleBookmark(idBokmarkTitle);

        }



    });

}

function updateBookmarkForm(){

    let updateBookmarkForm = document.querySelector('.updateBookmark-form');

    updateBookmarkForm.addEventListener('submit' , (event) => {

        event.preventDefault();
        //must
        let id = document.getElementById("idUPDATE").value;

        //optional
        let title = document.getElementById("titleUPDATE").value;
        let description = document.getElementById("descriptionUPDATE").value;
        let rating = document.getElementById("ratingUPDATE").value;
        let url = document.getElementById("urlUPDATE").value;

        let validationForm = document.getElementById("validationFormUPDATE");

        let updateBookmark = {id}

        

        if(id === "")
        {
            validationForm.innerHTML = `<p class="text-danger"> You need to put a ID </p>`;
        }
        else{
            validationForm.innerHTML = "";
            if(!(title === ""))
            {
                updateBookmark.title = title;
            }
            if(!(description === ""))
            {
                updateBookmark.description = description;
            }
            if(!(rating === ""))
            {
                updateBookmark.rating = Number(rating);
            }
            if(!(url === ""))
            {
                updateBookmark.url = url;
            }

            //console.log(updateBookmark)
            
            fetchUpdateBookmark(updateBookmark , id);
        }


    });

}


function init(){
    allBookmarks();
    createBookmark();
    deleteBookmark();
    getByTitleBookmark();
    updateBookmarkForm();
}

init();
