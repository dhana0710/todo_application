const taskContainer = document.querySelector(".task__Container");


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
                            <button type="button" class="btn btn-outline-secondary"><i class="fas fa-pencil-alt"></i></button>
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








const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,
        imageUrl: document.getElementById("imageUrl").value,
        taskTitle: document.getElementById("taskTitle").value,
        taskType: document.getElementById("taskType").value,
        taskDescription: document.getElementById("taskDescription").value,
    };

    const createNewCard = newCard(taskData);

    taskContainer.insertAdjacentHTML("beforeend", createNewCard);

}