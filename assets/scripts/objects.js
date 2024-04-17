const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');
const movieList = document.getElementById('movie-list');

const renderMovies = (filter = '') => {
    const movieList = document.getElementById('movie-list');

    if (movies.length === 0) {
        movieList.classList.remove('visible');
        return;
    } else {
        movieList.classList.add('visible');
    }

    movieList.innerHTML  = '';

    const filteredMovies = !filter 
        ? movies 
        : movies.filter(film => film.info.title.includes(filter));

    filteredMovies.forEach((film) => {
        const movieEl = document.createElement('li');
        let text = film.info.title + ' - ';
        for (const key in film.info) {
            if (key !== 'title') {
                text = text + `${key}: ${film.info[key]}`;
            }
        }
        movieEl.textContent = text;
        movieList.append(movieEl);
    })
}

const movies = [];

const addMovieHandler = () => {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    if (
        title.trim() === '' ||
        extraName.trim() === '' ||
        extraValue.trim() === ''
    ) return;

    const newMovie = {
        info: {
            title,
            [extraName]: extraValue
        },
        id: Math.random()
    };

    movies.push(newMovie);
    renderMovies();
};

const searchMovieHandler = () => {
    const filterTerm = document.getElementById('filter-title').value;
    renderMovies(filterTerm);


};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);