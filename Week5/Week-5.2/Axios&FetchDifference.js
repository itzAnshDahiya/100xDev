/*  function explainAxiosVsFetch() {
  return `
1. **Axios** is a third-party HTTP client library, while **fetch** is a built-in browser API (also available in Node.js from v18).
2. **Axios** automatically transforms JSON data and handles errors more intuitively; **fetch** requires manual parsing with .json() and does not throw errors for HTTP error status codes.
3. **Axios** supports request cancellation, interceptors, and automatic timeouts; **fetch** requires more manual setup for these features.
4. **Axios** works in both browsers and Node.js (all versions); **fetch** is native in browsers and Node.js v18+.
5. **Axios** automatically serializes JavaScript objects to JSON for POST requests; **fetch** requires manual serialization with JSON.stringify().
;
console.log(explainAxiosVsFetch());

}  */


console.log(explainAxiosVsFetch());

// Example: GET request using fetch
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => console.log('Fetch GET:', data))
  .catch(error => console.error('Fetch Error:', error));

// Example: GET request using axios
const axios = require('axios');
axios.get('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    console.log('Axios GET:', response.data);
  })
  .catch(error => {
    console.error('Axios Error:', error);
  });

// Example: POST request using fetch
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 })
})
  .then(response => response.json())
  .then(data => console.log('Fetch POST:', data));

// Example: POST request using axios
axios.post('https://jsonplaceholder.typicode.com/posts', {
  title: 'foo',
  body: 'bar',
  userId: 1
})
  .then(response => console.log('Axios POST:', response.data))
  .catch(error => console.error('Axios Error:', error));
