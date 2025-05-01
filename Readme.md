# Stock Market Info Viewer

A sleek, dark-themed application for viewing real-time stock market information for popular companies around the world.

![Stock Market Viewer](https://via.placeholder.com/800x400.png?text=Stock+Market+Viewer)

## Features

- **Dark Theme UI**: A modern, eye-friendly interface designed for extended use.
- **Real-time Data**: Stay up-to-date with financial information powered by the Yahoo Finance API.
- **Comprehensive Information**: View everything from basic price data to in-depth financial metrics.
- **Responsive Design**: Enjoy seamless functionality across both desktop and mobile devices.
- **Visual Indicators**: Color-coded values and intuitive categorization for better user experience.
- **Clean Data Presentation**: Neatly organized and well-formatted financial data for easy consumption.

## Technologies Used

### Backend
- **Python 3.x**
- **Flask**: Lightweight web framework for building the backend server.
- **Flask-CORS**: To handle Cross-Origin Resource Sharing (CORS) issues.
- **yfinance**: A wrapper for Yahoo Finance API to fetch stock market data.

### Frontend
- **HTML5**
- **CSS3**: Modern CSS features for styling.
- **JavaScript (ES6+)**: For dynamic functionality.
- **Font Awesome**: To use icons for a clean and appealing design.

## Project Structure

```
/stock-market-viewer
├── Api.py              # Flask backend server
├── frontend/           # Frontend web application
    ├── Main.html       # HTML structure
    ├── Main.css        # CSS styling
    ├── Main.js         # JavaScript functionality
```

## Installation & Setup

### Prerequisites
- Python 3.x
- pip (Python package manager)

### Setting up the Backend

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/stock-market-viewer.git
   cd stock-market-viewer
   ```

2. **Install the required Python packages**:
   ```bash
   pip install flask flask-cors yfinance
   ```

3. **Run the Flask server**:
   ```bash
   python Api.py
   ```
   The server will start at [http://127.0.0.1:5000](http://127.0.0.1:5000).

### Setting up the Frontend

1. Open the `frontend` folder and use any simple live server extension or host it locally to view the website.

2. You can use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for Visual Studio Code for easy live reloading.

## Usage

1. Select a company from the dropdown menu.
2. Click the "Get Data" button.
3. View the comprehensive financial information displayed in neatly organized categories.
4. Each data category is expandable and includes relevant metrics.

## Data Categories

The application organizes financial information into the following categories:

- **Price Information**: Current price, previous close, daily high/low, etc.
- **Company Information**: Name, CEO, founder, employees count, etc.
- **Location**: Address, city, state, country, etc.
- **Financial Metrics**: Market cap, PE ratio, EPS, etc.
- **Balance Sheet**: Total cash, debt, debt-to-equity ratio, etc.
- **Profitability**: Revenue, gross profits, margins, etc.
- **Dividends**: Yield, dates, annual rate, etc.
- **Other Metrics**: Beta, recommendation, target price, etc.

## API Endpoints

The backend provides two main API endpoints:

- **GET /api/companies**: Returns a list of available companies.
- **GET /api/company-data?symbol={symbol}**: Returns detailed financial data for the specified stock symbol.

## Customization

You can easily customize the application to fit your needs:

- Add more companies by updating the companies dictionary in `Api.py`.
- Modify the CSS variables in `Main.css` to change the color scheme.
- Add additional metrics by updating the `processAndDisplayData()` function in `Main.js`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data provided by [Yahoo Finance API](https://www.yahoofinanceapi.com/).
- Icons from [Font Awesome](https://fontawesome.com/).
- Inter font from [Google Fonts](https://fonts.google.com/).

## Future Improvements

- Add historical price charts.
- Implement a comparison feature for multiple stocks.
- Add watchlist functionality.
- Include a news feed related to the selected company.
- Add user authentication for personalized experience.

---
