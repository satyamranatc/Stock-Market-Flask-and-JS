import yfinance as yf
from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5500"}})

# List of 20 famous companies
companies = {
    "AAPL": "Apple Inc.",
    "MSFT": "Microsoft Corp.",
    "GOOGL": "Alphabet Inc.",
    "AMZN": "Amazon.com Inc.",
    "TSLA": "Tesla Inc.",
    "META": "Meta Platforms Inc.",
    "NFLX": "Netflix Inc.",
    "NVDA": "NVIDIA Corp.",
    "BRK-B": "Berkshire Hathaway Inc.",
    "JNJ": "Johnson & Johnson",
    "JPM": "JPMorgan Chase & Co.",
    "V": "Visa Inc.",
    "PG": "Procter & Gamble Co.",
    "DIS": "Walt Disney Co.",
    "PFE": "Pfizer Inc.",
    "KO": "Coca-Cola Co.",
    "PEP": "PepsiCo Inc.",
    "TCS.NS": "Tata Consultancy Services (India)",
    "INFY.NS": "Infosys Ltd (India)",
    "RELIANCE.NS": "Reliance Industries (India)"
}

# API to get list of companies
@app.route('/api/companies', methods=['GET'])
def get_companies():
    return jsonify(companies)

# API to get data for selected company
@app.route('/api/company-data', methods=['GET'])
def get_company_data():
    symbol = request.args.get('symbol')
    if not symbol:
        return jsonify({"error": "Symbol is required"}), 400

    try:
        ticker = yf.Ticker(symbol)
        info = ticker.info

        # Gathering additional data points
        data = {
            "Company Name": info.get('longName'),
            "Sector": info.get('sector'),
            "Industry": info.get('industry'),
            "Market Cap": info.get('marketCap'),
            "PE Ratio (TTM)": info.get('trailingPE'),
            "EPS (TTM)": info.get('trailingEps'),
            "Revenue": info.get('totalRevenue'),
            "Gross Profits": info.get('grossProfits'),
            "Profit Margins": info.get('profitMargins'),
            "Operating Margins": info.get('operatingMargins'),
            "Dividend Yield": info.get('dividendYield'),
            "52-Week High": info.get('fiftyTwoWeekHigh'),
            "52-Week Low": info.get('fiftyTwoWeekLow'),
            "Beta": info.get('beta'),
            "Shares Outstanding": info.get('sharesOutstanding'),
            
            "Current Price": info.get('currentPrice'),
            "Previous Close": info.get('previousClose'),
            "Open Price": info.get('open'),
            "Day's Low": info.get('dayLow'),
            "Day's High": info.get('dayHigh'),
            
            "Total Cash": info.get('totalCash'),
            "Total Debt": info.get('totalDebt'),
            "Debt to Equity": info.get('debtToEquity'),
            "Current Ratio": info.get('currentRatio'),
            
            "Recommendation": info.get('recommendationKey'),
            "Target Mean Price": info.get('targetMeanPrice'),
            
            # Additional company financials and other information
            "Country": info.get('country'),
            "Currency": info.get('currency'),
            "Price To Book": info.get('priceToBook'),
            "Forward PE": info.get('forwardPE'),
            "PEG Ratio": info.get('pegRatio'),
            "Annual Dividend": info.get('dividendRate'),
            "Dividend Date": info.get('dividendDate'),
            "Earnings Date": info.get('earningsDate'),
            "Ex-Dividend Date": info.get('exDividendDate'),
            "Employees": info.get('fullTimeEmployees'),
            "Website": info.get('website'),
            "Address": info.get('address1'),
            "City": info.get('city'),
            "State": info.get('state'),
            "Zip": info.get('zip'),
            "Phone": info.get('phone'),
            "CEO": info.get('ceo'),
            "CFO": info.get('cfo'),
            "Founder": info.get('founders'),
            "Founded": info.get('yearFounded'),
            "Company Overview": info.get('companyOfficers'),
        }
        
        return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
