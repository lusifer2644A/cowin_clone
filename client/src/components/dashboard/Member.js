import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import Dose from "./Dose";

const Member = ({ members }) => {
    return members.map((member) => (
        <div className="member_card" key={member._id}>
            <div className="member_name medium primary-color bold">
                {member.name}
            </div>
            <div className="member_gender x-small">{member.gender}</div>
            <div className="flex-row">
                <div className="member_dob  grey">
                    Year of Birth: {moment.utc(member.dob).format("YYYY")}
                </div>
                <div className="vertical_line"></div>
                <div className="member_idProof grey">
                    Photo ID: {member.idProof}
                </div>
                <div className="vertical_line"></div>
                <div className="member_idNumber grey">
                    ID Number: {member.idNumber}
                </div>
            </div>
            <hr className="hrdashed" />
            <div className="x-small">Appointment Details ⓘ</div>
            <Dose name="Dose 1" details={member.dose1} member={member} />

            {member.dose1.registered && (
                <>
                    <hr className="hrdashed" />
                    <Dose
                        name="Dose 2"
                        details={member.dose2}
                        member={member}
                    />
                </>
            )}
        </div>
    ));
};

const mapStateToProps = (state) => ({
    members: state.members,
});

export default connect(mapStateToProps, {})(Member);
