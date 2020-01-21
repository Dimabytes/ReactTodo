import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component{
    getClassButton = (type) => {
        return type === this.props.mode ? 'btn btn-info' : 'btn btn-outline-secondary'

    };


    render() {
        const {onToggleFilter} = this.props;
        return (
            <div className="btn-group">
                <button type="button"
                        className={this.getClassButton('all')}
                        onClick={() => onToggleFilter('all')}

                >All</button>
                <button type="button"
                        className={this.getClassButton('active')}
                        onClick={() => onToggleFilter('active')}
                >Active</button>
                <button type="button"
                        className={this.getClassButton('done')}
                        onClick={() => onToggleFilter('done')}
                >Done</button>
            </div>
        );
    }
}
