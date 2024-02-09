const addArticleButton = document.getElementById("add-article-button");

addArticleButton.addEventListener("click", () => {
    if (!document.querySelector(".add-article-form")) {
        const form = document.createElement("form");
        form.classList.add("add-article-form");
        form.innerHTML = `
                <label for="title" class="form-label">Titre :</label>
                <input type="text" id="title" name="title" class="form-input" required>
                <label for="content" class="form-label">Contenu :</label>
                <textarea id="content" name="content" class="form-textarea" required></textarea>
                <button type="submit" class="form-button">Envoyer</button>
        `;
        document.querySelector(".add-article").appendChild(form);
        // Gérer la soumission du formulaire
        form.addEventListener("submit", function (e) {
            e.preventDefault(); 
            const title = document.getElementById("title").value;
            const content = document.getElementById("content").value;

            // Appel API pour ajouter un article
            fetch("/api/articles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data);
                    // Ajouter un code pour confirmer l'ajout ou rafraîchir la liste des articles!!
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        });
    }
});
