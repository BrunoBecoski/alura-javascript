function handleSubmitSearch(event) {

  event.preventDefault();

  const searchValue = document.getElementById("input-search").value;

  window.location.href = `http://127.0.0.1:5500/search.html?search=${searchValue}`;
}


function handleSubmitCourses(event) {

  event.preventDefault();

  const searchValue = document.getElementById("input-courses").value;

  window.location.href = `http://127.0.0.1:5500/courses.html?name=${searchValue}`;
}
