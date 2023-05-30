// viewing a post and commenting on it

const commentBtn = document.getElementById('commentBtn');

commentBtn.addEventListener('click', async (event)=>{
    event.preventDefault();
    const comment = document.getElementById('comment').value.trim();
    const path = window.location.pathname;
    const split = path.split('/');
    const id = split[split.length - 1];
    const response = await fetch ('/api/post/comment/' + id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({text:comment}),
    });
    if(response.ok){
        document.location.replace('/');
    }
    console.log(response);
});