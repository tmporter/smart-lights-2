import React from 'react';
import { Table, Tbody, Thead, Tr, Th, Td } from '../Table/Table';
import Input from '../Input/Input';
import Button from '../Common/Button';

class ColorTable extends React.Component {
    state = {
        colors: [],
        newColor: {
            name: '',
            value: ''
        }
    }

    componentDidMount() {
        fetch('/api/colors')
            .then(res => res.json())
            .then(colors => this.setState({ colors }))
            .catch(err => console.error(err));
    }

    handleInputChange = (event) => {
        this.setState({
            newColor: {
                ...this.state.newColor,
                [event.target.name]: event.target.value
            }
        });
    }

    addNewColor = () => {
        const { newColor } = this.state;

        if (newColor.name && newColor.value) {
            fetch('/api/colors', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newColor)
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            colors: [...this.state.colors, json.color],
                            newColor: {
                                name: '',
                                value: ''
                            }
                        });
                    } else {
                        console.log(json.message);
                    }
                })
                .catch(err => console.error(err));
        }
    }

    activateColor = (id) => {
        fetch(`/api/colors/active`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                isSpecial: false
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
            });
    }

    deleteColor = (id) => {
        fetch(`/api/colors/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({
                        colors: this.state.colors.filter(color => color._id !== id)
                    });
                } else {
                    console.log(json.message);
                }
            });
    }

    render() {
        return (
            <Table>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Hex</Th>
                        <Th />
                    </Tr>
                </Thead>
                <Tbody>
                    {this.state.colors.map(color => (
                        <Tr>
                            <Td>{color.name}</Td>
                            <Td>{color.value}</Td>
                            <Td>
                                <a href='#' onClick={() => this.activateColor(color._id)}>Activate</a>
                                &nbsp;|&nbsp;
                                <a href='#' onClick={() => this.deleteColor(color._id)}>Delete</a>
                            </Td>
                        </Tr>
                    ))}
                    <Tr className='new'>
                        <Td>
                            <Input
                                type='text'
                                placeholder='red'
                                name='name'
                                value={this.state.newColor.name}
                                onChange={this.handleInputChange}
                            />
                        </Td>
                        <Td>
                            <Input
                                type='text'
                                placeholder='ff0000'
                                name='value'
                                value={this.state.newColor.value}
                                onChange={this.handleInputChange}
                            />
                        </Td>
                        <Td>
                            <Button type='button' onClick={this.addNewColor}>Add</Button>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        );
    }
}

export default ColorTable;