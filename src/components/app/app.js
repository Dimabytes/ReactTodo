import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component{
    max_id = 100;

    createTodoItem = (label) =>{
        return {
            label,
            important: false,
            done: false,
            id: this.max_id++,
        };
    };

    state = {
        todoData: [
            this.createTodoItem('Drink Tea'),
            this.createTodoItem('Learn React'),
            this.createTodoItem('Get The Cash'),

        ],
        mode: 'active',
        searchPhrase: '',
    };



    addItem = (text) => {
        this.setState(({todoData}) => {
            const newItem = this.createTodoItem(text);
            const newArray = [
                ...todoData,
                newItem,
            ];

            return {
                todoData: newArray
            };
        });
    };




    deleteItem = (id) => {
        this.setState(({todoData}) => {
            console.log(todoData);
            const idx = todoData.findIndex((el) => el.id === id);
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            };
        });
    };

    toggleProperty(arr, id, propName){
            const idx = arr.findIndex((el) => el.id === id);
            const oldItem = arr[idx];
            const newItem = {...oldItem,
                [propName]: !oldItem[propName]};
            return [
                ...arr.slice(0, idx),
                newItem,
                ...arr.slice(idx + 1)
            ]
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        })
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        })
    };

    onToggleFilter = (mode) => {
        this.setState({
            mode
        })
    };

    onSearch = (phrase) => {
        this.setState({
            searchPhrase: phrase.toLowerCase()
        })
    };

    render() {

        const {todoData, mode, searchPhrase} = this.state;
        let newTodoData = [];
        if (mode === 'all'){
            newTodoData = [...todoData];
        } else if (mode === 'done') {
            newTodoData = todoData.filter(todo => todo.done);
        } else if (mode === 'active') {
            newTodoData = todoData.filter(todo => !todo.done);
        }
        if(searchPhrase.length){
            newTodoData = newTodoData.filter(todo => todo.label.toLowerCase().indexOf(searchPhrase) !== -1)
        }


        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearch={this.onSearch} />
                    <ItemStatusFilter mode={this.state.mode} onToggleFilter={this.onToggleFilter}/>
                </div>

                <TodoList todos={newTodoData}
                          onDeleted={this.deleteItem}
                          onToggleImportant={this.onToggleImportant}
                          onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        )
    }

}


