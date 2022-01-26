import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
    return (
        alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
            <div
                id={alert.id}
                className={`alert alert-${alert.alertType}`}
                key={alert.id}
            >
                {alert.msg}
            </div>
        ))
    );
};

Alert.propTypes = {
    alerts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
