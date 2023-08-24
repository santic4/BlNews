const apiKey = "zxwBFHWK4vLPPF8IFjilhAzqN2Kr-tHvF2Mk9yKJelWXtAGO";
const url = `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}`;

const categorySelect = document.getElementById("category");
const filterButton = document.getElementById("filterButton");
const newsContainer = document.getElementById("newsContainer");

//Llamada fetch
fetch(url)
  .then(response => response.json())
  .then(data => {
    const allNews = data.news;
    showNews(allNews);
    const uniqueCategories = getUniqueCategories(allNews);
    uniqueCategories.unshift("General"); // Agregar "General" como primera opción
    createSelectOptions(categorySelect, uniqueCategories);
  })
  .catch(error => {
    console.error('Error:', error);
  });


  function createFirstNewsSection(news) {
    let sectionContainer = document.createElement("section");
    sectionContainer.classList.add("first-news-container");
  
    let imageDiv = document.createElement("div");
    imageDiv.classList.add("news-image");
  
    let imageElement = document.createElement("img");

    if (news.image !== "None") {
      imageElement.src = news.image;
    } else {
      imageElement.src = "./img/logo.jpg";
    }
    imageDiv.appendChild(imageElement);
  
    let contentDiv = document.createElement("div");
    contentDiv.classList.add("news-content");
  
    let titleElement = document.createElement("h2");
    titleElement.textContent = news.title;
  
    let descriptionElement = document.createElement("p");
    descriptionElement.textContent = news.description;
    descriptionElement.classList.add("news-description-header");
    
  
    let categoryElement = document.createElement("p");
    categoryElement.textContent = `Categoría: ${news.category.map(capitalizeFirstLetter).join(", ")}`;
    categoryElement.classList.add("categoryElement-header");
    
    let publishedElement = document.createElement("p");
    publishedElement.textContent = `Publicado: ${news.published}`;
    publishedElement.classList.add("publishedElement-header");
    
  
    let urlElement = document.createElement("a");
    urlElement.href = news.url;
    urlElement.textContent = "Leer más";
    urlElement.target = "_blank";
  
    contentDiv.appendChild(titleElement);
    contentDiv.appendChild(descriptionElement);
    
    contentDiv.appendChild(urlElement);
  
    sectionContainer.appendChild(imageDiv);
    sectionContainer.appendChild(contentDiv);
  
    return sectionContainer;
  }

// Obtener las noticias del JSON y mostrar la primera noticia en el contenedor con id "firstNewsContainer"
fetch(url)
  .then(response => response.json())
  .then(data => {
    const allNews = data.news;
    console.log(data)
    showNews(allNews);

    // Encontrar la primera noticia con imagen disponible
    const firstNews = allNews.find(article => article.image !== "None");

    //encontrar economics news
    const econNews = allNews.filter(article => article.category.includes('politics') || article.category.includes('finance') || article.category.includes('politycs'));

    if (econNews && econNews.length > 0) {
      const economicsContainer = document.getElementById("economicsContainer");
      econNews.slice(0, 4).forEach(news => {
        const newsSection = createFirstNewsSection(news);
        economicsContainer.appendChild(newsSection);
      });
    } else {
      const seccionEconomia = document.getElementById("seccionEconomia");
      seccionEconomia.style.display = "none";
    }

    const sportNews = allNews.filter(article => article.category.includes('sports') || article.category.includes('entretainment'))

    if (sportNews && sportNews.length > 0) {
      const sportContainer = document.getElementById("sportContainer");
      sportNews.slice(0, 4).forEach(news => {
        const newsSection = createFirstNewsSection(news);
        sportContainer.appendChild(newsSection);
        console.log(sportNews)
      });
    } else {
      const seccionSports = document.getElementById("seccionSports");
      seccionSports.style.display = "none";
    }

    if (firstNews) {
      const firstNewsContainer = document.getElementById("firstNewsContainer");
      const firstNewsSection = createFirstNewsSection(firstNews);
      firstNewsSection.classList.add("mainCard");

      firstNewsContainer.appendChild(firstNewsSection);
    } else {
      console.log("No se encontró ninguna noticia con imagen disponible.");
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Función para convertir la primera letra de un string en mayúscula y el resto en minúscula
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Función para crear opciones en un elemento select a partir de un array de opciones
function createSelectOptions(selectElement, options) {
  options.forEach(option => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = capitalizeFirstLetter(option); // Convertir la primera letra en mayúscula
    selectElement.appendChild(optionElement);
  });
}

// Función para obtener las categorías únicas presentes en una lista de noticias
function getUniqueCategories(news) {
  const allCategories = news.reduce((categories, article) => {
    return categories.concat(article.category);
  }, []);
  return Array.from(new Set(allCategories));
}

// Función para mostrar las noticias en el contenedor de noticias
function showNews(newsData) {
  newsContainer.innerHTML = "";

  newsData.slice(1, 29).forEach((article, index) => {
    // Crear contenedor para cada noticia
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("news-item");

    // Crear contenedor para la imagen
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("news-image");
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    if(article.image == "None"){
      imageElement.src = "./img/logo.jpg"
    }
    imageDiv.appendChild(imageElement);

    // Crear elementos para el título, descripción, categoría, fecha y enlace de cada noticia
    const titleElement = document.createElement("h2");
    titleElement.textContent = article.title;
    titleElement.classList.add("news-tittle");

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = article.description;
    descriptionElement.classList.add("news-description");

   

    const urlElement = document.createElement("a");
    urlElement.href = article.url;
    urlElement.textContent = "Leer más";
    urlElement.target = "_blank";
    urlElement.classList.add("news-a");

    // Agregar los elementos al contenedor de la noticia
    newsDiv.appendChild(imageDiv);
    newsDiv.appendChild(titleElement);
    newsDiv.appendChild(descriptionElement);

    newsDiv.appendChild(urlElement);

    // Agregar el contenedor de la noticia al contenedor principal
    newsContainer.appendChild(newsDiv);
  });
}

// Función para filtrar las noticias por categoría
function filterNewsByCategory(category) {
  const noticias1 = document.getElementsByClassName("headerNews");
  const noticias2 = document.getElementById("seccionEconomia");
  const noticias3 = document.getElementById("seccionSports");

  // Si se selecciona la categoría "General", se muestran todas las noticias por defecto
  if (category === "General") {
      fetch(url)
          .then(response => response.json())
          .then(data => {
              const allNews = data.news;
              showNews(allNews);

              // Mostrar las secciones
              for (let i = 0; i < noticias1.length; i++) {
                  noticias1[i].style.display = "block";
              }
              noticias2.style.display = "block";
              noticias3.style.display = "block";
          })
          .catch(error => {
              console.error('Error:', error);
          });
  } else {
      // Si se selecciona otra categoría, se muestran las noticias correspondientes a esa categoría
      fetch(url)
          .then(response => response.json())
          .then(data => {
              const filteredNews = data.news.filter(
                  article => article.category.includes(category)
              );
              showNews(filteredNews);

              // Ocultar las secciones
              for (let i = 0; i < noticias1.length; i++) {
                  noticias1[i].style.display = "none";
              }
              noticias2.style.display = "none";
              noticias3.style.display = "none";
          })
          .catch(error => {
              console.error('Error:', error);
          });
  }
}

// Agregar evento al botón de filtrar para aplicar el filtro por categoría
filterButton.addEventListener("click", () => {
  const selectedCategory = categorySelect.value;
  if (selectedCategory !== "") {
    filterNewsByCategory(selectedCategory);
  }
});
