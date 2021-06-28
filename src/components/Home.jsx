import { Container, Table } from 'react-bootstrap';
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

    render() {
        return (
            <Container className="p-3">
                <h1 className="font-weight-light">Models</h1>
                <ModelTable metadata={this.state.metadata} />
            </Container>
        );
    }
}

export default Home;
