(function () {
    const example = document.getElementById('example');
    const cw1 = document.getElementById('cw1');
    const cw2 = document.getElementById('cw2');
    const cw3 = document.getElementById('cw3');
    const answer = document.getElementById('answer');
    const loadingModal = document.getElementById('loadingModal');
    const closeModal = document.querySelector('.close');

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

    // Funkcjonalność dla cw2
    cw2.addEventListener("click", function () {
        // Wyświetlanie modalnego okna "Loading"
        loadingModal.style.display = "block";

        // Pobieranie wszystkich postów
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(posts => {
                console.log('Wszystkie posty:', posts); // Wyświetlenie wszystkich postów w konsoli
                let postsHTML = '<h3>All Posts Styled:</h3><div class="post-container">';

                posts.forEach(post => {
                    // Wyświetlanie postów z dodatkowymi stylami
                    postsHTML += `
                <div class="post">
                    <strong>User ID:</strong> ${post.userId}<br>
                    <strong>Post ID:</strong> ${post.id}<br>
                    <strong>Title:</strong> <span class="post-title">${post.title}</span><br>
                    <strong>Body:</strong> <p class="post-body">${post.body}</p>
                </div>`;
                });

                postsHTML += '</div>';
                // Po załadowaniu danych, zastępujemy tekst "Loading..." treścią postów
                answer.innerHTML = postsHTML;

                // Ukrywanie modalnego okna "Loading"
                loadingModal.style.display = "none";
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                answer.innerHTML = '<p class="error-message">Wystąpił błąd podczas pobierania danych.</p>';

                // Ukrywanie modalnego okna "Loading"
                loadingModal.style.display = "none";
            });
    });

    cw3.addEventListener("click", function () {
        // Показать окно "Loading", пока загружаются данные
        loadingModal.style.display = "block";

        // Загрузка данных из JSON файла на GitHub
        fetch('https://raw.githubusercontent.com/veronikavanivska/javascript2_0/refs/heads/mikolay/data.json')
            .then(response => response.json())
            .then(data => {
                // Скрыть окно "Loading"
                loadingModal.style.display = "none";

                // Формируем HTML для отображения данных пользователей и задач
                let usersHTML = '<h3>Users and their Tasks:</h3><ul>';

                data.users.forEach(user => {
                    // Формируем HTML для каждого пользователя
                    usersHTML += `
                <li>
                    <strong>Name:</strong> ${user.name}<br>
                    <strong>Email:</strong> ${user.email}<br>
                    <strong>Tasks:</strong>
                    <ul>`;

                    // Выводим список задач для каждого пользователя
                    user.tasks.forEach(task => {
                        usersHTML += `
                    <li>
                        <strong>Task ID:</strong> ${task.task_id}<br>
                        <strong>Title:</strong> ${task.title}<br>
                        <strong>Status:</strong> ${task.status}<br>
                        <strong>Due Date:</strong> ${task.due_date}
                    </li>`;
                    });

                    usersHTML += `</ul><br></li>`;
                });

                usersHTML += '</ul>';
                // Отображаем результат на странице
                answer.innerHTML = usersHTML;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                answer.innerHTML = 'Error fetching data from GitHub JSON file.';
                loadingModal.style.display = "none";
            });
    });



})();
