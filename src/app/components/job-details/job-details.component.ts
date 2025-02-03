import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailComponent implements OnInit {
  jobDetails: any = null;       // Holds job details from the API
  errorMessage: string = '';    // Holds an error message if applicable

  private jobService = inject(JobService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Retrieve any fallback data (e.g., job title) passed via router state
    const state = history.state;
    const fallbackTitle = state && state.title ? state.title : '';

    // Get the entryId from the URL parameters
    const entryId = this.route.snapshot.paramMap.get('entryId');

    if (entryId) {
      this.jobService.getSingleJob(entryId).subscribe({
        next: data => {
          if (data) {
            this.jobDetails = data;
            // Use the fallback title if the API did not return one
            if (!this.jobDetails.title && fallbackTitle) {
              this.jobDetails.title = fallbackTitle;
            }
            // If the job is inactive, set an error message but keep the details visible
            if (this.jobDetails.status === 'INACTIVE') {
              this.errorMessage = '⚠️ Job is no longer active.';
            }
          } else {
            this.errorMessage = '❌ Job details not found.';
          }
        },
        error: () => {
          this.errorMessage = '⚠️ There was an issue fetching job details.';
        }
      });
    } else {
      this.errorMessage = '⚠️ Invalid job ID.';
    }
  }
}
