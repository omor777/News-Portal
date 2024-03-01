const btnContainer = document.getElementById("btn-container");
const newsContainer = document.getElementById("news-container");

let categoryId = "08";

const loadCategoryButton = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/categories`
  );
  const data = await res.json();
  const categories = data.data.news_category;
  categories.forEach((category) => {
    const newButton = document.createElement("button");
    newButton.classList = `text-lg text-black/50`;
    newButton.innerText = category.category_name;
    btnContainer.appendChild(newButton);
  });
};

const displayNews = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${categoryId}`
  );
  const data = await res.json();
  const newsCategories = data.data;
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
       ${news.details.slice(250,500)}
      </p>
      <div class="flex items-center justify-between mt-5">
        <div class="grid grid-cols-[auto_1fr] gap-3">
          <img class="size-10 rounded-full border-4 border-primary" src="${
            news?.author?.img
          }" />
          <div>
            <h4>${news?.author?.name ?? 'Not Available!'}</h4>
            <time class="text-sm capitalize text-[#718797]"
              >${news?.author?.published_date ?? 'Not Available!'}</time
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

displayNews(categoryId);
loadCategoryButton();

