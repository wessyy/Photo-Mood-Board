
import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavItem,
  NavLink,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import UploadTool from './UploadTool';
import { logout } from '../actions/authActions';

class AppNavbar extends Component {
  state = {
    isOpen: false 
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    board: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <UploadTool />
        </NavItem>
        <NavItem>
          <UncontrolledDropdown>
            <DropdownToggle caret>
              Boards
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Create Board</DropdownItem>
              {(this.props.board && this.props.board.boards) ? this.props.board.boards.map((board, i) => {
                return (
                <DropdownItem key={i} onClick={this.props.logout}>
                  {board.name}
                </DropdownItem>
                );
              }) : null}
            </DropdownMenu>
          </UncontrolledDropdown>
        </NavItem>
        <NavItem>
          <UncontrolledDropdown>
            <DropdownToggle caret>
              <strong>{user ? `${user.name}` : ''}</strong>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem onClick={this.props.logout}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color='dark' dark expand='sm' className='mb-5'>
          <Container>
            <NavbarBrand href='/'>Reley App</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  board: state.board
});

export default connect(
  mapStateToProps,
  { logout }
)(AppNavbar);