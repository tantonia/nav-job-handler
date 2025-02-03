# NavJobHandler

NAV Job Handler is a standalone Angular application that demonstrates my ability to build a modern, responsive front-end application. This project fetches job listings from a public feed API, implements client-side pagination (10 jobs per page), location filtering (sorted alphabetically), and a floating "Back to Top" button for improved user experience.

## Features

- **Job Listings:** Fetches job data from a public API and displays job titles, company names, and locations.
- **Job Details:** Clicking on a job navigates to a detail view that shows additional information. When job details are unavailable (e.g., for inactive jobs), fallback data (such as the title from the job listing) is displayed along with an error message.
- **Pagination:** Client-side pagination is implemented to show 10 jobs per page with "Previous" and "Next" navigation buttons.
- **Location Filtering:** A dropdown menu allows users to filter job listings by location. The locations are extracted from the dataset, sorted alphabetically, and only valid cities are displayed.
- **Floating Scroll-to-Top Button:** A button appears when the user scrolls down, allowing them to easily scroll back to the top of the page.
- **Standalone Components:** This project uses Angular's standalone components and the latest Angular features.
- **Proxy Configuration:** The application is configured with a proxy (`proxy.config.json`) to handle API calls, and it is started using `npm start`.

## Technologies Used

- **Angular (Standalone Components)**
- **TypeScript**
- **RxJS**
- **Bootstrap (for basic styling)**
- **Angular Router**

## Project Structure

- **src/app/components/**: Contains all standalone components (JobListComponent, JobDetailsComponent, etc.)
- **src/app/services/**: Contains the JobService responsible for API calls.
- **src/environments/**: Contains environment configuration files.
- **proxy.config.json**: Proxy configuration to redirect API calls during development.

## Installation

- **Clone the repository:**

   ```bash
   git clone https://github.com/tantonia/nav-job-handler.git
   cd nav-job-handler ```

- **Install dependencies:**

  ``` npm install ```

- **Run the application:**

  ```This application uses  a proxy configuration to handle API requests. To start the application, run:

  npm start```

## Proxy Configuration

The proxy.config.json file is used to redirect API requests during development. This allows the application to bypass CORS issues when making requests to external APIs. You can find the proxy configuration in the root of the project.

## Usage

Job Listings: View the list of job postings on the homepage.
Filter by Location: Use the dropdown menu at the top to filter jobs by city.
Pagination: Use the Previous/Next buttons at the bottom to navigate through pages.
View Details: Click on "View Job" to see detailed information for a specific job.
Back to Top: When scrolling down, click the floating "Top" button to quickly return to the top of the page.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.
