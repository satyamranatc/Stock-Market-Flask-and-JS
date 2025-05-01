Stock Market Info Viewer
A sleek, dark-themed application for viewing real-time stock market information for popular companies around the world.
Show Image
Features

Dark Theme UI: Modern, eye-friendly interface designed for extended use
Real-time Data: Up-to-date financial information powered by Yahoo Finance API
Comprehensive Information: View everything from basic price data to in-depth financial metrics
Responsive Design: Works seamlessly on desktop and mobile devices
Visual Indicators: Color-coded values and intuitive categorization
Clean Data Presentation: Neatly organized information with proper formatting

Technologies Used
Backend

Python 3.x
Flask (Web framework)
Flask-CORS (Cross-Origin Resource Sharing)
yfinance (Yahoo Finance API wrapper)

Frontend

HTML5
CSS3 (with modern features)
JavaScript (ES6+)
Font Awesome icons

Project Structure
/stock-market-viewer
├── Api.py              # Flask backend server
├── frontend/           # Frontend web application
    ├── Main.html       # HTML structure
    ├── Main.css        # CSS styling
    ├── Main.js         # JavaScript functionality
Installation & Setup
Prerequisites

Python 3.x
pip (Python package manager)

Setting up the Backend

Clone the repository:
bashgit clone https://github.com/yourusername/stock-market-viewer.git
cd stock-market-viewer

Install the required Python packages:
bashpip install flask flask-cors yfinance

Run the Flask server:
bashpython Api.py
The server will start at http://127.0.0.1:5000

Setting up the Frontend

Open the frontend by Liver server, Easy

Usage

Select a company from the dropdown menu
Click the "Get Data" button
View the comprehensive financial information displayed in organized categories
Each data category is expandable and includes relevant metrics

Data Categories
The application organizes financial information into the following categories:

Price Information: Current price, previous close, daily high/low, etc.
Company Information: Name, CEO, founder, employees count, etc.
Location: Address, city, state, country, etc.
Financial Metrics: Market cap, PE ratio, EPS, etc.
Balance Sheet: Total cash, debt, debt-to-equity ratio, etc.
Profitability: Revenue, gross profits, margins, etc.
Dividends: Yield, dates, annual rate, etc.
Other Metrics: Beta, recommendation, target price, etc.

API Endpoints
The backend provides two main API endpoints:

GET /api/companies: Returns a list of available companies
GET /api/company-data?symbol={symbol}: Returns detailed financial data for the specified stock symbol

Customization
You can easily customize the application:

Add more companies to the companies dictionary in Api.py
Modify the CSS variables in Main.css to change the color scheme
Add additional metrics by updating the processAndDisplayData() function in Main.js

License
This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments

Data provided by Yahoo Finance API
Icons from Font Awesome
Inter font from Google Fonts

Future Improvements

Add historical price charts
Implement comparison feature for multiple stocks
Add watchlist functionality
Include news feed related to selected company
Add user authentication for personalized experience


