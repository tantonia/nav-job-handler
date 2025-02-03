import { Component, HostListener, inject, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, FormsModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit {
  allJobs: any[] = [];  // Store the full dataset
  jobs: any[] = [];     // Displayed jobs for the current page
  errorMessage: string = '';

  // Dropdown and pagination properties
  selectedLocation: string = '';
  locations: string[] = [];
  currentPage = 1;
  pageSize = 10; // 10 jobs per page
  totalJobs = 0;
  totalPages = 0;

  // Scroll to top property
  showScrollTop: boolean = false;

  private jobService = inject(JobService);

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe({
      next: data => {
        console.log('All jobs received:', data);  // Debugging full dataset
        this.allJobs = data;
        // Extract distinct locations from jobs (using the 'municipal' property)
        this.locations = Array.from(
          new Set<string>(
            this.allJobs
              .map(job => job._feed_entry?.municipal)
              .filter(location => this.isValidCity(location))
              .sort((a, b) => a.localeCompare(b))
          )
        );
        // Set total jobs and pages initially
        this.totalJobs = this.allJobs.length;
        this.totalPages = Math.ceil(this.totalJobs / this.pageSize);
        this.updateJobsForPage();
      },
      error: err => {
        console.error('Error fetching job listings:', err);
        this.errorMessage = 'There was an issue fetching job listings. Please try again later.';
      }
    });
  }

  // Filter and paginate the jobs based on the selected location
  updateJobsForPage(): void {
    let filteredJobs = this.allJobs;
    if (this.selectedLocation) {
      filteredJobs = filteredJobs.filter(job => job._feed_entry?.municipal === this.selectedLocation).sort();
    }
    this.totalJobs = filteredJobs.length;
    this.totalPages = Math.ceil(this.totalJobs / this.pageSize) || 1;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.jobs = filteredJobs.slice(startIndex, startIndex + this.pageSize);
  }

  // Method to exclude invalid entries
  isValidCity(location: string | undefined | null): boolean {
    if (!location || location.length < 2) return false; // Exclude empty, null, and short values
    const invalidValues = ['N/A', 'Unknown', 'Remote']; // any unwanted values
    return !invalidValues.includes(location);
  }

  // Pagination method for page navigation
  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateJobsForPage();
    }
  }

  // Called when the dropdown value changes
  filterJobsByLocation(): void {
    // Reset to the first page whenever the filter changes
    this.currentPage = 1;
    this.updateJobsForPage();
  }

  // Method to scroll back to the top of the page
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Listen for window scroll events
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Show the button if the user scrolls more than 100 pixels from the top
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.showScrollTop = scrollPosition > 100;
  }
}
