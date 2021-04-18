import React from 'react';
import { addJob } from '../services/jobapi';

class Add extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            job: {}
        }
    }

    handleCancelClick(event) {
        event.preventDefault();
        const { changeView } = this.props;
        changeView('');
    }

    async handleSaveClick(event) {
        event.preventDefault();
        const { changeView } = this.props;
        const { job } = this.state;
        
        try {
            const newJob = await addJob(job);
            changeView('', { id: newJob.id });
        } catch (error) {
            console.log('Add job failed', error)
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
        const { job } = this.state;

        return(
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
        )
    }
}

export default Add;