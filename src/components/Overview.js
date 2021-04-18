import React from 'react';
import { fetchAllJobs } from '../services/jobapi';
import { FaEnvelope } from 'react-icons/fa';
import { FaCalendarAlt } from 'react-icons/fa';

class Overview extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            jobs: [],
            isLoading: false,
            error: null
        }
    }

    async componentDidMount() {
        try {
            this.setState({ isLoading: true });
            const jobs = await fetchAllJobs();
            this.setState({ jobs, isLoading: false });
        } catch (error) {
            this.setState({ error });
        }
    }

    handleJobClick(jobId) {
        const { changeView } = this.props;
        changeView('details', { id: jobId});
    }

    handleAddClick() {
        const { changeView } = this.props;
        changeView('add');
      }

    render() {
        const { jobs, isLoading, error } = this.state;

        if (error) {
            return (
              <div>
                <p>Oops! Something went wrong!</p>
                <pre>{error.message}</pre>
              </div>
            );
        }

        if (isLoading) {
            return (
              <div>
                <p>Loading books...</p>
              </div>
            );
          }
        
        const jobElements = jobs.map((job) => {
            return (
                <li className="details" onClick={this.handleJobClick.bind(this, job.id)}
                key={job.id}>

                    <h1>{job.title}</h1> 
                    <div className="datecompany">
                        <p><FaCalendarAlt /> {job.createdAt}</p> 
                        <p className="p2"><FaEnvelope /> {job.company}</p>
                    </div>

                </li>
            )
        });

        return (
            <div>
                <div className="headline">
                    <button className="btn btn1" onClick={this.handleAddClick.bind(this)}>Add Job</button>
                    &nbsp;
                    <button className="btn btn2">Browse Jobs</button>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search"></input>
                </div>
            
            <ul> {jobElements} </ul>
            
            </div>
        )
    }
}

export default Overview;