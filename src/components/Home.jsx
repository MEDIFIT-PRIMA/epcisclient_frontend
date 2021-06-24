import { Button, Col, Container, Form, Table, Row } from 'react-bootstrap';
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

        let modelType = "fsk:modelType" in model ? model["fsk:modelType"] : "";
        let name = "";
        let software = "";
        let products = [];
        let hazards = [];

        if ("fsk:generalInformation" in model) {
            let generalInformation = model['fsk:generalInformation'];

            if ('fsk:name' in generalInformation) {
                name = generalInformation['fsk:name'];
            }

            if ('fsk:languageWrittenIn' in generalInformation) {
                software = generalInformation['fsk:languageWrittenIn'];
            }
        }

        if ("fsk:scope" in model) {
            let scope = model["fsk:scope"];

            // Get products
            if ('fsk:product' in scope) {
                products = scope['fsk:product'].map(it => it['fsk:name']);
            }

            // Get hazards
            if ('fsk:hazard' in scope) {
                hazards = scope['fsk:hazard'].map(it => it['fsk:name']);
            }
        }

        return (
            <tr key={index}>
                <td>{name}</td>
                <td>{products}</td>
                <td>{hazards}</td>
                <td>{software}</td>
                <td>{modelType}</td>
            </tr>
        );
    }
}

class UploadForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectedFile: undefined };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let files = event.target.files;
        if (files.length === 1) {
            this.setState({ selectedFile: files[0] });
        }
    }

    handleSubmit(event) {
        if (this.state.selectedFile) {
            let data = new FormData();
            data.append('file', this.state.selectedFile);

            fetch('http://localhost:8000/upload', { method: 'POST', body: data })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.props.addModel(data)
                });
        }
    }

    render() {
        return (
            <Row className="mb-3">
                <Col>
                    <Form>
                        <Form.File
                            id="modelFileInput"
                            label={this.state.selectedFile ? this.state.selectedFile.name : ""}
                            placeholder="Select an FSKX file"
                            custom
                            onChange={this.handleChange} />
                    </Form>
                </Col>
                <Col>
                    <Button variant="primary" onClick={this.handleSubmit}>Upload</Button>
                </Col>
            </Row>
        );
    }
}

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            metadata: null
        };

        fetch("http://localhost:8000/models")
            .then(response => response.json())
            .then(data => this.setState({ metadata: data }));
    }

    addModel(model) {
        console.log("adding model: " + model);

        let extendedMetadata = [...this.state.metadata]
        extendedMetadata.push(model);
        this.setState({ metadata: extendedMetadata });
    }

    render() {
        return (
            <Container className="p-3">
                {/* <h2 className="font-weight-light">Model upload</h2>
                <UploadForm addModel={(model) => this.addModel(model)} /> */}

                <h1 className="font-weight-light">Models</h1>
                <ModelTable metadata={this.state.metadata} />
            </Container>
        );
    }
}

export default Home;
