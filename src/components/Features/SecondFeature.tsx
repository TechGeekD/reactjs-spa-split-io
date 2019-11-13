import * as React from "react";

import { Container, Row, Col, Table } from "react-bootstrap";

interface SecondFeatureProps {
  projectList: Array<any>;
  openModal: any;
  setSplitAttribute: any;
  splitAttributes: any;
  unavailable: boolean;
  thirdTreatment: boolean;
}

export class SecondFeature extends React.Component<
  SecondFeatureProps,
  { luckyUser: boolean; selectedUser: string; selectedLocation: string }
> {
  constructor(props: SecondFeatureProps) {
    super(props);
    let luckyUser = this.props.splitAttributes.luckyUser;
    let selectedUser = this.props.splitAttributes.user;
    let selectedLocation = this.props.splitAttributes.location;

    this.state = {
      luckyUser: luckyUser ? luckyUser : false,
      selectedUser: selectedUser ? selectedUser : "",
      selectedLocation: selectedLocation ? selectedLocation : ""
    };
  }

  handleSelectLocationDropdown = (evt: any) => {
    this.setState({ selectedLocation: evt }, () => {
      this.props.setSplitAttribute({
        ...this.props.splitAttributes,
        location: this.state.selectedLocation
      });
    });
  };

  render() {
    const {
      projectList,
      // splitAttributes: { location }
    } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Table
              style={{ width: "30rem" }}
              striped
              bordered
              hover
              variant="dark"
              responsive
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    <div className="App-space-between">
                      Top Projects{" "}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectList.map((project, index) => {
                  // const unavailable = !project.location.includes(
                  //   this.state.selectedLocation
                  // );

                  return (
                    <tr key={project.name}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="App-space-between">
                          {project.name}
                          {/* <Button
                            className="App-buy-btn"
                            variant={unavailable ? "danger" : "primary"}
                          >
                            {unavailable ? "Unavailable" : "Listen"}
                          </Button> */}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}
