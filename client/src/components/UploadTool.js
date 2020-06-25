import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPhoto } from '../actions/photoActions';

class UploadTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: ''
    }
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    board: PropTypes.object.isRequired,
    addPhoto: PropTypes.func.isRequired
  };

  onChange(e) {
    let files = e.target.files;
    let reader = new FileReader();

    reader.onload=(e) => {
      var result = reader.result;
      var arrayBase64 = result.split(',');
      var data = Buffer.from(arrayBase64[1], 'base64');
      var photo = { data, contentType: arrayBase64[0] }; 
      this.props.addPhoto(this.props.board.currentBoard.boardID, this.props.user.id, photo);
    }

    reader.readAsDataURL(files[0]);
  }   

  render() {
    return (
      <label className="file btn btn-sm btn-primary mr-3">
          Upload <input type="file" onChange={(e) => this.onChange(e)} hidden/>
      </label>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  board: state.board
});

export default connect(
  mapStateToProps,
  { addPhoto }
)(UploadTool);
