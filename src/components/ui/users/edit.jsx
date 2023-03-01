import React from "react";
import { useParams } from "react-router-dom";
import FormUser from "../form/formUser";
import PropTypes from "prop-types";

const Edit = ({ user }) => {
    const { edit } = useParams();
    return (
        edit === "edit" && (
            <>
                {
                    <div className="row mt-5">
                        <div className="col-6 offset-md-3 offset-lg-3 shadow p-5">
                            <FormUser user={user} />
                        </div>
                    </div>
                }
            </>
        )
    );
};

Edit.propTypes = {
    user: PropTypes.object
};

export default Edit;
