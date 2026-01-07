 /*-- on récupère le livre entier class=book / book devient une variable --*/
        const book = document.querySelector('.book');
        /*-- on récupère les toutes pages class=page / page devient une variable --*/
        const pages = document.querySelectorAll('.page');
        /*-- La variable dit ou on est dans le livre -1= livre fermé --*/
        let currentPage = -1;
        /*-- updatePages=fonction qui met a jour l'état visuel du livre,
            forEach = parcours chaque page ou index,
            remove = on enleve le fait que la page sois active,
            if (index < currentPage) = Si la page est avant la page actuel on la tourne,
            else = sinon on enleve la fonction turned,
            if (index === currentPage)= si c'est la page actuel on la rend visible avec .active, --*/
        function updatePages() {
            pages.forEach((page, index) => {
                page.classList.remove('active');

                if (index < currentPage) {
                    page.classList.add('turned')
                } else {
                    page.classList.remove('turned');
                }

                if (index === currentPage) {
                    page.classList.add('active');
                }
            });
        }

        /*-- applique la variable book (addEvenListener = action de l'utilisateur) click = type d'action - le (e) donne l'info positionnement de la souris, bouton ou élément cliqué 
        const rect = book.getBoundingClientRect = position du livre
        const clickX = e.clientX = position X du client - rect.left = début du livre 
        const middle = rect.width / 2 = me donne le milieu du livre
        le tout me donne la position du clic dans le livre --*/
        book.addEventListener('click', (e) => {
            const rect = book.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const middle = rect.width / 2;
            /*-- if (!book.classList.contains('open')) = si le livre est n'est pas ouvert
            book.classList.add('open') = ouvre le livre
            currentPage = 0 = va sur la premiere page
            updatePages() = met a jour l'affichage
            return = on stop la fonction --*/
            if (!book.classList.contains('open')) {
                book.classList.add('open');
                currentPage = 0;
                updatePages();
                return;
            }
            /*-- if (clickX > middle && currentPage < pages.length - 1) = si clic a droite du livre (-1) = si pas déja à la derniere page
            currentPage++; = avance d'une page
            updatePages(); = et met a jour l'affichage --*/
            if (clickX > middle && currentPage < pages.length - 1) {
                currentPage++;
                updatePages();
            }
            /*--if (clickX < middle && currentPage > 0) = si clique a gauche (0)= si pas déja à la premiere page
            currentPage--; = on recule d'une page
            updatePages(); = et met a jour l'affichage --*/
            if (clickX < middle && currentPage > 0) {
                currentPage--;
                updatePages();
            }
        });
        /*-- j'ai rajouter des feuilles (div class=sheet) pour améliorer l'animation la ligne d'en dessous récupère toutes ces pages et stock dans la variable sheets --*/
        const sheets = document.querySelectorAll('.sheet');
        /*-- updatePages= on met a jour l'état visuel du livre
        forEach = on parcours les pages une par une
        page = la page actuel
        index = son numéro
        pages = toute les pages
        page.classList.remove('active')= on enleve la classe active a toutes les pages pour réinitialisé
        sheets[index]?.classList.remove('turned') = 
        le ? évite les erreurs si une sheet manque 
          page.classList.add('active'); = la page deviens visible grace a l'opacity et le z-index du css
        --*/
        function updatePages() {
            pages.forEach((page, index) => {
                page.classList.remove('active');
                page.classList.remove('turned');

                if (sheets[index]) {
                    if (currentPage > index) {
                        sheets[index].classList.add('turned');
                    } else {
                        sheets[index].classList.remove('turned');
                    }
                }

                if (index === currentPage && currentPage >= 0) {
                    page.classList.add('active');
                }
            });
        }