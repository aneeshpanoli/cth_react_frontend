import React from "react";
import ReactQuill from "react-quill"; 
import "react-quill/dist/quill.snow.css"; 
import Button from "@material-ui/core/Button";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
  }

  handleCancel() {
    this.setState({ text: "" });
  }

  handlePost() {
    console.log(this.state.text);
    let data = {
      params: {
        index: 'comments',
        q: {
          projectId:this.props.projectId,
          user: "",
          comments: this.state.text,
          createdAt: new Date(),
          nrVotes:"",
          nrFlags:""

        },
      },
    }
    this.setState({ text: "" });
  }

  render() {
    return (
      <React.Fragment>
        <ReactQuill value={this.state.text} onChange={this.handleChange} />
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: "0.5rem" }}
          onClick={this.handlePost}
        >
          Post comment
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: "0.5rem" }}
          onClick={this.handleCancel}
        >
          Cancel
        </Button>
      </React.Fragment>
    );
  }
}

export default Comments;
