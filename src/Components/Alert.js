import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <Message key={alert.id} color={alert.color}>
      {alert.msg}
    </Message>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
