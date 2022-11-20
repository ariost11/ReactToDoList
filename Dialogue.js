import * as React from 'react';
import { Button, Modal, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPenToSquare, faBan } from '@fortawesome/free-solid-svg-icons';

export default class Dialogue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      title: '',
      description: '',
      date: '',
      priority: 'Low',
      mode: this.props.name == 'ADD' ? 'Add' : 'Edit',
      complete: false,
      titleEmptyValid: true,
      titleDuplicateValid: true,
      descValid: true
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAddEdit = this.handleAddEdit.bind(this);
    this.loadTable = this.loadTable.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.resetValues = this.resetValues.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.containsTitle = this.containsTitle.bind(this);
  }

  containsTitle(newTitle) {
    let contained = false;
    this.props.tuples.forEach(a => {
      if(a.includes(newTitle))
        contained = true;
    });
    return contained;
  }

  validateFields() {
    this.setState({
      titleEmptyValid: this.state.title != '',
      descValid: this.state.description != '',
      titleDuplicateValid: (this.state.mode == 'Add' ? !this.containsTitle(this.state.title) : true)
    }, () => {
      if(this.state.titleEmptyValid && this.state.descValid && this.state.titleDuplicateValid) {
        this.handleAddEdit();
      }
    });
  }

  updateDate(newDate) {
    var time = newDate.target.value;
    this.setState({
      date: time
    });
  }

  loadTable() {
    const ti = this.props.givenTuple[0];
    const desc = this.props.givenTuple[1];
    const newDate = this.props.givenTuple[2];
    const prio = this.props.givenTuple[3];
    this.setState({
      title: ti,
      description: desc,
      date: newDate,
      priority: prio
    });
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
      priority: 'Low',
      complete: false,
      titleEmptyValid: true,
      titleDuplicateValid: true,
      descValid: true
    });
  }

  render() {
    let titleShow = <></>;
    if(this.state.mode == 'Add') {
      titleShow = 
      <Form.Group>
        <Form.Text>Title</Form.Text>
        <Form.Control type='text' placeholder='Title' onChange={(newTitle) => this.setState({title: newTitle.target.value})} isInvalid={!this.state.titleEmptyValid || !this.state.titleDuplicateValid}/>
        {!this.state.titleEmptyValid && <Form.Control.Feedback type='invalid'>Title is Required!</Form.Control.Feedback>}
        {!this.state.titleDuplicateValid && <Form.Control.Feedback type='invalid'>Cannot have Duplicate Title!</Form.Control.Feedback>}
      </Form.Group>;
    }

    return(
      <div>
        <Button variant="primary" onClick={this.handleOpen} id={this.props.id}>
          {this.state.mode == 'Add' && <FontAwesomeIcon icon={faCirclePlus}/>}
          {this.state.mode == 'Edit' && <FontAwesomeIcon icon={faPenToSquare}/>}
          &nbsp;{this.props.name}
        </Button>

        <Modal show={this.state.show} onHide={() => this.handleClose}>
          <Modal.Header id='header'>
            <Modal.Title>{this.state.mode == 'Add' && <FontAwesomeIcon icon={faCirclePlus}/>}
              {this.state.mode == 'Edit' && <FontAwesomeIcon icon={faPenToSquare}/>}
              &nbsp;
              {this.state.mode} Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {titleShow}
              <Form.Group>
                <Form.Text>Description</Form.Text>
                <Form.Control value = {this.state.mode == 'Edit' ? this.state.description : null} placeholder='Description' onChange={(desc) => this.setState({description: desc.target.value})} isInvalid={!this.state.descValid}/>
                <Form.Control.Feedback type='invalid'>Description is Required!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Text>Deadline</Form.Text>
                <Form.Control value = {this.state.mode == 'Edit' ? this.state.date : null} type='date' onChange={(newDate) => this.updateDate(newDate)}/>
              </Form.Group>
              <Form.Group>
                <Form.Text>Priority <br/></Form.Text>
                <Form.Check inline checked = {(this.state.mode == 'Add' && this.state.priority == 'Low') || (this.state.mode == 'Edit' && this.state.priority == 'Low') ? true : false} name='priority' type='radio' label='Low' onChange={() => this.setState({priority: 'Low'})}/>
                <Form.Check inline checked = {(this.state.mode == 'Add' && this.state.priority == 'Med') || (this.state.mode == 'Edit' && this.state.priority) == 'Med' ? true : false} name='priority' type='radio' label='Med' onChange={() => this.setState({priority: 'Med'})}/>
                <Form.Check inline checked = {(this.state.mode == 'Add' && this.state.priority == 'High') || (this.state.mode == 'Edit' && this.state.priority == 'High') ? true : false} name='priority' type='radio' label='High' onChange={() => this.setState({priority: 'High'})}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' variant="primary" id='submitButton' onClick={this.validateFields}>
              {this.state.mode == 'Add' && <FontAwesomeIcon icon={faCirclePlus}/>}
              {this.state.mode == 'Edit' && <FontAwesomeIcon icon={faPenToSquare}/>}
              &nbsp;{this.state.mode == 'Add' ? 'ADD' : 'EDIT'}
            </Button>
            <Button variant="secondary" id='cancelButton' onClick={this.handleCancel}>
              <FontAwesomeIcon icon={faBan}/>
              &nbsp;CANCEL
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
}