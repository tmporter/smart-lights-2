import React from 'react';
import Button from '../Common/Button';

class SpecialButton extends React.Component {
    render() {
        return (
            <Button
                type='button'
                onClick={() => this.props.onClick(this.props.type)}>
                {this.props.children}
            </Button>
        );
    }
}

export default SpecialButton;