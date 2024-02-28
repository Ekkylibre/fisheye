function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        img.setAttribute("aria-label", portrait);

        const h2 = document.createElement('h2');
        h2.innerText = name;
        h2.setAttribute("aria-label", name);

        const locationWrapper = document.createElement('div'); // Créer une div parent
        locationWrapper.classList.add('location');

        const City = document.createElement('p');
        City.innerText = `${city},`;
        City.classList.add('from')
        City.setAttribute("aria-label", city);

        const Country = document.createElement('p');
        Country.innerText = `${country}`;
        Country.classList.add('from')
        Country.setAttribute("aria-label", country);

        locationWrapper.appendChild(City); // Ajouter la ville à la div parent
        locationWrapper.appendChild(Country);

        const Tagline = document.createElement('p');
        Tagline.innerText = `${tagline}`;
        Tagline.classList.add('tagline')
        Tagline.setAttribute("aria-label", tagline)

        const Price = document.createElement('p');
        Price.innerText = `${price}€/jour`;
        Price.classList.add('price')
        Price.setAttribute("aria-label", price)

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(locationWrapper);
        article.appendChild(Tagline);
        article.appendChild(Price);
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM };
}