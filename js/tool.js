document.addEventListener('DOMContentLoaded', () => {
    const addItemForm = document.getElementById('add-item-form');
    const itemTitleInput = document.getElementById('item-title');
    const todayList = document.getElementById('today-review-list');
    const upcomingList = document.getElementById('upcoming-review-list');

    const getItems = () => JSON.parse(localStorage.getItem('reviewItems') || '[]');
    const saveItems = (items) => localStorage.setItem('reviewItems', JSON.stringify(items));

    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const renderItems = () => {
        const items = getItems();
        todayList.innerHTML = '';
        upcomingList.innerHTML = '';
        const today = formatDate(new Date());

        items.sort((a, b) => new Date(a.reviews[0].date) - new Date(b.reviews[0].date));

        if (items.length === 0) {
            todayList.innerHTML = '<li>No items scheduled for today. Add a topic to get started!</li>';
            upcomingList.innerHTML = '<li>No upcoming items.</li>';
            return;
        }

        let todayHasItems = false;
        let upcomingHasItems = false;

        items.forEach(item => {
            const itemElement = document.createElement('li');
            itemElement.setAttribute('data-id', item.id);

            let isToday = false;
            item.reviews.forEach(review => {
                if (review.date === today && !review.done) {
                    isToday = true;
                }
            });

            const stepsHtml = item.reviews.map(review => `
                <span class="review-step ${review.done ? 'done' : ''}">
                    <input type="checkbox" data-step="${review.step}" ${review.done ? 'checked' : ''}>
                    ${review.date} (+${review.step}d)
                </span>
            `).join('');

            itemElement.innerHTML = `
                <span class="review-item-title">${item.title}</span>
                <div class="review-steps">
                    ${stepsHtml}
                </div>
                <div class="item-actions">
                    <button class="delete-btn">Delete</button>
                </div>
            `;

            if (isToday) {
                todayList.appendChild(itemElement);
                todayHasItems = true;
            } else {
                upcomingList.appendChild(itemElement);
                upcomingHasItems = true;
            }
        });

        if (!todayHasItems) {
            todayList.innerHTML = '<li>Nothing to review today. Great job!</li>';
        }
        if (!upcomingHasItems) {
            upcomingList.innerHTML = '<li>No upcoming items scheduled.</li>';
        }

        addEventListeners();
    };

    const addItem = (title) => {
        const items = getItems();
        const now = new Date();

        const newItem = {
            id: Date.now(),
            title: title,
            reviews: [
                { date: formatDate(addDays(now, 1)), step: 1, done: false },
                { date: formatDate(addDays(now, 3)), step: 3, done: false },
                { date: formatDate(addDays(now, 7)), step: 7, done: false }
            ]
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

    const toggleStep = (itemId, step) => {
        const items = getItems();
        const item = items.find(i => i.id === itemId);
        if (item) {
            const reviewStep = item.reviews.find(r => r.step === step);
            if (reviewStep) {
                reviewStep.done = !reviewStep.done;
                saveItems(items);
                renderItems(); // Re-render to update styles and lists
            }
        }
    };

    function addEventListeners() {
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.closest('li').dataset.id);
                deleteItem(itemId);
            });
        });

        document.querySelectorAll('input[type="checkbox"').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const itemId = parseInt(e.target.closest('li').dataset.id);
                const step = parseInt(e.target.dataset.step);
                toggleStep(itemId, step);
            });
        });
    }

    addItemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = itemTitleInput.value.trim();
        if (title) {
            addItem(title);
            itemTitleInput.value = '';
        }
    });

    renderItems();
});