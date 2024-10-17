(function () {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw1_1 = document.getElementById('cw1_1')
  const cw1_2 = document.getElementById('cw1_2')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')
  const loading = document.getElementById('loading');

  const clearAnswer = () => {
    answer.innerHTML = '';
    answer.classList.remove('post-container'); // Remove styling class
  };

  example.addEventListener("click", function () {
    clearAnswer();
    loading.style.display = 'block';
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(array => {
          console.log("All Posts:", array);
          answer.classList.add('post-container');
          answer.innerHTML = JSON.stringify(array);
        })
        .finally(() => {
          loading.style.display = 'none';
        });
  })

  cw1.addEventListener("click", function () {
    clearAnswer();
    loading.style.display = 'block';
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
          console.log("Fetched Posts:", posts);
          posts.forEach(post => {
            const postElement = document.createElement('div');
            // Show JSON as HTML
            postElement.classList.add('post-container');
            postElement.innerHTML = `
                <h3 class="Post-id">Post ID: ${post.id}</h3>
                <h4 class="User-id">User ID: ${post.userId}</h4>
                <h4 class="Title">Title: ${post.title}</h4>
                <p class="Post-body">${post.body.replace(/\n/g, '<br/>')}</p>
                <hr/>
            `;
            answer.appendChild(postElement);
          });
        })
        .finally(() => {
          loading.style.display = 'none';
        });
  })

  //Button for the one post
  cw1_1.addEventListener("click", function () {
    clearAnswer();
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
        .then(post => {
          console.log("Fetched Post:", post);
          answer.innerHTML = '';
          const postElement = document.createElement('div');
          postElement.classList.add('post-container');
          postElement.innerHTML = `
            <h3 class="Post-id">Post ID: ${post.id}</h3>
            <h4 class="User-id">User ID: ${post.userId}</h4>
            <h4 class="Title">Title: ${post.title}</h4>
            <p class="Post-body">${post.body.replace(/\n/g, '<br/>')}</p>
            <hr/>
        `;
          answer.appendChild(postElement);
        })
  })

  cw1_2.addEventListener("click", function () {
    clearAnswer();
    answer.innerHTML = '<p class="processing">Processing...</p>';

    const newPost = {
      title: 'Veronika',
      body: 'Vanivska',
      userId: 1
    };
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(newPost)
    })
        .then(response => response.json())
        .then(createdPost => {
          answer.innerHTML = `<p class="success">Dodano nowy post o ID = ${createdPost.id}</p>`;
          console.log("Created Post:", createdPost);
        })
        .catch(error => {
          answer.innerHTML = '<p class="error" >Error creating the post. Please try again.</p>';
          console.error(error);
        });
  })

  cw2.addEventListener("click", function () {
    //TODO
  })

  cw3.addEventListener("click", function () {
    //TODO
  })

})();
