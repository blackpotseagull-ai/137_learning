
document.addEventListener('DOMContentLoaded', () => {
    const addItemForm = document.getElementById('add-item-form');
    const itemTitleInput = document.getElementById('item-title');
    const studyList = document.getElementById('study-list');

    // Load items from localStorage
    const getItems = () => JSON.parse(localStorage.getItem('studyItems') || '[]');
    const saveItems = (items) => localStorage.setItem('studyItems', JSON.stringify(items));

    const renderItems = () => {
        const items = getItems();
        studyList.innerHTML = ''; // Clear the list

        if (items.length === 0) {
            studyList.innerHTML = `<li class="empty-message" data-i18n="empty_list_message">Your study list is empty. Add a topic above to get started!</li>`;
            // Re-apply translation for the empty message if it's added dynamically
            const preferredLanguage = localStorage.getItem('preferredLanguage') || (navigator.language.startsWith('ko') ? 'ko' : 'en');
            if (window.translations && window.translations[preferredLanguage]) {
                applyTranslations(preferredLanguage);
            }
            return;
        }

        items.forEach(item => {
            const itemElement = document.createElement('li');
            itemElement.setAttribute('data-id', item.id);
            
            itemElement.innerHTML = `
                <span class="item-title">${item.title}</span>
                <div class="review-steps">
                    <label class="review-step ${item.reviews['1'] ? 'completed' : ''}">
                        <input type="checkbox" data-step="1" ${item.reviews['1'] ? 'checked' : ''}>
                        1일 후
                    </label>
                    <label class="review-step ${item.reviews['3'] ? 'completed' : ''}">
                        <input type="checkbox" data-step="3" ${item.reviews['3'] ? 'checked' : ''}>
                        3일 후
                    </label>
                    <label class="review-step ${item.reviews['7'] ? 'completed' : ''}">
                        <input type="checkbox" data-step="7" ${item.reviews['7'] ? 'checked' : ''}>
                        7일 후
                    </label>
                </div>
                <button class="delete-btn">×</button>
            `;

            // Add completed class for strikethrough if a checkbox is checked
            if (item.reviews['1'] || item.reviews['3'] || item.reviews['7']) {
                 // Find the specific step and apply strikethrough
                itemElement.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
                    cb.parentElement.classList.add('completed');
                });
            }

            studyList.appendChild(itemElement);
        });
    };

    const addItem = (title) => {
        const items = getItems();
        const newItem = {
            id: Date.now(),
            title: title,
            createdAt: new Date().toISOString(),
            reviews: { '1': false, '3': false, '7': false }
        };
        items.push(newItem);
        saveItems(items);
        renderItems();
    };

    const deleteItem = (id) => {
        let items = getItems();
        items = items.filter(item => item.id !== id);
        saveItems(items);
        renderItems();
    };

    const toggleReview = (itemId, step) => {
        const items = getItems();
        const item = items.find(i => i.id === itemId);
        if (item) {
            item.reviews[step] = !item.reviews[step];
            saveItems(items);
            renderItems();
        }
    };

    // Event Delegation for list items
    studyList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const itemId = parseInt(e.target.closest('li').dataset.id);
            deleteItem(itemId);
        }
    });

    studyList.addEventListener('change', (e) => {
        if (e.target.matches('input[type="checkbox"]')) {
            const itemId = parseInt(e.target.closest('li').dataset.id);
            const step = e.target.dataset.step;
            toggleReview(itemId, step);
        }
    });

    // Add item form submission
    addItemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = itemTitleInput.value.trim();
        if (title) {
            addItem(title);
            itemTitleInput.value = '';
        }
    });

    // Initial render
    renderItems();
});
