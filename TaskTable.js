import * as React from 'react';
import './style.css';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Dialogue from './Dialogue';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Button } from 'react-bootstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faBars } from '@fortawesome/free-solid-svg-icons';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

export default class TaskTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tuples: [],
      index: 0
    };
    this.addToList = this.addToList.bind(this);
    this.updateEntry = this.updateEntry.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.swapComplete = this.swapComplete.bind(this);
    toastr.options.positionClass = 'toast-top-left';
  }

  addToList(title, description, date, priority) {
    this.setState({
      tuples: [...this.state.tuples, [title, description, date, priority, false, this.state.index++]]
    });
    toastr.success('Task Added Successfully');
  }

  updateEntry(title, description, date, priority, complete, index) {
    let newArr = [title, description, date, priority, complete, index];
    this.setState({
      tuples: this.state.tuples.map(a => a[0] === title ? newArr : a)
    });
    toastr.success('Task Updated Successfully');
  }

  deleteEntry(tuple) {
    this.setState({
      tuples: this.state.tuples.filter(item => item !== tuple)
    });
    toastr.success('Task Deleted Successfully');
  }

  swapComplete(tuple) {
    let newArr = tuple;
    newArr[4] = !tuple[4];
    this.setState({
      tuples: this.state.tuples.map(a => a === tuple ? newArr : a)
    });
  }

  containsTitle(title) {
    let contained = false;
    this.state.tuples.forEach(a => {
      if(a.includes(title))
        contained = true;
    });
    return contained;
  }

  render() {
    const list = this.state.tuples.map((tuple) =>
      <Row>
        <Col sm md lg={{span: 2}} id='colValue'>{tuple[0]}</Col>
        <Col sm md lg={{span: 2}} id='colValue'>{tuple[1]}</Col>
        <Col sm md lg={{span: 2}} id='colValue'>{moment(tuple[2]).format('MM/DD/YYYY')}</Col>
        <Col sm md lg={{span: 2}} id='colValue'>{tuple[3]}</Col>
        <Col sm md lg={{span: 2}} id='colValue'>
          <Form.Check inline name='completed' type='checkbox' onChange={() => this.swapComplete(tuple)}/>
        </Col>
        <Col sm md lg={{span: 2}}>
          {!tuple[4] && <Dialogue name="UPDATE" givenTuple={tuple} fn={this.updateEntry} id='updateButton'/>}
          <Button onClick={() => this.deleteEntry(tuple)} id='deleteButton'>
            <FontAwesomeIcon icon={faCircleXmark}/>
            &nbsp;DELETE
          </Button>
        </Col>
      </Row>
    );

    return(
      <Card>
        <Card.Header id='header'>
            <Row>
              <Col md={{span: 10}} id='headerTitle'><FontAwesomeIcon icon={faBars}/>
              &nbsp;FRAMEWORKS</Col>
              <Col md={{span: 2}}><Dialogue fn={this.addToList} name='ADD' id='addButton' tuples={this.state.tuples}/></Col>
            </Row>
        </Card.Header>
        <Card.Body>
          <Table bordered>
            <thead>
              <tr>
                <Row>
                  <Col sm md lg={{span: 2}} id='colHeader'>Title</Col>
                  <Col sm md lg={{span: 2}} id='colHeader'>Description</Col>
                  <Col sm md lg={{span: 2}} id='colHeader'>Deadline</Col>
                  <Col sm md lg={{span: 2}} id='colHeader'>Priority</Col>
                  <Col sm md lg={{span: 2}} id='colHeader'>Is Complete</Col>
                  <Col sm md lg={{span: 2}} id='colHeader'>Action</Col>
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