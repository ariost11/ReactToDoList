import * as React from 'react';
import { Button, Modal, Form} from 'react-bootstrap';

export default class Dialogue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      title: '',
      description: '',
      date: '',
      priority: '',
      mode: this.props.name == 'ADD' ? 'Add' : 'Edit',
      complete: false
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAddEdit = this.handleAddEdit.bind(this);
    this.loadTable = this.loadTable.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.resetValues = this.resetValues.bind(this);
    this.updateDate = this.updateDate.bind(this);
  }

  updateDate(newDate) {
    var time = newDate.target.value;
    this.setState({
      date: time
    });
    console.log(this.state.date);
  }

  loadTable() {
    const ti = this.props.givenTuple[0];
    const desc = this.props.givenTuple[1];
    const newDate = this.props.givenTuple[2];
    const prio = this.props.givenTuple[3];
    console.log(newDate);
    this.setState({
      title: ti,
      description: desc,
      date: newDate,
      priority: prio
    });
    console.log(this.state.date);
  }

  handleOpen() {
    if(this.state.mode == 'Edit')
      this.loadTable();

    this.handleShow();
  }

  handleShow() {
    this.setState({
      show: true
    });
  }

  handleClose() {
    this.setState({
      show: false
    });
  }

  handleCancel() {
    this.handleClose();
    this.resetValues();
  }

  handleAddEdit() {
    if(this.state.mode == 'Add')
      this.props.fn(this.state.title, this.state.description, this.state.date, this.state.priority);
    else
      this.props.fn(this.state.title, this.state.description, this.state.data, this.state.priority, this.props.givenTuple.complete, this.props.givenTuple.index);

    this.handleClose();
    this.resetValues();
  }

  resetValues() {
    this.setState ({
      title: '',
      description: '',
      date: '',
      priority: '',
      complete: false
    });
  }

  render() {
    let titleShow = <></>;
    if(this.state.mode == 'Add') {
      titleShow = 
      <Form.Group>
        <Form.Text>Title</Form.Text>
        <Form.Control placeholder='Title' onChange={(newTitle) => this.setState({title: newTitle.target.value})}/>
      </Form.Group>;
    }

    return(
      <div>
        <Button variant="primary" onClick={this.handleOpen} id={this.props.id}>
          {this.props.name}
        </Button>

        <Modal show={this.state.show} onHide={() => this.handleClose}>
          <Modal.Header id='header'>
            <Modal.Title>{this.state.mode} Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {titleShow}
              <Form.Group>
                <Form.Text>Description</Form.Text>
                <Form.Control value = {this.state.mode == 'Edit' ? this.state.description : null} placeholder='Description' onChange={(desc) => this.setState({description: desc.target.value})}/>
              </Form.Group>
              <Form.Group>
                <Form.Text>Deadline</Form.Text>
                <Form.Control value = {this.state.mode == 'Edit' ? this.state.date : null} type='date' onChange={(newDate) => this.updateDate(newDate)}/>
              </Form.Group>
              <Form.Group>
                <Form.Text>Priority <br/></Form.Text>
                <Form.Check inline checked = {this.state.mode == 'Edit' && this.state.priority == 'Low' ? true : false} name='priority' type='radio' label='Low' onChange={() => this.setState({priority: 'Low'})}/>
                <Form.Check inline checked = {this.state.mode == 'Edit' && this.state.priority == 'Medium' ? true : false} name='priority' type='radio' label='Med' onChange={() => this.setState({priority: 'Medium'})}/>
                <Form.Check inline checked = {this.state.mode == 'Edit' && this.state.priority == 'High' ? true : false} name='priority' type='radio' label='High' onChange={() => this.setState({priority: 'High'})}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" id='submitButton' onClick={this.handleAddEdit}>
              {this.state.mode}
            </Button>
            <Button variant="secondary" id='cancelButton' onClick={this.handleCancel}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
}