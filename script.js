(function () {
    const example = document.getElementById('example');
    const cw1 = document.getElementById('cw1');
    const cw2 = document.getElementById('cw2');
    const cw3 = document.getElementById('cw3');
    const answer = document.getElementById('answer');

    // Przykład wywołania z konsolą
    example.addEventListener("click", function () {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(array => {
                console.log(array);
                answer.innerHTML = JSON.stringify(array);
            });
    });

    // Pobieranie wszystkich postów oraz pojedynczego posta z funkcjonalnością "Loading..." dla cw1
    cw1.addEventListener("click", function () {
        const postId = 1; // ID posta, który chcesz pobrać

        // Wyświetlanie tekstu "Loading..." podczas pobierania
        answer.innerHTML = 'Loading...';

        // Pobieranie wszystkich postów
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(posts => {
                let postsHTML = '<h3>All Posts:</h3><ul>';
                posts.forEach(post => {
                    // Wyświetlanie wszystkich pól: userId, id, title, body
                    postsHTML += `
            <li>
              <strong>User ID:</strong> ${post.userId}<br>
              <strong>Post ID:</strong> ${post.id}<br>
              <strong>Title:</strong> ${post.title}<br>
              <strong>Body:</strong> ${post.body}
            </li><br>`;
                });
                postsHTML += '</ul>';
                // Po załadowaniu danych, zastępujemy tekst "Loading..." treścią postów
                answer.innerHTML = postsHTML;

                // Następnie pobieramy pojedynczy post
                return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            })
            .then(response => response.json())
            .then(post => {
                // Tworzenie HTML do wyświetlenia pojedynczego postu
                const postHTML = `
            <h3>Single Post:</h3>
            <div>
              <strong>User ID:</strong> ${post.userId}<br>
              <strong>Post ID:</strong> ${post.id}<br>
              <strong>Title:</strong> ${post.title}<br>
              <strong>Body:</strong> ${post.body}
            </div>`;
                // Dodanie szczegółów pojedynczego posta do HTML
                answer.innerHTML += postHTML; // Dodajemy do istniejącego HTML
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                answer.innerHTML = 'Wystąpił błąd podczas pobierania danych.';
            });

        // Dodawanie nowego posta
        const newPost = {
            userId: 1, // Możesz dostosować userId
            title: "Nowy Post",
            body: "To jest treść nowego posta."
        };

        // Wyświetlenie "Processing..." podczas wysyłania
        answer.innerHTML += '<p>Processing...</p>';

        // Wysyłanie nowego posta metodą POST
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        })
            .then(response => response.json())
            .then(data => {
                // Wyświetlenie komunikatu o dodaniu nowego posta
                answer.innerHTML += `<p>Dodano nowy post o ID = ${data.id}</p>`;

                // Wyświetlenie szczegółów nowo dodanego posta
                const postHTML = `
                <h3>Nowo Dodany Post:</h3>
                <div>
                  <strong>User ID:</strong> ${data.userId}<br>
                  <strong>Post ID:</strong> ${data.id}<br>
                  <strong>Title:</strong> ${data.title}<br>
                  <strong>Body:</strong> ${data.body}
                </div>`;

                // Dodanie szczegółów nowego posta do HTML
                answer.innerHTML += postHTML; // Dodajemy do istniejącego HTML
            })
            .catch(error => {
                console.error('Error adding post:', error);
                answer.innerHTML += '<p>Wystąpił błąd podczas dodawania posta.</p>';
            });
    });

    cw2.addEventListener("click", function () {
        // Możesz dodać funkcjonalność dla cw2 tutaj
    });

    cw3.addEventListener("click", function () {
        // Możesz dodać funkcjonalność dla cw3 tutaj
    });

})();
