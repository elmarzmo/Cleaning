import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-quote',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './quote.html',
  styleUrls: ['./quote.css'],
})
export class Quote {
  newQuote = {
    name: '',
    email: '',
    phone: '',
    address:'',
    zipCode: '',
    room: null,
    bathroom: null,
    details: '',
  };

  // calculate rate based on rooms and bathrooms
  estimatedRate: number | null = null;

  // Meassage to display info about the rate
  infoMessage: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('/api/quotes', this.newQuote).subscribe(response => {
      console.log('Quote submitted:', response);
    });
  }


  calculateRate() {
    if (!this.newQuote.room && !this.newQuote.bathroom) {
      this.estimatedRate = null;
    return;
    }

    this.estimatedRate = (this.newQuote.room || 0) * 50 + (this.newQuote.bathroom || 0) * 10;
    this.infoMessage = 'This is an estimated rate. One of our representatives will contact you for a detailed quote.';
  }

  // submit info to the backend
  submitForFinalQuote() {
    if(!this.newQuote.name || !this.newQuote.email) return;
    // Here you would typically send the newQuote data to your backend server
    console.log('Submitting quote request:', this.newQuote);
    this.http.post('/api/service', this.newQuote).subscribe({
      next: () => {
      this.infoMessage = 'Your quote request has been submitted successfully!';
      this.infoMessage += ' We will get back to you soon.';
      this.estimatedRate = null;
      this.newQuote = {
        name: '',
        email: '',
        phone: '',
        address: '',
        zipCode: '',
        room: null,
        bathroom: null,
        details: '',
      };

    },
    error: (err) => {
      console.error('Error submitting quote request:', err);
      this.infoMessage = 'There was an error submitting your quote request. Please try again later.';
    }
   });
  }

  };
