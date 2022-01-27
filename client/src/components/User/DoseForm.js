import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { addNewDose } from "../../actions/member";

const DoseForm = ({ addNewDose }) => {
    const history = useHistory();
    const params = useParams();

    const [formData, setFormData] = useState({
        vaccineName: "",
        center: "",
        date: "",
        timeSlot: "",
    });

    const { vaccineName, center, date, timeSlot } = formData;

    //Set form data
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newDose = {
            id: params.memberId,
            registered: true,
            vaccineName,
            center,
            date,
            timeSlot,
        };

        console.log(newDose);

        addNewDose(newDose, params.doseName);
        history.push("/dashboard");
    };

    return (
        <div className="container">
            <div className="member-form white_container">
                <div className="x-large primary-color">
                    Register for{" "}
                    {params.doseName.charAt(0).toUpperCase(0) +
                        params.doseName.slice(1)}
                </div>
                <form onSubmit={onSubmitHandler}>
                    <div className="input-field">
                        <input
                            type="text"
                            name="vaccineName"
                            required={true}
                            onChange={(e) => onChange(e)}
                        />
                        <label>Vaccine Name</label>
                        <span></span>
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            name="center"
                            required={true}
                            onChange={(e) => onChange(e)}
                        />
                        <label>Center</label>
                        <span></span>
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            name="date"
                            id="date"
                            placeholder="Date"
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
                            name="timeSlot"
                            required={true}
                            onChange={(e) => onChange(e)}
                        />
                        <label>Time Slot</label>
                        <span></span>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

DoseForm.propTypes = {
    addNewDose: PropTypes.func.isRequired,
};

export default connect(null, { addNewDose })(DoseForm);
