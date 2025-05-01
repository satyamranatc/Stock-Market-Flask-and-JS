// Dark Theme Stock Market Viewer
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const companySelect = document.getElementById('companySelect');
    const fetchButton = document.getElementById('fetchButton');
    const dataDisplay = document.getElementById('dataDisplay');
    const loader = document.getElementById('loader');

    // Initialize
    fetchCompanies();
    
    // Event listeners
    fetchButton.addEventListener('click', fetchData);
    
    // Fetch companies list
    async function fetchCompanies() {
        try {
            showLoader();
            const response = await fetch('http://127.0.0.1:5000/api/companies');
            
            if (!response.ok) {
                throw new Error('Failed to fetch companies');
            }
            
            const companies = await response.json();
            populateCompanySelect(companies);
        } catch (error) {
            showErrorMessage(error.message);
        } finally {
            hideLoader();
        }
    }
    
    // Populate companies dropdown
    function populateCompanySelect(companies) {
        companySelect.innerHTML = '<option value="">Select a company...</option>';
        
        for (let symbol in companies) {
            const option = document.createElement('option');
            option.value = symbol;
            option.textContent = `${companies[symbol]} (${symbol})`;
            companySelect.appendChild(option);
        }
        
        // Add animation for dropdown
        companySelect.classList.add('loaded');
    }
    
    // Fetch data for selected company
    async function fetchData() {
        const symbol = companySelect.value;
        
        if (!symbol) {
            showNotification('Please select a company first', 'error');
            return;
        }
        
        try {
            showLoader();
            dataDisplay.textContent = '';
            
            const response = await fetch(`http://127.0.0.1:5000/api/company-data?symbol=${symbol}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch company data');
            }
            
            const data = await response.json();
            processAndDisplayData(data);
            
        } catch (error) {
            showErrorMessage(error.message);
        } finally {
            hideLoader();
        }
    }
    
    // Process and display data with enhanced visualization
    function processAndDisplayData(data) {
        // Fix object object issue
        if (Array.isArray(data["Company Overview"])) {
            data["Company Overview"] = "Officers Count: " + data["Company Overview"].length;
        }

        // Fix timestamp fields
        ["Dividend Date", "Ex-Dividend Date"].forEach(key => {
            if (data[key] && !isNaN(data[key])) {
                let date = new Date(data[key] * 1000); // convert UNIX timestamp
                data[key] = date.toLocaleDateString();
            }
        });

        // Enhanced visualization with categorized data
        let html = '';
        
        // Company header with price information
        html += `
        <div class="company-header">
            <div class="company-info">
                <div class="company-name">${data["Company Name"]}</div>
                <div class="company-details">
                    <span>${data["Symbol"] || companySelect.value}</span>
                    <span>${data["Sector"]}</span>
                    <span>${data["Industry"]}</span>
                </div>
            </div>
            <div class="price-info">
                <div class="current-price">${formatNumber(data["Current Price"])}</div>
                <div class="price-change ${data["Current Price"] > data["Previous Close"] ? 'positive' : 'negative'}">
                    ${data["Current Price"] > data["Previous Close"] ? '▲' : '▼'} 
                    ${Math.abs(data["Current Price"] - data["Previous Close"]).toFixed(2)} 
                    (${Math.abs(((data["Current Price"] - data["Previous Close"]) / data["Previous Close"]) * 100).toFixed(2)}%)
                </div>
            </div>
        </div>`;

        // Create categories
        const categories = {
            "Price Information": ["Current Price", "Previous Close", "Open Price", "Day's High", "Day's Low", "52-Week High", "52-Week Low"],
            "Company Information": ["Company Name", "CEO", "CFO", "Founder", "Founded", "Employees", "Website"],
            "Location": ["Address", "City", "State", "Zip", "Country", "Phone"],
            "Financial Metrics": ["Market Cap", "PE Ratio (TTM)", "Forward PE", "EPS (TTM)", "PEG Ratio", "Price To Book"],
            "Balance Sheet": ["Total Cash", "Total Debt", "Debt to Equity", "Current Ratio"],
            "Profitability": ["Revenue", "Gross Profits", "Operating Margins", "Profit Margins"],
            "Dividends": ["Dividend Yield", "Annual Dividend", "Dividend Date", "Ex-Dividend Date"],
            "Other Metrics": ["Beta", "Shares Outstanding", "Recommendation", "Target Mean Price", "Currency", "Company Overview"]
        };

        // Generate HTML for each category
        for (const [category, keys] of Object.entries(categories)) {
            // Check if category has data
            const hasData = keys.some(key => data[key] !== undefined && data[key] !== null);
            if (!hasData) continue;
            
            // Category icon mapping
            const iconMap = {
                "Price Information": "📊",
                "Company Information": "🏢",
                "Location": "📍",
                "Financial Metrics": "💹",
                "Balance Sheet": "📑",
                "Profitability": "💰",
                "Dividends": "💵",
                "Other Metrics": "🔍"
            };

            html += `<div class="data-card">
                <div class="data-category">
                    <span class="data-category-icon">${iconMap[category]}</span>
                    <span class="data-category-title">${category}</span>
                </div>
                <div class="data-grid">`;

            // Add data items for this category
            keys.forEach(key => {
                if (data[key] !== undefined && data[key] !== null) {
                    let valueClass = "";
                    let displayValue = data[key];
                    
                    // Format numbers
                    if (typeof displayValue === 'number') {
                        // Format currency values
                        if (key.includes("Price") || key.includes("Cash") || key.includes("Debt") || 
                            key.includes("Cap") || key.includes("Profits") || key.includes("Revenue")) {
                            displayValue = formatCurrency(displayValue);
                        } else if (key.includes("Margins") || key.includes("Yield")) {
                            // Format percentages
                            displayValue = (displayValue * 100).toFixed(2) + '%';
                        } else {
                            // Format other numbers
                            displayValue = formatNumber(displayValue);
                        }
                    }
                    
                    // Add color classes
                    if (key.includes("Margins") || key.includes("Profits") || key === "EPS (TTM)") {
                        valueClass = parseFloat(data[key]) > 0 ? "positive" : "negative";
                    }
                    
                    // Highlight important metrics
                    if (key === "Recommendation" || key === "Target Mean Price") {
                        valueClass = "highlight";
                    }
                    
                    html += `<div class="data-item">
                        <span class="data-label">${key}</span>
                        <span class="data-value ${valueClass}">${displayValue}</span>
                    </div>`;
                }
            });

            html += `</div></div>`;
        }

        // Display the enhanced content
        dataDisplay.innerHTML = html;
        
        // Add a subtle fade-in effect
        dataDisplay.style.opacity = 0;
        setTimeout(() => {
            dataDisplay.style.transition = 'opacity 0.5s ease';
            dataDisplay.style.opacity = 1;
        }, 100);
    }
    
    // Format number with commas for thousands
    function formatNumber(number) {
        if (number === null || number === undefined) return 'N/A';
        
        if (Math.abs(number) >= 1e12) {
            return (number / 1e12).toFixed(2) + 'T';
        } else if (Math.abs(number) >= 1e9) {
            return (number / 1e9).toFixed(2) + 'B';
        } else if (Math.abs(number) >= 1e6) {
            return (number / 1e6).toFixed(2) + 'M';
        } else if (Math.abs(number) >= 1e3) {
            return (number / 1e3).toFixed(2) + 'K';
        } else {
            return number.toFixed(2);
        }
    }
    
    // Format currency values
    function formatCurrency(value) {
        if (value === null || value === undefined) return 'N/A';
        
        if (Math.abs(value) >= 1e12) {
            return '$' + (value / 1e12).toFixed(2) + 'T';
        } else if (Math.abs(value) >= 1e9) {
            return '$' + (value / 1e9).toFixed(2) + 'B';
        } else if (Math.abs(value) >= 1e6) {
            return '$' + (value / 1e6).toFixed(2) + 'M';
        } else if (Math.abs(value) >= 1e3) {
            return '$' + (value / 1e3).toFixed(2) + 'K';
        } else {
            return '$' + value.toFixed(2);
        }
    }
    
    // JSON syntax highlighting function
    function syntaxHighlight(obj) {
        const json = JSON.stringify(obj, null, 2);
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            let cls = 'json-number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'json-key';
                    // Remove quotes and colon from key
                    match = match.replace(/"/g, '').replace(/:$/, ':');
                } else {
                    cls = 'json-string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'json-boolean';
            } else if (/null/.test(match)) {
                cls = 'json-null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }
    
    // Show loading animation
    function showLoader() {
        loader.style.display = 'block';
        fetchButton.disabled = true;
    }
    
    // Hide loading animation
    function hideLoader() {
        loader.style.display = 'none';
        fetchButton.disabled = false;
    }
    
    // Show error message
    function showErrorMessage(message) {
        dataDisplay.innerHTML = `<span style="color: var(--error-color);">Error: ${message}</span>`;
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
});