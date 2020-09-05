# Shopify Internship Challenge - Tim Rines

Welcome to my version of the Shopify Internship challenge! This project was built in a few days, only using functional components and react hooks on the <a href=https://github.com/tsrines/shoppies-front>front end</a>. The <a href=https://github.com/tsrines/shoppies-front>back end</a>, used to communicate with the OMDB API, is built with Ruby on Rails as an API using PostgreSQL for the database. Here is a working <a href=https://shoppies-front.netlify.app>demo!</a>.

After having so much fun with this project, I decided to re-write the front end using Redux and Thunk <a href='https://github.com/tsrines/shoppies-front/tree/redux'>(Code)</a>.

## The Assignment

### UX Developer Intern & Web Developer Intern Challenge - Winter 2021

The Shoppies: Movie awards for entrepreneurs

Shopify has branched out into movie award shows and we need your help. Please build us an app to help manage our movie nominations for the upcoming Shoppies.

### The Challenge

We need a webpage that can search OMDB for movies, and allow the user to save their favourite films they feel should be up for nomination. When they've selected 5 nominees they should be notified they're finished.

We'd like a simple to use interface that makes it easy to:
Search OMDB and display the results (movies only)
Add a movie from the search results to our nomination list
View the list of films already nominated
Remove a nominee from the nomination list

### Technical requirements

Search results should come from OMDB's API (free API key: <http://www.omdbapi.com/apikey.aspx>).
Each search result should list at least its title, year of release and a button to nominate that film.
Updates to the search terms should update the result list
Movies in search results can be added and removed from the nomination list.
If a search result has already been nominated, disable its nominate button.
Display a banner when the user has 5 nominations.

![Demo](https://github.com/tsrines/shoppies-front/blob/redux/src/ShoppiesDemo.png?raw=true)

### Extras

There is a lot to be improved on here, you can polish the required features by crafting a nicer design, or improve the app by adding new features! Choose something that you feel best showcases your passion and skills.

If you need inspiration, here are examples of what you can work on. If you work on these ideas, we recommend choosing only one or two.

1. Save nomination lists if the user leaves the page

2. Animations for loading, adding/deleting movies, notifications

3. Create shareable links
