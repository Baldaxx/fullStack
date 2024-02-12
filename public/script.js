const addArticleButton = document.getElementById("add-article-button");

addArticleButton.addEventListener("click", () => {
    if (!document.querySelector(".add-article-form")) {
        const form = document.createElement("form");
        form.classList.add("add-article-form");
        form.innerHTML = `
                <div class="form-group">
                <label for="title" class="form-label">Prénom :</label>
                <input type="text" id="title" name="title" class="form-input" required>
                <label for="content" class="form-label">Commentaire :</label>
                <textarea id="content" name="content" class="form-textarea" required></textarea>
                <button type="submit" class="form-button">Envoyer</button>
                </div>
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
                    // window.location.reload(); ca ne marche pas
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        });
    }
});
            // Appel API pour ajouter 3 boutons "Repondre", "Update" et "delete"
fetch("/api/articles")
    .then((response) => response.json())
    .then((articles) => {
        const articlesDiv = document.getElementById("articles");
        articles.forEach((article) => {
            const articleElement = document.createElement("div");
            articleElement.classList.add("article-container");
            articleElement.innerHTML = `
    <div class="article-title">${article.title}</div>
    <div class="article-content">${article.content}</div>
    <button class="article-comment-button">Répondre</button>
    <button class="article-update-button">Mettre à jour</button>
    <button class="article-delete-button">Supprimer</button>`;
            articlesDiv.appendChild(articleElement);
        });
    });

       // Appel API pour supprimer un commentaire
    //    fetch("/api/articles/:articleId", {
    //     method: "DELETE",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ title, content }),
    // })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log("Success:", data);
    //     })
    //     .catch((error) => {
    //         console.error("Error:", error);
    //     });