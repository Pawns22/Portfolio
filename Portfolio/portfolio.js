const book = document.querySelector('.book');
const pages = document.querySelectorAll('.page');
const sheets = document.querySelectorAll('.sheet');

let currentPage = -1; // livre fermé

function updatePages() {
    pages.forEach((page, index) => {
        page.classList.remove('active', 'turned');
        page.style.zIndex = 0; // toutes les pages commencent derrière
    });

    sheets.forEach((sheet) => sheet.classList.remove('turned'));

    for (let i = 0; i < currentPage; i++) {
        pages[i].classList.add('turned');
        pages[i].style.zIndex = i + 1; // pages déjà tournées dessous
        if (sheets[i]) sheets[i].classList.add('turned');
    }

    if (currentPage >= 0 && pages[currentPage]) {
        pages[currentPage].classList.add('active');
        pages[currentPage].style.zIndex = 100; // page actuelle au-dessus de tout
    }
}

book.addEventListener('click', (e) => {
    const rect = book.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const middle = rect.width / 2;

    if (!book.classList.contains('open')) {
        book.classList.add('open');
        currentPage = 0;
        updatePages();
        return;
    }

    if (clickX > middle && currentPage < pages.length - 1) {
        currentPage++;
        updatePages();
    } else if (clickX < middle && currentPage > 0) {
        currentPage--;
        updatePages();
    }
});

// Au démarrage, on s'assure que rien n'est visible
updatePages();
