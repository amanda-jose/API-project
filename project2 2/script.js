const app = {}

 app.displayTopAnime = function(topAnime) {
    console.log("display top 10 anime: ", topAnime)

    topAnime.forEach(function(anime) {
       console.log("anime image: ", anime.image_url)

        const topAnimeHTML = 
        `<div class="animeImages">
            <img src="${anime.image_url}" alt="${anime.image_url}">
            <p>${anime.rank}. ${anime.title}</p>
        </div>`
        $(`.topResults`).append(topAnimeHTML)
        console.log(topAnimeHTML)  
        
    })
}

app.displayAiringAnime = function(airingAnime) {
    
    airingAnime.forEach(function(anime) {
       
        const airingAnimeHTML = 
        `<div class="animeImages">
            <img src="${anime.image_url}" alt="${anime.rank}. ${anime.title}">
            <p>${anime.rank}. ${anime.title}</p>
        </div>`
        $(`.airingResults`).append(airingAnimeHTML)
        console.log(airingAnimeHTML)     
    })
}

app.displayRandAnime = function(randomAnime) {

        const randAnimeHTML = 
        `<div class="randAnimeImage">
            <img src="${randomAnime.image_url}" alt="${randomAnime.rank}. ${randomAnime.title}">
            <p>${randomAnime.rank}. ${randomAnime.title}</p>
        </div>`
        $(`.randAnime`).append(randAnimeHTML)
        console.log(randAnimeHTML)
}


app.init = function() {
            
        app.getTopAnime = function(){
            $.ajax({
            url: 'https://api.jikan.moe/v3/top/anime/1/bypopularity',
            method: 'GET',
            dataType: 'json'
        }).then(function(res) {
           // console.log("result of getting top images: ", res.top[0].image_url)
            
            const topAnimeArray = res.top.slice(0, 10)
            app.displayTopAnime(topAnimeArray)


        })
    }

    app.getTopAnime()

    app.getAiringAnime = function(){
        $.ajax({
            url:'https://api.jikan.moe/v3/top/anime/1/airing',
            method: 'GET',
            dataType: 'json'
        }).then(function(res) {
           // console.log("result of getting airing anime: ", res.top.slice(0,10))
            const airingAnime = res.top.slice(0,10)
            app.displayAiringAnime(airingAnime)
        })
    }

    app.getAiringAnime()

    app.getRandAnime = function() {
        $.ajax({
            url:'https://api.jikan.moe/v3/top/anime/1/',
            method: 'GET',
            dataType: 'json'
        }).then(function(res) {
            // console.log("result of getting top random anime: ", res.top)
            const randAnime = res.top;    
            let randNum = Math.floor(Math.random() * 51)
            app.displayRandAnime(randAnime[randNum])        
        })
    }

    $(`button`).on('click', function(e) {
        e.preventDefault()
        $(`.randAnime`).empty();
        console.log("form submitted")
        //app.displayRandAnime(randAnime[randNum])
        app.getRandAnime()
    })

    // $('.topResults').hover(function(e) {
    //     //e.preventDefault()
    //     const animeDetails = `<div class="selectedInfo"><p>hi</p></div>` 
    //     $(`.topResults`).append(animeDetails)
    //     $(animeDetails).show()
    //     // console.log(animeDetails)
    //    // $('.selectedInfo').append(animeDetails)
    //     //console.log(animeDetails)
    // }), (function(e){
    //     //e.preventDefault()
    //     $('div .selectedInfo').hide()
    // })
    

    
}


$(document).ready(function() {
    app.init()
})     


