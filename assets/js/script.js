const openModal = document.querySelector('#open-modal'),
closeModal=document.querySelector('#close-modal'),
modal=document.querySelector('.modal');

openModal.addEventListener('click',()=>{
    if(modal.classList.contains('hidden')){
        modal.classList.remove('hidden');
        modal.classList.add('block');
    }
})

closeModal.addEventListener('click',()=>{
        modal.classList.remove('block');
        modal.classList.add('hidden');
    
})

const to_do = document.getElementById('to-do');
let arrayOfToDo = JSON.parse(localStorage.getItem('arrayOfToDo')) || [];
let arrayOfNotToDo = JSON.parse(localStorage.getItem('arrayOfNotToDo')) || [];

// Initial rendering of the lists
renderToDoItems(arrayOfToDo);
renderNotCompletedToDo(arrayOfNotToDo);

// Add new to-do item
document.querySelector('#addToDo').addEventListener('click', () => {
    const value = to_do.value.trim(); // Trim to avoid empty spaces
    if (value) {
        arrayOfToDo.push(value);
        localStorage.setItem('arrayOfToDo', JSON.stringify(arrayOfToDo));
        to_do.value = '';
        renderToDoItems(arrayOfToDo);
    }
});

// Function to render completed items
function renderToDoItems(toDoArray) {
    const toDoList = document.getElementById('completed');
    toDoList.innerHTML = ''; // Clear current list

    toDoArray.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('flex', 'items-center', 'justify-between', 'p-2', 'bg-gray-100', 'rounded', 'mb-2');

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('mr-2');
        checkbox.checked = false;
        
        // Move to not completed when checked
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                // Move item to not completed array
                arrayOfNotToDo.push(item);
                arrayOfToDo.splice(index, 1); // Remove from completed array
                
                // Update both localStorage
                localStorage.setItem('arrayOfToDo', JSON.stringify(arrayOfToDo));
                localStorage.setItem('arrayOfNotToDo', JSON.stringify(arrayOfNotToDo));
                
                // Re-render both lists
                renderToDoItems(arrayOfToDo);
                renderNotCompletedToDo(arrayOfNotToDo);
            }
        });

        const text = document.createElement('span');
        text.textContent = item;

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '🗑';
        deleteButton.classList.add('text-red-500', 'ml-4', 'hover:text-red-700');
        
        // Delete the item
        deleteButton.addEventListener('click', () => {
            arrayOfToDo.splice(index, 1);
            localStorage.setItem('arrayOfToDo', JSON.stringify(arrayOfToDo));
            renderToDoItems(arrayOfToDo);
        });

        div.appendChild(checkbox);
        div.appendChild(text);
        div.appendChild(deleteButton);
        toDoList.appendChild(div);
    });
}

// Function to render not completed items
function renderNotCompletedToDo(notToDoArray) {
    const notTodoList = document.getElementById('not-completed');
    notTodoList.innerHTML = ''; // Clear current list

    notToDoArray.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('flex', 'items-center', 'justify-between', 'p-2', 'bg-gray-100', 'rounded', 'mb-2', 'line-through');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('mr-2');
        checkbox.checked = true;
        
        // Move back to completed when unchecked
        checkbox.addEventListener('change', () => {
            if (!checkbox.checked) {
                // Move item back to completed array
                arrayOfToDo.push(item);
                arrayOfNotToDo.splice(index, 1); // Remove from not completed array

                // Update both localStorage
                localStorage.setItem('arrayOfToDo', JSON.stringify(arrayOfToDo));
                localStorage.setItem('arrayOfNotToDo', JSON.stringify(arrayOfNotToDo));
                
                // Re-render both lists
                renderToDoItems(arrayOfToDo);
                renderNotCompletedToDo(arrayOfNotToDo);
            }
        });

        const text = document.createElement('span');
        text.textContent = item;

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '🗑';
        deleteButton.classList.add('text-red-500', 'ml-4', 'hover:text-red-700');
        
        // Delete the item
        deleteButton.addEventListener('click', () => {
            arrayOfNotToDo.splice(index, 1);
            localStorage.setItem('arrayOfNotToDo', JSON.stringify(arrayOfNotToDo));
            renderNotCompletedToDo(arrayOfNotToDo);
        });

        div.appendChild(checkbox);
        div.appendChild(text);
        div.appendChild(deleteButton);
        notTodoList.appendChild(div);
    });
}
