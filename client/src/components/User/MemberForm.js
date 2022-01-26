import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNewMember } from "../../actions/member";
import PropTypes from "prop-types";

const MemberForm = ({ addNewMember }) => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        dob: "",
        idProof: "",
        idNumber: "",
    });

    const { name, gender, dob, idNumber, idProof } = formData;

    //Set form data
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newMember = {
            name,
            gender,
            dob,
            idProof,
            idNumber,
        };
        addNewMember(newMember);
        history.push("/dashboard");
    };

    return (
        <div className="container">
            <div className="member-form white_container">
                <div className="x-large primary-color">New Member</div>
                <form onSubmit={onSubmitHandler}>
                    <div className="input-field">
                        <input
                            type="text"
                            name="name"
                            required={true}
                            onChange={(e) => onChange(e)}
                        />
                        <label>Name</label>
                        <span></span>
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            name="gender"
                            required={true}
                            onChange={(e) => onChange(e)}
                        />
                        <label>Gender</label>
                        <span></span>
                    </div>

                    <div className="input-field">
                        {/* <label for="dob">Date of Birth</label> */}
                        <input
                            type="text"
                            name="dob"
                            id="dob"
                            placeholder="Date of Birth"
                            className="input-date"
                            required={true}
                            onChange={(e) => onChange(e)}
                            onFocus={(e) => {
                                e.target.type = "date";
                            }}
                            onBlur={(e) => {
                                e.target.type = "text";
                            }}
                        />
                        <span></span>
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            name="idProof"
                            required={true}
                            onChange={(e) => onChange(e)}
                        />
                        <label>Id Proof</label>
                        <span></span>
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            name="idNumber"
                            required={true}
                            onChange={(e) => onChange(e)}
                        />
                        <label>Id Number</label>
                        <span></span>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

MemberForm.propTypes = {
    addNewMember: PropTypes.func.isRequired,
};

export default connect(null, { addNewMember })(MemberForm);
