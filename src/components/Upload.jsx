import React from "react";

import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";

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

            // TODO: upload file and update metadata table
            fetch('http://localhost:8000/upload', { method: 'POST', body: data })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
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

function Upload() {
    return (
        <div className="upload">
            <div class="container">
                <h1 class="font-weight-light">Upload</h1>

                <div class="p-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>FSKX files upload</Card.Title>
                            <Card.Subtitle>Import directly local FSKX files from your computer</Card.Subtitle>
                            <Card.Text>
                                <UploadForm />
                                <Alert key="fileupload-alert" variant="warning">
                                    <Alert.Heading>Supported model types</Alert.Heading>
                                    <p>
                                        The import of metadata in FSKX files is under development and only the following model schemas are supported:
                                        <ul>
                                            <li>Generic model</li>
                                            <li>Data model</li>
                                            <li>Predictive model</li>
                                            <li>Other model</li>
                                            <li>Exposure model</li>
                                        </ul>
                                    </p>
                                </Alert>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div class="p-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>BfR Online Model Creation</Card.Title>
                            <Card.Subtitle>Create and import a model in KNIME Webportal</Card.Subtitle>
                            <Card.Text>
                                <Row>
                                    <Col>A model can be created in the Online Model Creation workflow on KNIME Webportal. At the end of the workflow the created model will be imported here.</Col>
                                    <Col>
                                        <Button href="https://knime.bfr.berlin/knime/webportal/space/RAKIP-Web/Online_Model_Creation" target="_blank">
                                            Online Model Creation
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div class="p-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>MicroHibro import</Card.Title>
                            <Card.Subtitle>Create and import a model in MicroHibro</Card.Subtitle>
                            <Card.Text>
                                <Row>
                                    <Col>A selected annotated model in MicroHibro can be imported here.</Col>
                                    <Col>
                                        <Button href="https://www.microhibro.com/" target="_blank">MicroHibro</Button>
                                    </Col>
                                </Row>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Upload;
