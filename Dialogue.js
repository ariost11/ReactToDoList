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
    this.handleAdd = this.handleAdd.bind(this);
    this.loadTable = this.loadTable.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  loadTable() {
    console.log(this.props.givenTuple);
    this.setState({
      description: this.props.givenTuple[1],
      date: this.props.givenTuple[2],
      priority: this.probs.givenTuple[3]
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
  }

  handleAdd() {
    this.props.fn(this.state.title, this.state.description, this.state.date, this.state.priority);
    this.handleClose();
  }

  render() {
    return(
      <div>
        <Button variant="primary" onClick={this.handleOpen}>
          {this.props.name}
        </Button>

        <Modal show={this.state.show} onHide={() => this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.mode} Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Control placeholder='Title' onChange={(newTitle) => this.setState({title: newTitle.target.value})}/>
              <Form.Control placeholder='Description' onChange={(desc) => this.setState({description: desc.target.value})}/>
              <Form.Group>
                <Form.Text>Deadline</Form.Text>
                <Form.Control type='date' onChange={(newDate) => this.setState({date: newDate.target.value})}/>
              </Form.Group>
              <Form.Group>
                <Form.Text>Priority <br/></Form.Text>
                <Form.Check inline name='priority' type='radio' label='Low' onChange={() => this.setState({priority: 'Low'})}/>
                <Form.Check inline name='priority' type='radio' label='Med' onChange={() => this.setState({priority: 'Medium'})}/>
                <Form.Check inline name='priority' type='radio' label='High' onChange={() => this.setState({priority: 'High'})}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleAdd}>
              {this.state.mode}
            </Button>
            <Button variant="secondary" onClick={this.handleCancel}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
}