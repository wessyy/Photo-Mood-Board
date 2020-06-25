import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { getPhotos } from '../actions/photoActions';
import PropTypes from 'prop-types';

class Photos extends Component {
    static propTypes = {
        getPhotos: PropTypes.func.isRequired,
        photos: PropTypes.array,
        isAuthenticated: PropTypes.bool
    };

    componentDidMount() {
        this.props.getPhotos('5e57346221b4f9b47252dff9');
    }

    render() {
        return (
            <Container>
                {this.props.photos.map(img => (
                    <img src={img} alt='SUM TING WONG'/>
                ))}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
  photos: state.photo.photos,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getPhotos }
)(Photos);