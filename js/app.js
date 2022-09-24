const loadCategories = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data.news_category);
    }
    catch (error) {
        console.log(error)
    }

}


const displayCategories = categories => {
    const categoriesList = document.getElementById('categories-list');

    categories.forEach(category => {
        //console.log(category.category_name);

        const categoryItems = document.createElement('li');
        categoryItems.classList.add('nav-item', 'item-gap');
        categoryItems.innerHTML = `
        <button class="rounded-2 border-0 p-3" onclick='loadNews("${category.category_id}")'>${category.category_name}
        </button>
        `;
        categoriesList.appendChild(categoryItems);
    })

}



const loadNews = async (category_id) => {

    showSpinner(true);

    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data);
    } catch (error) {
        console.log(error);
    }

}



const displayNews = allNewsInCategory => {

    const allNews = document.getElementById('all-news');
    allNews.innerHTML = ``;

    allNewsInCategory.sort((x, y) => y.total_view - x.total_view);

    allNewsInCategory.forEach(news => {
        console.log(news);

        const categoryItems = document.createElement('col');
        categoryItems.innerHTML = `
        <div onclick="loadNewsDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailModal" class="card d-flex flex-row">
                    <img src="${news.thumbnail_url}" style="width:300px; height: 150px" class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text">${news.details.slice(0, 300)}...</p>
                        <div class="d-flex justify-content-evenly">
                        <div class="d-flex flex-row">
                        <img src="${news.author.img}" style="width:40px; height: 40px; border-radius: 50%;" class="card-img-top img-fluid img-rounded" alt="...">
                        <h6>&nbsp;${news.author.name}</h6>
                        </div>
                        <h4 class="card-title"><i class="fa-regular fa-eye"></i>&nbsp;${news.total_view}</h4>
                        </div>
                    </div>
                </div>
        `;
        allNews.appendChild(categoryItems);

    })


    const totalNews = document.getElementById('total-news');
    if (allNewsInCategory.length === 0) {
        totalNews.innerText = `No News Found`;
    } else {
        totalNews.innerText = allNewsInCategory.length + ` Items Found`;

    }

    showSpinner(false);

}



const showSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading) {
        spinnerSection.classList.remove('d-none');
    } else {
        spinnerSection.classList.add('d-none');
    }
}




const loadNewsDetails = async (news_id) => {

    try {
        const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data);
    }
    catch (error) {
        console.log(error);
    }

}




const displayNewsDetails = detailsNews => {
    //console.log(detailsNews[0]);
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = detailsNews[0].title;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
       <p><b>Details</b>: ${detailsNews[0].details ? detailsNews[0].details : 'No Details Information'}</p>
       <p><b>Author</b>: ${detailsNews[0].author.name ? detailsNews[0].author.name : 'No Name Available'}</p>
       <p><b>Date</b>: ${detailsNews[0].author.published_date ? detailsNews[0].author.published_date : 'No Date Available'}</p>
       <p><b>Total Views</b>: ${detailsNews[0].total_view ? detailsNews[0].total_view : 'No View Information'}</p>

    `;

}



