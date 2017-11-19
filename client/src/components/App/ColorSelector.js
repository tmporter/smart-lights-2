import React from 'react';

class ColorSelector extends React.Component {
    state = {
        colors: []
    }

    componentDidMount() {
        fetch('/api/colors')
            .then(res => res.json())
            .then(colors => {
                this.setState({ colors });
            })
            .catch(error => console.error(error));
    }

    render() {
        return (
            <select>
                {this.state.colors.map(color => (
                    <option value={color.name}>{color.name}</option>
                ))}
            </select>
        );
    }
}

export default ColorSelector;