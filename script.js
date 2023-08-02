src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"




document.addEventListener('DOMContentLoaded', function() {
    class Task {
        constructor(name, description) {
            this.name = name;
            this.description = description;
        }
    }

    let llistaTODO = [];
    let numTasksCompleted = 0;
    const dadesGuardades = localStorage.getItem('dades');
    const numTasksGuardades = localStorage.getItem('num');
    if(dadesGuardades){
        llistaTODO = JSON.parse(dadesGuardades);
    }
    if(numTasksGuardades){
        numTasksCompleted = JSON.parse(numTasksGuardades);
    }

    const container = document.getElementById("container");
    mostrarTasques();

    function mostrarTasques() {

        container.innerHTML = '';
        const textInput = document.getElementById("newTaskText");
        const numTasksHTML = document.getElementById("numTasks");
        numTasksHTML.textContent = numTasksCompleted.toString();
        textInput.value = '';

        for (let i = 0; i < llistaTODO.length; i++) {
            let tasca = llistaTODO[i];
            const nom = tasca.name;
            const desc = tasca.description;

            const taskCard = document.createElement('div');
            taskCard.classList.add('card', 'shadow', 'mt-4');
            taskCard.id = `taskCard${i}`;

            taskCard.innerHTML = `
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-sm-12 font-reg">
                                            <h5>${nom}</h5>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-8 font-reg">
                                            <p>${desc}</p>
                                        </div>
                                        <div class="col-sm-2 text-end">
                                            <button type="button" id="taskDone${i}" class="btn btn-sm btn-success waves-effect waves-light"><i class="bi bi-check-lg"></i></button>
                                        </div>
                                        <div class="col-sm-2 text-end">
                                            <button type="button" id="deleteTask${i}" class="btn btn-sm btn-danger waves-effect waves-light"><i class="bi bi-x-lg"></i></button>
                                        </div>
                                    </div>
                                </div>
                            `;

            const taskDoneButton = taskCard.querySelector(`#taskDone${i}`);
            taskDoneButton.addEventListener('click', () => {
                taskDone(i);
            });

            const taskDeletedButon = taskCard.querySelector(`#deleteTask${i}`);
            taskDeletedButon.addEventListener('click', () => {
                deleteTask(i);
            });


            taskCard.querySelector(`#taskDone${i}`).addEventListener("click", function (e) {
                party.confetti(this);
            });


            container.appendChild(taskCard);
        }


    }

    function taskDone(i){
        const targetCard = document.querySelector(`#taskCard${i}`);
        targetCard.style.animation = "fade-left 0.5s";
        if (targetCard) {
            targetCard.addEventListener("animationend", function() {
                llistaTODO.splice(i, 1);
                const jsonString = JSON.stringify(llistaTODO);
                localStorage.setItem('dades', jsonString);
                numTasksCompleted++;
                localStorage.setItem('num',numTasksCompleted.toString());
                mostrarTasques();
            });
        }
    }

    function deleteTask(i){
        const targetCard = document.querySelector(`#taskCard${i}`);

        targetCard.style.animation = "smaller 0.5s";
        if(targetCard){
            targetCard.addEventListener("animationend", function() {
                llistaTODO.splice(i, 1);
                const jsonString = JSON.stringify(llistaTODO);
                localStorage.setItem('dades', jsonString);
                mostrarTasques();
            });
        }
    }

    function addTask() {

        const text = document.getElementById("newTaskText").value;
        if(text === ''){
            const addButton = document.getElementById("addTaskButton");
            const popover = new bootstrap.Popover(addButton);
            popover.show();

            setTimeout(() => {
                popover.hide();
            }, 2000);
        }else{
            llistaTODO.push(new Task(text, ""));
            const jsonString = JSON.stringify(llistaTODO);
            localStorage.setItem('dades', jsonString);
            mostrarTasques();
        }
    }

    document.getElementById("addTaskButton").addEventListener("click", addTask);
});
