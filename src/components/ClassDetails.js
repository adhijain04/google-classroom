import React, { Component } from "react";
import { connect } from "react-redux";
import "./ClassDetails.css";
import * as actions from "../store/actions/Action";

let classes = JSON.parse(localStorage.getItem("classes"));

class ClassDetails extends Component {
  state = {
    expand: false,
    post: false,
    posts: [],
    postInput: ""
  };

  componentDidMount() {
    console.log("hello", classes);
    if (classes !== null) {
      this.props.getClassData(classes);
    }
  }

  expandHandler = () => {
    this.setState({ expand: !this.state.expand });
  };

  postHandlerShow = () => {
    this.setState({ post: true });
  };

  postHandlerHide = () => {
    this.setState({ post: false });
  };

  postInputHandler = e => {
    this.setState({ postInput: e.target.value });
  };

  submitPostHandler = () => {
    let posts = this.state.posts;
    posts.push({ value: this.state.postInput, edit: false });
    this.setState({ posts, postInput: "" });
    this.postHandlerHide();
  };

  postActionHandler = (name, i) => {
    if (name === "delete") {
      let posts = this.state.posts;
      posts.splice(i, 1);
      this.setState({ posts });
    } else {
      let posts = this.state.posts;
      posts[i].edit = true;
      this.setState({ posts });
    }
  };

  editPost = (i, e) => {
    let posts = this.state.posts;
    posts[i].value = e.target.value;
    this.setState({ posts });
  };

  confirmInput = i => {
    let posts = this.state.posts;
    posts[i].edit = false;
    this.setState({ posts });
  };

  render() {
    return this.props.classes.length ? (
      this.props.classes.map((classRoom, i) => {
        return this.props.match.params.id == classRoom.id ? (
          <div key={i}>
            <nav className="class-details-navbar">
              <div className="classRoom-details">
                <p>className: {classRoom.className}</p>
                <p>section: {classRoom.section}</p>
              </div>
              <div className="navbar-toggle">
                <p className="stream">Stream</p>
                <p className="classwork">Classwork</p>
              </div>
            </nav>
            <div className="classroom-container">
              <div className="classroom-header-div">
                <h1>{classRoom.className}</h1>
                <h2>{classRoom.section}</h2>
                <i
                  className={
                    this.state.expand
                      ? "fas fa-sort-up expand-arrow"
                      : "fas fa-sort-down expand-arrow"
                  }
                  onClick={this.expandHandler}
                ></i>
              </div>
              {this.state.expand ? (
                <div className="expanded-div">
                  <p>Subject: {classRoom.subject}</p>
                  <p>Room: {classRoom.room}</p>
                </div>
              ) : null}
              <div className="classroom-body-div">
                <div className="classroom-upcoming-div">
                  <h3>Upcoming</h3>
                </div>
                <div className="classroom-post-section">
                  {!this.state.post ? (
                    <div>
                      <div className="post-section">
                        <p onClick={this.postHandlerShow}>post something</p>
                      </div>
                      {this.state.posts.length
                        ? this.state.posts.map((post, i) => {
                            return (
                              <div key={i}>
                                <div
                                  className="post-actions"
                                  style={{
                                    display: "flex",
                                    alignItems: "center"
                                  }}
                                >
                                  {!post.edit ? (
                                    <p style={{ margin: "0 10px 0 0" }}>
                                      {post.value}
                                    </p>
                                  ) : (
                                    <input
                                      type="text"
                                      value={post.value}
                                      onChange={this.editPost.bind(this, i)}
                                    />
                                  )}
                                  {!post.edit ? (
                                    <i
                                      className="fas fa-pencil-alt"
                                      onClick={this.postActionHandler.bind(
                                        this,
                                        "edit",
                                        i
                                      )}
                                    ></i>
                                  ) : (
                                    <i
                                      className="fas fa-check"
                                      onClick={this.confirmInput.bind(this, i)}
                                    ></i>
                                  )}
                                  <i
                                    style={{ marginLeft: "10px" }}
                                    className="fas fa-trash-alt"
                                    onClick={this.postActionHandler.bind(
                                      this,
                                      "delete",
                                      i
                                    )}
                                  ></i>
                                </div>
                              </div>
                            );
                          })
                        : null}
                    </div>
                  ) : (
                    <div className="post-container">
                      <textarea
                        value={this.state.postInput}
                        placeholder="enter some text"
                        onChange={this.postInputHandler}
                      ></textarea>
                      <div className="post-container-actions">
                        <button onClick={this.postHandlerHide}>Cancel</button>
                        <button onClick={this.submitPostHandler}>Post</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null;
      })
    ) : (
      <p className="loading-indicator">Loading Details ....</p>
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
)(ClassDetails);
