import React, {Component} from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component {

    state = {
        done: false,
        important: this.props.important,
    };

    render() {
        const {label, onDeleted, done, important, onToggleImportant, onToggleDone} = this.props;
        let classNames = "todo-list-item";
        if (done) {
            classNames += ' done'
        }
        if(important){
            classNames += ' important'

        }

        return (
            <span className={classNames}>
              <span
                  className="todo-list-item-label"
                  onClick={onToggleDone}>
                  {label}
              </span>
              <button type="button"
                      className="btn btn-outline-success btn-sm float-right"
              onClick={onToggleImportant}>
                <i className="fa fa-exclamation"/>
              </button>

              <button type="button"
                      className="btn btn-outline-danger btn-sm float-right"
                        onClick={onDeleted}>
                <i className="fa fa-trash-o"/>
              </button>
            </span>
        );
    }
}
