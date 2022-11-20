import * as React from 'react';
import { useState } from 'react';
import './style.css';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Dialogue from './Dialogue';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class TaskTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tuples: []
    };
    this.updatesList = this.updatesList.bind(this);
  }

  updateList(title, description, date, priority) {
    this.setState({
      tuples: [...this.state.tuples, [title, description, date, priority, false]]
    });
  }

  render() {
    console.log(this.state.tuples);
    return(
      <Card>
        <Card.Header>
            <Row>
              <Col md={{span: 6, offset: 5}}>FRAMEWORKS</Col>
              <Col md={{span: 1}}><Dialogue list={this.state.tuples} fn={this.updatesList}/></Col>
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
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  };
}