import React from 'react';
import { fetchJobsById, deleteJobById } from '../services/jobapi';

class Details extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            details: [],
            isLoading: false,
            error: null
        }
    }

    async componentDidMount() {
        const { id } = this.props;
        try {
            this.setState({ isLoading: true });
            const details = await fetchJobsById(id);
            this.setState({ details, isLoading: false });
            console.log(details.title);
        } catch (error) {
            this.setState({ error })
        }
    }

    handleAddClick() {
        const { changeView } = this.props;
        changeView('add');
    }

    handleBackClick() {
        this.props.changeView('', {});  
    }

    async handleDeleteClick() {
        const { changeView, id } = this.props;

        if (!window.confirm('are u sure?')) {
            return;
        }

        try {
            await deleteJobById(id);
            changeView('');
        } catch (error) {
            console.log('delete book failed', error)
        }
    }

    handleEditClick() {
        const { changeView, id } = this.props;
        changeView('edit', { id });
    }
    
    render() {

        return (
            <div>
                <div className="headline">
                <button className="btn btn1" onClick={this.handleAddClick.bind(this)}>Add Job</button>
                &nbsp;
                <button className="btn btn2">Browse Jobs</button>
                </div>
                <div className="details">
                    <h2>{this.state.details.title}</h2>
                    <p>{this.state.details.company}</p>
                    <p>{this.state.details.homepage}</p>
                    <p>{this.state.details.email}</p>
                    <p>{this.state.details.createdAt}</p>
                    <p>{this.state.details.description}</p>
                    <button className="btn btn1" onClick={this.handleDeleteClick.bind(this)}>Delete</button>
                    &nbsp;
                    <button className="btn btn2" onClick={this.handleEditClick.bind(this)}>Edit</button>
                </div>
                <div className="backbtn">
                    <button className="btn btn2" onClick={() => this.handleBackClick()}>Back</button>
                </div>
            </div>
            
        )
    }
}

export default Details;