import { Button, Container, FormControl, InputGroup, Table } from 'react-bootstrap';
import React from 'react';

class ModelTable extends React.Component {

    render() {

        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Product</th>
                        <th>Hazard</th>
                        <th>Software</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.metadata && this.props.metadata.map(this.renderModel)}
                </tbody>
            </Table>
        );
    }

    renderModel(model, index) {
        return (
            <tr key={index}>
                <td>{model["name"]}</td>
                <td>{model["products"]}</td>
                <td>{model["hazards"]}</td>
                <td>{model["software"]}</td>
                <td>{model["type"]}</td>
            </tr>
        );
    }
}

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            metadata: null
        };

        fetch("http://localhost:8000/simplemodels")
            .then(response => response.json())
            .then(data => this.setState({ metadata: data }));
    }

    addModel(model) {
        let extendedMetadata = [...this.state.metadata]
        extendedMetadata.push(model);
        this.setState({ metadata: extendedMetadata });
    }

    handleSearch() {
        // Get term in search bar and show matching models
        let searchTerm = document.getElementById("searchInput").value
        if (searchTerm) {
            fetch("http://localhost:8000/search/" + searchTerm)
                .then(response => response.json())
                .then(data => this.setState({ metadata: data }));
        }
    }

    clearSearch() {
        // Clear search bar and list all models
        document.getElementById("searchInput").value = "";
        fetch("http://localhost:8000/simplemodels")
            .then(response => response.json())
            .then(data => this.setState({ metadata: data }));
    }

    render() {
        return (
            <Container className="p-3">
                <h1 className="font-weight-light">Models</h1>

                <InputGroup className="mb-3">
                    <FormControl
                        id="searchInput"
                        placeholder="Search term"
                        aria-label="Search term"
                        aria-describedby="basic-addon2"/>
                    <Button
                        variant="outline-secondary"
                        id="searchButton"
                        onClick={this.handleSearch}>
                        Search
                    </Button>
                    <Button
                        variant="outline-secondary"
                        id="clearButton"
                        onClick={this.clearSearch}>
                        Clear
                    </Button>
                </InputGroup>
                <ModelTable metadata={this.state.metadata} />
            </Container>
        );
    }
}

export default Home;
