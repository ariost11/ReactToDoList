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
    this.addToList = this.addToList.bind(this);
    this.updateEntry = this.updateEntry.bind(this);
  }

  addToList(title, description, date, priority) {
    this.setState({
      tuples: [...this.state.tuples, [title, description, date, priority, false, this.state.index++]]
    });
  }

  updateEntry(title, description, date, priority, complete, index) {
    let newArr = [title, description, date, priority, complete, index];
    console.log([...this.state.tuples.slice(index - 1), newArr, ...this.state.tuples.slice(index)]);
    this.setState({
      tuples: this.state.tuples.splice(index, 1, newArr)
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
          <Dialogue name="UPDATE" givenTuple={tuple} fn={this.updateEntry}/>
          <Button>DELETE</Button>
        </Col>
      </Row>
    );

    return(
      <Card>
        <Card.Header>
            <Row>
              <Col md={{span: 6, offset: 5}}>FRAMEWORKS</Col>
              <Col md={{span: 1}}><Dialogue fn={this.addToList} name='ADD'/></Col>
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