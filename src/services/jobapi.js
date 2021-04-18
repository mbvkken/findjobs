import axios from 'axios';

export function fetchAllJobs() {
    return axios.get('http://localhost:4444/jobs')
    .then((response) => {
        console.log(response)
       return response.data
    })
}

export function fetchJobsById(id) {
    return axios.get(`http://localhost:4444/jobs/${id}`)
    .then((response) => response.data)
}

const API_URL = 'http://localhost:4444';

export function addJob(job) {
    return fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    })
    .then((res) => res.json());
  }

  export function deleteJobById(id) {
    return fetch(`${API_URL}/jobs/${id}`, {
      method: 'DELETE',
    })
    .then((res) => res.json());
  }

  export function updateJob(job) {
    return fetch(`${API_URL}/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    })
    .then((res) => res.json());
  }