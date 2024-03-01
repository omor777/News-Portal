const btnContainer = document.getElementById("btn-container");
const newsContainer = document.getElementById("news-container");
const newsPlaceholder = document.getElementById("news-placeholder");
const todaysPickBtn = document.getElementById("todays-pick-btn");
const trendingBtn = document.getElementById("trending-btn");

//global variable
let categoryId = "08";
//change active button color
const loadCategoryButton = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/categories`
  );
  const data = await res.json();
  const categories = data.data.news_category;
  categories.forEach((category) => {
    const newButton = document.createElement("button");
    newButton.classList = `text-lg duration-500 font-semibold ${
      category.category_name === "All News" ? "text-primary" : "text-black/50"
    }`;
    newButton.innerText = category.category_name;
    newButton.addEventListener("click", (e) => {
      displayNews(category.category_id, null, null, category.category_name);
      //handle active button color
      const categoryButtons = btnContainer.querySelectorAll("button");
      categoryButtons.forEach((btn) => {
        btn.classList.remove("text-primary");
        btn.classList.add("text-black/50");
      });
      e.currentTarget.classList.add("text-primary");
      e.currentTarget.classList.remove("text-black/50");
    });
    btnContainer.appendChild(newButton);
  });
};

/**
 *
 * @param {Array} category
 * @param {String} categoryName
 */
const showTotalCategoryAndName = (category, name = "All News") => {
  document.getElementById("total-item").innerText = category.length;
  document.getElementById("category-name").innerText = name;
};

const displayNews = async (...args) => {
  console.log(args);
  const [categoryId, isTodaysPick, isTrending, categoryName] = args;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${categoryId}`
  );
  const data = await res.json();
  let newsCategories = data.data;

  newsContainer.innerHTML = "";

  //show category name and total category
  showTotalCategoryAndName(newsCategories, categoryName);

  //show placeholder when news not available
  if (newsCategories.length === 0) {
    newsPlaceholder.classList.remove("hidden");
  } else {
    newsPlaceholder.classList.add("hidden");
  }
  // handle todays pick news and trending news
  if (isTodaysPick) {
    newsCategories = newsCategories.filter(
      (category) => category?.others_info?.is_todays_pick
    );
  } else if (isTrending) {
    newsCategories = newsCategories.filter(
      (category) => category?.others_info?.is_trending
    );
  }
  newsCategories.forEach((news) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="grid grid-cols-[auto_1fr] p-5 bg-white rounded-xl gap-10">
    <figure>
      <img
        class="w-full max-w-[244px] h-full object-cover rounded-md"
        src="${news.thumbnail_url}"
        alt=""
      />
    </figure>
    <!-- card body -->
    <div>
      <div>
        <h2 class="font-bold text-black/80 text-2xl">
          ${news.title}
        </h2>
      </div>
      <p class="text-black/70 mt-3">
       ${news.details.slice(0, 250)}
      </p>
      <p class="text-black/70 mt-3">
       ${news.details.slice(250, 500)}
      </p>
      <div class="flex items-center justify-between mt-5">
        <div class="grid grid-cols-[auto_1fr] gap-3">
          <img class="size-10 rounded-full border-4 border-primary" src="${
            news?.author?.img
          }" />
          <div>
            <h4>${news?.author?.name ?? "Not Available!"}</h4>
            <time class="text-sm capitalize text-[#718797]"
              >${news?.author?.published_date ?? "Not Available!"}</time
            >
          </div>
        </div>
        <div class="flex items-center gap-3">
          <i class="fa-regular fa-eye text-xl"></i>
          <span class="font-bold text-lg text-black/60">${
            news?.total_view ?? 0
          }</span>
        </div>
        <p class="font-medium">${news?.rating?.badge}</p>
        <div class="flex items-center gap-4">
          <div class="rating rating-md">
            <input
              type="radio"
              name="rating-7"
              class="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-7"
              class="mask mask-star-2 bg-orange-400"
              checked
            />
            <input
              type="radio"
              name="rating-7"
              class="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-7"
              class="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-7"
              class="mask mask-star-2 bg-orange-400"
            />
          </div>
          <span class="text-lg font-semibold">${news?.rating?.number}</span>
        </div>
        <button class="text-3xl">
          <i class="fa-solid fa-arrow-right text-primary"></i>
        </button>
      </div>
    </div>
  </div>
    
    `;
    newsContainer.appendChild(div);
  });
};

todaysPickBtn.addEventListener("click", function () {
  displayNews(categoryId, true);
});

trendingBtn.addEventListener("click", () => {
  displayNews(categoryId, null, true);
});

displayNews(categoryId);
loadCategoryButton();

