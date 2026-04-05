API Automation Testing | Cypress & JavaScript
This project demonstrates automated API testing for a hotel reservation system (Restful-Booker). It covers the full testing lifecycle, from environment setup to documenting discovered business bugs.

Project Overview
The goal was to validate the Booking API endpoints, ensuring that the system handles both successful reservations (Happy Path) and invalid data entry (Negative Testing/Edge Cases).

Tech Stack
Language: JavaScript (ES6+)
Testing Framework: Cypress
API Sandbox: Restful-Booker
Environment: Node.js

Implemented Test Scenarios
1. Happy Path: Create Booking
Goal: Verify if a valid payload results in a successful reservation.
Assertion: Status Code 200 OK and validation of the firstname property in the response.
2. Negative Testing (Edge Cases)
Missing Lastname: Validates that the system rejects incomplete payloads.
Invalid Date Logic: Checks if the API prevents a checkout date prior to checkin.
Missing Booking Dates: Ensures the system requires mandatory date objects.
Invalid Date Format: Validates rejection of non-date strings.

Bug Discovered
During the execution of Negative Scenarios, a business logic flaw was identified:
Issue: The API accepts a negative value for totalprice (e.g., -100).
Actual Result: Status 200 OK.
Expected Result: Status 400 Bad Request or 422 Unprocessable Entity, as a reservation cannot have a negative cost.

How to Run
Clone the repo: git clone <https://github.com/kandressa-ui/cypress-api-automation-study.git>
Install dependencies: npm install
Open Cypress: npx cypress open
Run the spec: Select teste-api.cy.js (or your chosen spec name)
