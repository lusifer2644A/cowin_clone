import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import { loadMembersData } from "../../actions/member";
import Member from "./Member";

import PropTypes from "prop-types";

const Dashboard = ({ auth, loadMembersData, loadUser }) => {
    const history = useHistory();

    useEffect(() => {
        loadUser();
        loadMembersData();
    }, []);

    return (
        <div className="dashboard_container">
            <div className="members_block">
                <div className="primary-color large bold">Account Details</div>
                <div className="x-small">
                    Registered Mobile Number:{" "}
                    <span>{auth.user ? auth.user.number : ""}</span>{" "}
                </div>
                <Member />
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        return history.push("/addmember");
                    }}
                >
                    Add Member
                </button>
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    loadUser: PropTypes.func.isRequired,
    loadMembersData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { loadMembersData, loadUser })(
    Dashboard
);
