// ---------------------------------------------------------------------------------------------------------------- //
//                                            ToDoList by Kamil Bieniek                                             //
// ---------------------------------------------------------------------------------------------------------------- //
class ToDoList {
    constructor() {
        this.tasks = (localStorage.getItem("tasks") ? [...JSON.parse(localStorage.getItem("tasks"))] : []);
        this.time();
        this.render();
        this.flagForEdit = true;
    }
    createTask() {
        if (inputText.value) {
            const newTask = {
                text: inputText.value,
                nr: Date.now(),
                checked: false,
            };
            this.tasks.push(newTask);
            inputText.value = '';
            this.render();
        }
    }
    render() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        const ul = document.querySelector('.unFinished');
        const ulFinish = document.querySelector('.finished');
        ul.innerHTML = '';
        ulFinish.innerHTML = '';
        if (this.tasks.length === 0) {
            ul.innerHTML = `<p class="noTask">Brak Zadań</p>`;
        } else {
            ulFinish.innerHTML = `<p>Ukończone</p>`
            for (const task of this.tasks) {
                const li = document.createElement('li');
                const input = document.createElement('input');
                const btn = document.createElement('button');
                const btnEdit = document.createElement('button');
                const btnRemove = document.createElement('button');
                const iconEdit =document.createElement('i');
                const iconRemove =document.createElement('i');
                const p = document.createElement('p');

                btnEdit.className = 'edit';
                iconEdit.className = 'fa-regular fa-pen-to-square';
                btnEdit.appendChild(iconEdit);

                btnRemove.className = 'delete';
                iconRemove.className = 'fa-regular fa-trash-can';
                btnRemove.appendChild(iconRemove);

                input.value = task.text;
                input.disabled = true;

                p.appendChild(input);

                input.type = 'text';

                li.append(btn,p,btnEdit,btnRemove);

                if (task.checked) {
                    btn.className = 'active';
                    input.style.textDecoration = "line-through";
                    ulFinish.appendChild(li);
                } else {
                    btn.className = '';
                    input.style.textDecoration = "none";
                    ul.appendChild(li);
                }

                btn.addEventListener('click', () => {
                    task.checked = !task.checked;
                    this.render();
                })

                btnEdit.addEventListener('click', () => {
                    this.edit(input,iconEdit,task);
                })

                btnRemove.addEventListener('click', () => {
                    this.remove(task);
                })
            }
        }
    }
    remove(task) {
        this.tasks.splice(this.tasks.findIndex(x => x.nr === task.nr), 1);
        this.render();
    }
    edit(input,iconEdit,task) {
        if(iconEdit.className === 'fa-regular fa-pen-to-square' && this.flagForEdit) {
            iconEdit.className = 'fa-solid fa-check';
            input.disabled = false;
            input.focus();
            input.addEventListener('keypress', e => e.key === 'Enter' ? this.edit(input,iconEdit,task) : '');
            this.flagForEdit = false;
        } else if(input.value !== '' && iconEdit.className === 'fa-solid fa-check') {
            this.tasks[this.tasks.findIndex(x => x.nr === task.nr)].text = input.value;
            this.flagForEdit = true;
            this.render();
        }

    }
    time() {
        const data = new Date();
        let hour = data.getHours();
        let minute = data.getMinutes();
        if (hour < 10) hour = "0" + hour;
        if (minute < 10) minute = "0" + minute;
        document.querySelector(".clock").innerHTML = `${hour}:${minute}`;
        setTimeout(this.time, 1000); // Every 1s
    };
}
// ---------------------------------------------------------------------------------------------------------------- //
//                                                AddEventListeners                                                 //
// ---------------------------------------------------------------------------------------------------------------- //

const btnAddTask = document.querySelector(".addTask");
const inputText = document.querySelector(".inputText"); {
    const app = new ToDoList();
    inputText.addEventListener('keypress', e => e.key === 'Enter' ? app.createTask() : '');
    btnAddTask.addEventListener('click', () => app.createTask());
}
// ---------------------------------------------------------------------------------------------------------------- //
//                                                   End of File                                                    //
// ---------------------------------------------------------------------------------------------------------------- //