const blogSubmit = document.getElementById('blogForm');
const blogTitle = document.getElementById('blogTitle');
const blogBody = document.getElementById('blogBody');


blogSubmit.addEventListener('submit', async (event)=>{
    event.preventDefault();
    var title = blogTitle.value.trim();
    var blog = blogBody.value.trim();
    const response = await fetch ('/api/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({title, blog}),
  });
  console.log(response);
    
    
});