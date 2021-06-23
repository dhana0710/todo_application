const taskContainer = document.querySelector(".task__Container");

//Global Store
let globalStore = [];



const newCard = ({
    id,
    imageUrl,
    taskTitle,
    taskType,
    taskDescription
}) => `
                    <div class="col-md-6 col-lg-4 mt-5" id=${id}>
                    <div class="card">
                        <div class="card-header d-flex justify-content-end gap-2">
                            
                            <button type="button" class="btn btn-outline-danger" id=${id} onclick="deleteCard.apply(this, arguments)">
                                <i class="far fa-trash-alt" id=${id} onclick="deleteCard.apply(this, arguments)"></i>
                            </button>
                        </div>
                        <img src=${imageUrl} class="card-img-top" alt="Image">
                        <div class="card-body">
                            <h5 class="card-title">${taskTitle}</h5>
                            <p class="card-text">${taskDescription}</p>
                            <span class="badge bg-primary">${taskType}</span>
                        </div>
                        <div class="card-footer text-muted">
                            <button type="button" class="btn btn-outline-primary  float-end">Open Task</button>
                        </div>
                    </div>
    
    `;

//<button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>


const loadInitialTaskcard = () => {
    //access  localStorage
    const getInitialData = localStorage.getItem("tasky");
    //or localStorage.tasky
    if (!getInitialData) return;

    //convert value string to Object
    //{card:[{...},{....}]}
    const { cards } = JSON.parse(getInitialData);

    //map around the array to generate HTML card and inject it into DOM.

    cards.map((cardObj) => {
        const createNewCard = newCard(cardObj);
        taskContainer.insertAdjacentHTML("beforeend", createNewCard);
        globalStore.push(cardObj);
    })

};



const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,
        imageUrl: document.getElementById("imageUrl").value,
        taskTitle: document.getElementById("taskTitle").value,
        taskType: document.getElementById("taskType").value,
        taskDescription: document.getElementById("taskDescription").value,
    };

    //HTML code.
    const createNewCard = newCard(taskData);

    //insert in DOM. 
    taskContainer.insertAdjacentHTML("beforeend", createNewCard);

    //card object Store in array.
    globalStore.push(taskData);

    //call localStorage API
    //{card:[{...},{....}]}
    //localStorage.setItem("tasky", { card: gobalStore })
    localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));

};


const deleteCard = (event) => {

    event = window.event;

    const targetID = event.target.id;
    console.log(targetID)

    const tagname = event.target.tagName; //BUTTON

    const newUpdateArray = globalStore.filter((cardObj) => cardObj.id !== targetID);

    globalStore = newUpdateArray;

    localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));



    //access DOM to remove them

    if (tagname === "BUTTON") {
        //return event.target.parentNode.parentNode.parentNode.parentNode.removeChild(
        //    event.target.parentNode.parentNode.parentNode
        return taskContainer.removeChild(
            event.target.parentNode.parentNode.parentNode
        );

    }

    return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode
    );




};



//Issues
//the modal was not closing upon add new card {solved}
//Card was not save after refresh --->localStorage (upto 5MB) {solved}

//Features
//Delete a card