const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const formNameOrNumber = document.querySelector('.form_name_or_number');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const inputSearch = document.querySelector('.input_search');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) =>{
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(apiResponse.status === 200){
        const apiResponseJson = await apiResponse.json();
        return apiResponseJson;
    }
}

const renderPokemon = async (pokemon) =>{
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        inputSearch.value = '';
        searchPokemon = data.id;

    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
        searchPokemon = 0;
    }
}

formNameOrNumber.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(inputSearch.value.toLowerCase()); 
});

btnPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }else if(searchPokemon = 0){
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }
});

btnNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});



renderPokemon(searchPokemon);