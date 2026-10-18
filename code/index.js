

function removeBtnClass() {
    const activeClass = document.getElementsByClassName("active")



    for (let btn of activeClass) {
        btn.classList.remove('active')
    }
}


function showLoader() {
    document.getElementById("load").classList.remove('hidden')
    document.getElementById("card-container").classList.add('hidden')
}

function hiddenLoader() {
    document.getElementById("load").classList.add('hidden')
    document.getElementById("card-container").classList.remove('hidden')
}




document.getElementById('faq-btn').addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("faq").scrollIntoView({
        behavior: "smooth"
    });
});


document.getElementById('learn-btn').addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("learn").scrollIntoView({
        behavior: "smooth"
    });
});



document.getElementById('LogIn-btn').addEventListener("click", () => {
    const passwordValue = document.getElementById("password").value;
    const nameValue = document.getElementById("name").value;

    if (!nameValue) {
        alert("Please Enter Your Name");
    }
    else if (!passwordValue) {
        alert("Please Enter Your Password");
    }
    else if (passwordValue !== "123") {
        alert("Wrong Password! Contact admin to get your login code");
    }
    else {
        showHidden();
    }
});





const showHidden = () => {
    document.getElementById("header-nav").classList.remove("hidden");
    document.getElementById("learn").classList.remove("hidden");
    document.getElementById("faq").classList.remove("hidden");
    document.getElementById("banner-section").classList.add("hidden");
}





// Load Catergory

const loadLesson = () => {

    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(data => displayLesson(data.data));

}




function loadCardDetails(detailsId) {
    const url = `https://openapi.programming-hero.com/api/word/${detailsId}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayCardDetails(data.data));
}



function displayCardDetails(details) {
    document.getElementById("details-modal").showModal();

    const detailsContainer = document.getElementById("details-container")


    const synonymBtn = details.synonyms.map(s => `<button class="btn bg-[#D7E4EF]">${s}</button>`).join("");

    const meaningHtml = details.meaning ? `<h2 class="font-semibold pt-2">${details.meaning}</h2>` : `<span class="font-semibold">অর্থ পাওয়া যায়নি</span>`;


    detailsContainer.innerHTML = `

            <h1 class="font-bold text-2xl">${details.word}</h1>
            <h2 class="font-bold pt-5">Meaning</h2>
            ${meaningHtml}
            <h2 class="font-bold pt-5">Example</h2>
            <h2 class="pt-2">${details.sentence}</h2>
            <h2 class="font-semibold pt-5">সমার্থক শব্দ গুলো</h2>

            <div class="pt-2 space-x-2">${synonymBtn}</div>
            
    
    `;
}





function loadCard(cardId) {

    showLoader()
    const url = `https://openapi.programming-hero.com/api/level/${cardId}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            removeBtnClass()
            const clickedButton = document.getElementById(`btn-${cardId}`)


            clickedButton.classList.add("active")

            displayCard(data.data)
        });
}





// Display Category

const displayLesson = (lessonName) => {
    const lessonContainer = document.getElementById("lesson-btn");

    for (let lName of lessonName) {
        const lessonDiv = document.createElement('div')

        lessonDiv.innerHTML = `
        <button id="btn-${lName.level_no}" onclick="loadCard(${lName.level_no})" class="btn border-[#422AD5] border-2 text-[#422AD5] hover:text-white hover:bg-[#422AD5]"><i
                                class="fa-solid fa-book-open"></i>${lName.lessonName}</button>
        `

        lessonContainer.append(lessonDiv);
    };
}







function displayCard(cards) {
    const cardContainer = document.getElementById("card-container")

    cardContainer.innerHTML = '';




    if (cards.length === 0) {
        cardContainer.innerHTML = `

        <div class="col-span-3 text-center justify-items-center py-5">
                            <img class="pb-5" src="/assets/alert-error.png" alt="">
                            <h4 class="font-semibold text-[13px] text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h4>
                            <h2 class="text-3xl mt-5 font-semibold">নেক্সট <span class="font-bold">Lesson</span> এ যান</h2>
                        </div>
        
        `
    }



    cards.forEach((card) => {
        const cardDiv = document.createElement('div')


        const meaningHtml = card.meaning ? `<span class="">${card.meaning}</span>` : `<span class="">অর্থ নেই</span>`;

        cardDiv.innerHTML = `
        <div class="card bg-white w-100">
                            <div class="border p-5 rounded-lg border-none">
                            <div class="card-body text-center border border-gray-200 hover:bg-blue-50 transition duration-500 rounded-lg">
                                <h2 class="font-bold text-3xl">${card.word}</h2>
                                <p class="font-semibold">Meaning /Pronounciation</p>
                                <p class="font-semibold text-xl pt-3">"${meaningHtml} / ${card.pronunciation}"</p>

                                <div class="flex justify-between pt-5">
                                <button onclick="loadCardDetails(${card.id})" class="btn"><i class="fa-solid fa-circle-info"></i></button>
                                <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                            </div>
                            </div>
                        </div>
        `

        cardContainer.append(cardDiv)
    });

    hiddenLoader()
}




loadLesson()