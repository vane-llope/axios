// GET REQUEST
function getTodos() {
  /*axios({
    method : 'get',
    url : 'https://jsonplaceholder.typicode.com/todos',
    //to limit inserted data we use params
    params :{
      _limit : 5
    } 
  }).then(res => showOutput(res))
  .catch(err => console.error(err))*/
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=' + 5)
    .then(res => showOutput(res))
    .catch(err => console.error(err))
}

// POST REQUEST
function addTodo() {
 /* axios({
    method : 'post',
    url : 'https://jsonplaceholder.typicode.com/todos',
    //to limit inserted data we use params
    data :{
      "title": "New ToDo",
      "completed": false
    } 
  }).then(res => showOutput(res))
  .catch(err => console.error(err))*/
  axios.post('https://jsonplaceholder.typicode.com/todos',{
    "userId":1,
    "title": "New ToDo 2 ",
    "completed": false
  })
  .then(res => showOutput(res))
  .catch(err => console.error(err))
}


// PUT/PATCH REQUEST
function updateTodo() {
  //put replace the whole data with sending data
  axios.put('https://jsonplaceholder.typicode.com/todos/'+1,{
    "userId":1,
    "title": "Updated ToDo ToDo ",
    "completed": true
  })
  .then(res => showOutput(res))
  .catch(err => console.error(err))
  /*
  //patch just update what is spacified
  axios.patch('https://jsonplaceholder.typicode.com/todos/'+1,{
    
    "title": "Updated ToDo ToDo ",
    "completed": true
  })
  .then(res => showOutput(res))
  .catch(err => console.error(err)) */
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/'+1)
  .then(res => showOutput(res))
  .catch(err => console.error(err))
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  ])
  .then(axios.spread((todos,posts) => showOutput(posts)))
  .catch(err => console.error(err))
}


// INTERCEPTING REQUESTS & RESPONSES which shows related data in console for each function
axios.interceptors.request.use( config => {
  console.log(`${config.method.toUpperCase()} request has sent to ${config.url} at ${new Date ()}`)
  return config
},error => {
  return Promise.reject(error)
})

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
