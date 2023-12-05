# Brewery Review System

This project creates a web application using Django, HTML, CSS, Bootstrap, and Brewery APIs to search breweries by city and allow users to add reviews. The application also includes user authentication functionalities. The project is hosted and deployed ond [MY Site](https://gaurav97.pythonanywhere.com/).

## Features

1. **User Authentication:** Sign-up for new users and login for existing users to access the system.
2. **Brewery Search:** Search breweries by city, name, and type using Brewery APIs.
3. **Search Results:** Display essential brewery details:
   - Brewery name
   - Address
   - Phone number
   - Website URL
   - Current rating (based on user reviews)
   - State and City
4. **Brewery Information Page:** Detailed page with:
   - Comprehensive brewery information
   - Ability for users to add reviews
   - Review storage in a hosted SQLite database (default of Django)
   - Display of reviews on the brewery info page
5. **Reviews:** Reviews include:
   - Rating from 1-5
   - Description

## Usage

1. **Installation:**
   - Clone the repository:

     ```bash
     git clone https://github.com/gauravpatil97886/BraverryShopProject.git
     ```

2. **Environment Setup:** Set up the required environment variables.
3. **Running the App:** Run the Django server and navigate to `https://localhost:8000`.
4. **Django Superuser:** Create a Django superuser to access the project.

## Technologies Used

- **Backend:** Django
- **Frontend:** HTML, CSS, Bootstrap
- **Database:** SQLite (default of Django)
- **API:** Brewery APIs ([Open Brewery DB](https://www.openbrewerydb.org/documentation))

## Deployment

The project is hosted and deployed on [PythonAnywhere](https://gaurav97.pythonanywhere.com/).

## Contributing

Contributions are welcome! If you'd like to enhance the project or report issues, please create a pull request or raise an issue in the repository.

## Credits

This project utilizes the Brewery APIs available at [Open Brewery DB](https://www.openbrewerydb.org/documentation).
