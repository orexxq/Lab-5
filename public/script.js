const ViewData = (data) => {
    const todoListContainer = document.querySelector('.wrapper_todo__items');

    data.forEach(item => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper_todo__item');

        const textDiv = document.createElement('div');
        textDiv.classList.add('item_text');

        const titleElement = document.createElement('h1');
        titleElement.textContent = item.title;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = item.description;

        textDiv.appendChild(titleElement);
        textDiv.appendChild(descriptionElement);

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('item_button');

        const buttonElement = document.createElement('button');
        buttonElement.type = 'button';
        buttonElement.innerHTML = `
          <svg style="rotate: 45deg;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            style="fill: rgba(0, 0, 0, 1);">
            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
          </svg>
        `;

        buttonElement.addEventListener('click', async function () {
            try {
                await fetch(`/api/list/${item.id}`, {
                    method: 'DELETE',
                });

                todoListContainer.removeChild(wrapper);
            } catch (error) {
                console.error('Error:', error);
            }
        });

        buttonDiv.appendChild(buttonElement);

        wrapper.appendChild(textDiv);
        wrapper.appendChild(buttonDiv);

        todoListContainer.appendChild(wrapper);
    });
}



// Requests
document.addEventListener('DOMContentLoaded', function () {
    fetch("/api/list")
        .then(response => response.json())
        .then(data => ViewData(data))
        .catch(error => console.error('Error:', error));
});

