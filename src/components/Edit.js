import React from 'react';

import { 
    updateJob, fetchJobsById
} from '../services/jobapi';

class Edit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            job: {},
            isLoading: false,
            error: null
        };
    }

    async componentDidMount() {
        const { id } = this.props;

        try {
            this.setState({ isLoading: true });
            const job = await fetchJobsById(id);
            this.setState({ job, isLoading: false});
        } catch (error) {
            this.setState({ error });
        }
    }

    handleCancelClick(event) {
        event.preventDefault();
        const { changeView, id } = this.props;
        changeView('details', { id });
    }

    async handleSaveClick(event) {
        event.preventDefault();
        const { changeView, id } = this.props;
        const { job } = this.state;

        try {
            await updateJob(job);
            changeView('details', { id });
        } catch (error) {
            console.log('Editing job failed', error);
        }
    }
    
    handleInputChange(field, event) {
        this.setState({
            job: {
                ...this.state.job,
                [field]: event.target.value
            }
        });
    }

    render() {
        const { id } = this.props;
        const { job, isLoading, error } = this.state;

        if (error) {
            return (
              <div>
                <p>Error: {error.message}</p>
              </div>
            );
          }
      
          if (isLoading) {
            return (
              <div>
                <p>Loading job details...</p>
              </div>
            )
          }
      
          if (!job) {
            return (
              <div>
                <p>No job with id: {id} found</p>
              </div>
            );
          } 

          return (
            <div className="form-container">
              <h3 style= {{textAlign: 'center'}}>Add Job</h3>
              <form id="form">
                <label>
                  Title
                  <input className="form-field"type="text" name="title" value={job.title} onChange={this.handleInputChange.bind(this, 'title')} />
                </label>
                <label>
                  Description
                  <input className="form-field"type="text" name="description" value={job.description} onChange={this.handleInputChange.bind(this, 'description')} />
                </label>
                <label>
                  E-mail
                  <input className="form-field"type="text" name="email" value={job.email} onChange={this.handleInputChange.bind(this, 'email')} />
                </label>
                <label>
                  Company(optional)
                  <input className="form-field"type="text" name="company" value={job.company} onChange={this.handleInputChange.bind(this, 'company')} />
                </label>
                <label>
                  Homepage(optional)
                  <input className="form-field"type="text" name="homepage" value={job.homepage} onChange={this.handleInputChange.bind(this, 'homepage')} />
                </label>
                <button className="btn btn1" onClick={this.handleSaveClick.bind(this)}>Add</button>
                &nbsp;
                <button className="btn btn2"onClick={this.handleCancelClick.bind(this)}>Cancel</button>
              </form>
            </div>
        );
    }
}

export default Edit;