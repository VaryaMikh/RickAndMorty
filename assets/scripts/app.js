let pageCount = 1;
let publishedChars;

getCharactersFromServer(true);

function getCharactersFromServer(isNewSearch) {
    if (isNewSearch) {
        pageCount = 1;
    }

    axios.get('https://rickandmortyapi.com/api/character' + getSearchParams())
        .then(response => {
            console.log(response);
            if (response.data && response.data.info) {
                let characterNumber = document.querySelector("#characterNumber");
                characterNumber.innerText = `Персонажи / ${response.data.info.count}`;
            }

            if (isNewSearch) {
                publishedChars = prepareCharCards(response.data.results);
            } else {
                publishedChars += prepareCharCards(response.data.results)
            }

            if (response.data && response.data.results) {
                characterList.innerHTML = publishedChars;
            } else {
                characterList.innerHTML = 'Ничего не найдено.';
            }         
        })
        .catch(err => {
            console.error(err);
        })
}

function getSearchParams() {
    const searchName = document.querySelector('#searchName').value;
    console.log(searchName);
    const searchStatus = document.querySelector('#searchStatus').value;
    console.log(searchStatus);
    const searchGender = document.querySelector('#searchGender').value;
    console.log(searchGender);

    if(!searchName && !searchStatus && !searchGender) {
       const result = `?page=${pageCount}`;
       pageCount++;

       return result;
    }

    let result = '/?';
    if (searchName) {
        result += `name=${searchName}&`;
    }

    if (searchStatus) {
        result += `status=${searchStatus}&`;
    }

    if (searchGender) {
        result += `gender=${searchGender}&`;
    }

    result += `page=${pageCount}`;
    pageCount++;

    return result;
}

function prepareCharCards(characters) {
    let result = '';

    characters.forEach(character => {
        result += `
        <div class="col-sm-6">
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${character.image}" alt="" class="character__img">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${character.name}</h5>
                            <div class="character__status">
                                <div class="character__circle ${circleColorChange(character.status)}"></div>
                                <p class="card-text">${character.status} - ${character.species}</p>
                            </div>
                            <p class="card-text"><small class="text-muted">Last known location:</small></p>
                            <p class="card-text">${character.location.name}</p>
                        </div>
                    </div>
                </div>
            </div> 
        </div>`
    })

    return result;
}

function circleColorChange(param) {
    if (param == 'Dead') { 
        return '-dead'
    } else if (param == 'Alive') {
        return '-alive'
    } else if (param == 'unknown'){
        return '-unknown'
    }
}
