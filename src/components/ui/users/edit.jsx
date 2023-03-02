import React from "react";
import FormUser from "../form/formUser";
import PropTypes from "prop-types";

const Edit = ({ user, onSubmit }) => {
    return (
        <>
            {
                <div className="row mt-5">
                    <div className="col-6 offset-md-3 offset-lg-3 shadow p-5">
                        <FormUser user={user} onSubmit={onSubmit} />
                    </div>
                </div>
            }
        </>
    );
};

Edit.propTypes = {
    user: PropTypes.object,
    onSubmit: PropTypes.func
};

export default Edit;
