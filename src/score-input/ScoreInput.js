import './scoreInput.css';
import React from 'react';
import { IconButton } from '@material-ui/core';
import { Undo } from '@material-ui/icons';
import ModifierButton from './ModifierButton';
import ValueButton from './ValueButton';

/**
 * Handles user input for games.
 * @param {number} props.next Reports the next score.
 * @param props.undo Reports that the last score should be undone.
 */
class ScoreInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modifier: 1
        };
    }

    setModifier(modValue) {
        if (this.state.modifier === modValue) {
            this.setState({ modifier: 1 });
        } else {
            this.setState({ modifier: modValue });
        }
    }

    handleScoreInput = (value, modifier) => {
        this.props.next(value * modifier);
        this.setModifier(1);
    }

    render() {
        const defaultValues = [...Array(20).keys()].map(i => i + 1);
        const specialValues = [25, 50, 0];

        return (
            <div className="grid-container">
                {defaultValues.map(i =>
                    <ValueButton value={i} modifier={this.state.modifier} onClick={this.handleScoreInput} key={i}></ValueButton>
                )}
                <div className="modifiers">
                    <ModifierButton text="Double" onClick={() => this.setModifier(2)}></ModifierButton>
                    <ModifierButton text="Triple" onClick={() => this.setModifier(3)}></ModifierButton>
                </div>
                <div className="specials">
                    {specialValues.map(i =>
                        <ValueButton value={i} modifier={1} onClick={this.handleScoreInput} key={i}></ValueButton>)}
                </div>
                <div className="back">
                    <IconButton color="primary" aria-label="undo last action" onClick={() => this.props.undo()}>
                        <Undo></Undo>
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default ScoreInput;