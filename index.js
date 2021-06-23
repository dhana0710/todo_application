const taskContainer = document.querySelector(".task__Container");

//Global Store
const gobalStore = [];



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
                            <button type="button" class="btn btn-outline-primary"><i class="fas fa-pencil-alt"></i></button>
                            <button type="button" class="btn btn-outline-danger"><i class="far fa-trash-alt"></i></button>
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


const loadInitialTaskcard = () => {
    //access  localStorage
    const getInitialData = localStorage.getItem("tasky");
    if (!getInitialData) return;

    //convert value string to Object
    //{card:[{...},{....}]}
    const { cards } = JSON.parse(getInitialData);

    //map around the array to generate HTML card and inject it into DOM.

    cards.map((cardObj) => {
        const createNewCard = newCard(cardObj);
        taskContainer.insertAdjacentHTML("beforeend", createNewCard);
        gobalStore.push(cardObj);
    })

}







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
    gobalStore.push(taskData);

    //call localStorage API
    //{card:[{...},{....}]}
    //localStorage.setItem("tasky", { card: gobalStore })
    localStorage.setItem("tasky", JSON.stringify({ cards: gobalStore }));

}


//Issues
//the modal was not closing upon add new card {solved}
//Card was not save after refresh --->localStorage (upto 5MB) {solved}

//Features
//Delete a card