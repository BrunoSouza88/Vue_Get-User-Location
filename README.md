# **Get User Location** 🌎

## **Description** 🚀
Vue Get User Location is a project that uses the Vue.js framework to create a web application that allows users to get their current location. The application uses the Geolocation API to retrieve the user's latitude and longitude, and displays it on the screen.

## **Technologies Used** 🛠️
The project is built using the following technologies:

- Vue.js
- Geolocation API

## **Features** ✨
- Retrieves the user's current location using the Geolocation API.
- Displays the user's latitude and longitude on the screen.

## **Getting Started** 🚀
To run the project locally, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/BrunoSouza88/Vue_Get-User-Location.git
```
2. Navigate to the project directory:
```bash
cd Vue_Get-User-Location
```
3. Install the dependencies:
```bash
npm install
```
4. Generate your own Google API key by going to [Google Cloud Console](https://console.cloud.google.com/). Follow these steps to generate your key:
    1. Sign in to your Google account.
    2. Click on the project drop-down and select or create a new project.
    3. On the left side menu, click on "Credentials".
    4. Click on "+ CREATE CREDENTIALS" and select "API key".
    5. Copy your newly generated API key.
5. Replace `[Your_KEY]` in `<script src='https://maps.googleapis.com/maps/api/js?libraries=places&key=[Your_KEY]'></script>` in `index.html` with your copied API key.
6. Replace `"YOUR KEY"` in `VUE_APP_GOOGLE_API_KEY: '"YOUR KEY"'` in `/config/prod.env.js` with your copied API key.
7. Start the development server:
```bash
npm run dev
```
Access the application in your browser at http://localhost:8080.

## **Contribution** 🤝
Contributions to this project are welcome. If you find any issues or have ideas for improvements, feel free to open an issue or create a pull request. Your feedback is valuable and greatly appreciated.

To contribute, follow these steps:

1. Fork this repository.
2. Create a new branch for your feature (git checkout -b feature/MyFeature).
3. Make necessary changes and commit (git commit -m 'Adding my feature').
4. Push to the created branch (git push origin feature/MyFeature).
5. Open a pull request.

Be sure to adhere to the project's coding standards and practices.

## **License** 📜
This project is licensed under the MIT License - see the LICENSE file for details.

## **Contact** 📧
If you have any questions or suggestions, feel free to contact me:

Bruno Souza
Email: bmsouza88@gmail.com
