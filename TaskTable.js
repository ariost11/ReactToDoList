import * as React from 'react';
import './style.css';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Dialogue from './Dialogue';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Button } from 'react-bootstrap';

export default class TaskTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tuples: [],
      index: 0
    };
    this.updateList = this.updateList.bind(this);
  }

  updateList(title, description, date, priority) {
    this.setState({
      tuples: [...this.state.tuples, [title, description, date, priority, false, this.state.index++]]
    });
  }

  render() {
    const list = this.state.tuples.map((tuple) =>
      <Row>
        <Col sm md lg={{span: 2}}>{tuple[0]}</Col>
        <Col sm md lg={{span: 2}}>{tuple[1]}</Col>
        <Col sm md lg={{span: 2}}>{tuple[2]}</Col>
        <Col sm md lg={{span: 2}}>{tuple[3]}</Col>
        <Col sm md lg={{span: 2}}>
          <Form.Check inline name='completed' type='checkbox' onChange={() => tuple[4] = true}/>
        </Col>
        <Col sm md lg={{span: 2}}>
          <Dialogue name="UPDATE" givenTuple={tuple}/>
          <Button>DELETE</Button>
        </Col>
      </Row>
    );

    return(
      <Card>
        <Card.Header>
            <Row>
              <Col md={{span: 6, offset: 5}}>FRAMEWORKS</Col>
              <Col md={{span: 1}}><Dialogue fn={this.updateList} name='ADD'/></Col>
            </Row>
        </Card.Header>
        <Card.Body>
          <Table>
            <thead>
              <tr>
                <Row>
                  <Col sm md lg={{span: 2}}>Title</Col>
                  <Col sm md lg={{span: 2}}>Description</Col>
                  <Col sm md lg={{span: 2}}>Deadline</Col>
                  <Col sm md lg={{span: 2}}>Priority</Col>
                  <Col sm md lg={{span: 2}}>Is Complete</Col>
                  <Col sm md lg={{span: 2}}>Action</Col>
                </Row>
              </tr>
            </thead>
            <tbody>
              <tr>
                {list}
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  };
}