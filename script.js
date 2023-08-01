src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"

document.addEventListener('DOMContentLoaded', function() {

    class Task {
        constructor(name, description) {
            this.name = name;
            this.description = description;
            this.checked = false;
        }
    }

    const llistaTODO = [];
    const container = document.getElementById("container");

    function mostrarTasques() {
        container.innerHTML = '';
        const textInput = document.getElementById("newTaskText");
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
                                            <input type="checkbox" class="btn-check" id="btn-check-delete${i}" autocomplete="off">
                                            <label class="btn btn-sm btn-outline-danger" for="btn-check-delete${i}"><i class="bi bi-x-lg"></i></label>
                                        </div>
                                    </div>
                                </div>
                            `;

            const taskDoneButton = taskCard.querySelector(`#taskDone${i}`);
            taskDoneButton.addEventListener('click', () => {
                taskDone(i);
            });

            taskCard.querySelector(`#taskDone${i}`).addEventListener("click", function (e) {
                party.confetti(this);
            });


            container.appendChild(taskCard);
        }


    }
    function taskDone(i){
        const targetCard = document.querySelector(`#taskCard${i}`);
        if (targetCard) {
            targetCard.style.animation = "fade-left 1s";
            targetCard.addEventListener("animationend", function() {
                llistaTODO.splice(i, 1);
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
            mostrarTasques();
        }
    }

    document.getElementById("addTaskButton").addEventListener("click", addTask);
});
