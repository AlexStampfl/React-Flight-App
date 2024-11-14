import React from 'react';

function ShowHideButton(props) {

    function update() {
        if (props.showTable) {
            props.toggleTableVisibility(false, 'Show Flight Table')
        } else {
            props.toggleTableVisibility(true, 'Hide Flight Table')
        }
    }
    return (
        <button
            className="btn btn-primary"
            onClick={update}>
            {props.buttonText}
        </button>
    )
}
export default ShowHideButton;