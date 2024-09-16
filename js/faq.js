document.addEventListener('DOMContentLoaded', () => {
    loadFAQs();

    const form = document.getElementById('faq-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('faq-id').value;
        const question = document.getElementById('faq-question').value;
        const answer = document.getElementById('faq-answer').value;

        if (id) {
            // Update FAQ
            await fetch(`/faqs/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question, answer })
            });
        } else {
            // Create new FAQ
            await fetch('/faqs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question, answer })
            });
        }

        form.reset();
        loadFAQs();
    });
});

async function loadFAQs() {
    const response = await fetch('/faqs');
    const faqs = await response.json();
    const faqList = document.getElementById('faq-items');
    faqList.innerHTML = '';

    faqs.forEach(faq => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${faq.question}</strong>
            <p>${faq.answer}</p>
            <button onclick="deleteFAQ(${faq.id})">Delete</button>
        `;
        faqList.appendChild(li);
    });
}

async function deleteFAQ(id) {
    await fetch(`/faqs/${id}`, { method: 'DELETE' });
    loadFAQs();
}
