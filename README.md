# KICC MaxOut 2024 Raffle App 🎉

This web application was used during **KICC MaxOut 2024** for the exciting raffle session. It was built with ❤ and a focus on delivering a fun and engaging experience for all attendees.

The app displays raffle codes in a rotating manner, creating anticipation for the winners, complete with visual effects like confetti 🎉 to celebrate each draw.

## Link to Deployed App
[**Rafflizer**](https://rafflizer.netlify.app/)

## Features
- 🎰 **Raffle Draw**: Randomly picks a raffle code from the loaded list of codes.
- 🎉 **Confetti Animation**: Confetti effects to celebrate the winner.
- 📋 **Code Upload**: Allows users to upload a list of unique raffle codes.
- 🎲 **Shuffling Animation**: Each raffle code is presented with a shuffling effect before the final reveal.
- 💻 **Responsive Design**: Works seamlessly across desktop and mobile devices.

## Technology Stack
- **Framework**: Angular 16+
- **UI Library**: PrimeNG & Tailwind CSS
- **Hosting**: Netlify

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [Angular CLI](https://angular.io/cli)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Jordy-Kmf/maxout-raffle.git
    ```

2. Navigate to the project directory:
    ```bash
    cd maxout-raffle
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    ng serve
    ```

5. Open your browser and go to `http://localhost:4200` to view the app.

### Build for Production

To build the app for production, run the following command:
```bash
ng build --configuration production
```
This will create a production-ready build in the `dist/` folder.

### Deployment

The app is deployed on Netlify. To deploy the app manually, follow these steps:

1. **Build the project**:
   ```bash
   ng build --configuration production
   ```

2. **Deploy to Netlify**:
   Drag and drop the contents of the `dist/maxout-raffle` folder into Netlify’s deployment interface or configure automatic deployments using a Git repository.

## How It Works

1. Upload the list of unique raffle codes in the app.
2. The app will shuffle through the codes and select one at random.
3. Confetti will rain down to celebrate the lucky winner.
4. Repeat for the next winner!

## Future Improvements
- Add support for customizable shuffle speeds.
- Introduce a countdown timer for each draw.
- Export the list of winners to a CSV file.

## Contribution

If you'd like to contribute to the app, feel free to fork the repository and submit a pull request. All contributions are welcome!

## Special Thanks
- [canvas-confetti](https://github.com/catdad/canvas-confetti?tab=readme-ov-file#readme)
