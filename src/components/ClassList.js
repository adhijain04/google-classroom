import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import * as actions from "../store/actions/Action";
const uuidv1 = require("uuid/v1");

class ClassList extends Component {
  state = {
    showClassForm: false,
    className: "",
    section: "",
    subject: "",
    room: ""
  };

  componentDidMount() {
    let classes = JSON.parse(localStorage.getItem("classes"));
    if (classes !== null) {
      this.props.getClassData(classes);
    }
  }

  showClassForm = () => {
    this.setState({ showClassForm: true });
  };

  hideClassForm = () => {
    this.setState({
      showClassForm: false,
      className: "",
      section: "",
      subject: "",
      room: ""
    });
  };

  formInputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createClassHandler = () => {
    let data = {};
    let newClasses = JSON.parse(localStorage.getItem("classes"));
    data["className"] = this.state.className;
    data["section"] = this.state.section;
    data["subject"] = this.state.subject;
    data["room"] = this.state.room;
    data["id"] = uuidv1();
    if (newClasses !== null && newClasses.length) {
      newClasses.push(data);
    } else {
      newClasses = [];
      newClasses.push(data);
    }
    localStorage.setItem("classes", JSON.stringify(newClasses));
    this.props.getClassData(newClasses);
    this.hideClassForm();
  };

  render() {
    return (
      <div>
        <Modal show={this.state.showClassForm} onHide={this.hideClassForm}>
          <Modal.Header closeButton>
            <Modal.Title>Create Class</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              placeholder="Class Name"
              name="className"
              onChange={this.formInputHandler}
              value={this.state.className}
            />
            <input
              type="text"
              placeholder="Section"
              name="section"
              onChange={this.formInputHandler}
              value={this.state.section}
            />
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              onChange={this.formInputHandler}
              value={this.state.subject}
            />
            <input
              type="text"
              placeholder="Room"
              name="room"
              onChange={this.formInputHandler}
              value={this.state.room}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideClassForm}>
              Close
            </Button>
            <Button variant="primary" onClick={this.createClassHandler}>
              Create Class
            </Button>
          </Modal.Footer>
        </Modal>
        <nav className="class-list-navbar">
          <p className="class-list-header">Class-Room</p>
          <i
            className="fas fa-plus create-class-icon"
            onClick={this.showClassForm}
          ></i>
        </nav>
        <div className="classes-container">
          {this.props.classes.length ? (
            this.props.classes.map((newClass, i) => {
              return (
                <div
                  key={i}
                  className="newClass"
                  onClick={() =>
                    (window.location.pathname = `/class/${newClass.id}`)
                  }
                >
                  <div className="class-content-container">
                    <h1 className="class-title">{newClass.className}</h1>
                    <h4 className="class-desc">{newClass.section}</h4>
                  </div>
                  <div classes="class-folder-container">
                    <i className="fas fa-folder"></i>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="error-container">
              <p>Oops, you have not created any classes yet.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const MapStateToProps = state => {
  return {
    classes: state.ClassReducer.classes
  };
};

const MapDispatchToProps = dispatch => {
  return {
    getClassData: data => dispatch(actions.getClassData(data))
  };
};

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(ClassList);
