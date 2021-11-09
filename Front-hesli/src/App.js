import React from "react";
import Tasks from "./Tasks";
import { Paper, TextField } from "@material-ui/core";
import { Checkbox, Button } from "@material-ui/core";
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import "./App.css";


class App extends Tasks {

    state = { selected_task: "", tasks: [], item: [], task_id: "", currentTask: "", currentItem: "", currentDesc: "", modal_open: false, edit: "" };

    render() {
        const { tasks } = this.state;

        return (

            <React.Fragment>
                <div className="App flex">

                    <Paper elevation={16} className="container">
                        <div className="heading">To Do List</div>
                        <form
                            onSubmit={this.handleTaskSubmit}
                            className="flex"
                            style={{ margin: "15px 0" }}
                        >
                            <TextField
                                variant="outlined"
                                size="small"
                                style={{ width: "80%" }}
                                value={this.state.currentTask}
                                required={true}
                                onChange={this.handleTaskChange}
                                placeholder="Type here for a new Task To Do "
                            />
                            <Button
                                style={{ height: "40px" }}
                                color="primary"
                                variant="outlined"
                                type="submit"
                            >
                                Add task
                            </Button>
                        </form>
                        <div>
                            {tasks.map((task) =>

                            (

                                <Paper
                                    onClick={() => this.getItemTasks(task._id)}
                                    key={task._id}
                                    className="flex task_container"
                                >

                                    <div
                                    >

                                        <EditText
                                            name="textbox1"
                                            defaultValue={task.task}
                                            style={{ right: "100px", position: "relative" }}
                                        />
                                    </div>

                                    <Button
                                        onClick={() => this.handleDelete(task._id)}
                                        color="secondary"
                                        style={{ left: "120px", position: "relative" }}
                                    >
                                        delete
                                    </Button>
                                </Paper>
                            ))}
                        </div>
                    </Paper>

                    {this.renderItem()}
                </div>
            </React.Fragment>
        );
    }

    renderItem() {

        const { item } = this.state;
        if (!item) {
            return null;
        }
        return (
            <Paper elevation={3} className="container">
                <div className="heading">Item</div>
                <form
                    onSubmit={this.handleItemSubmit}
                    className="flex"
                    style={{ margin: "15px 0" }}
                >
                    <TextField
                        variant="outlined"
                        size="small"
                        style={{ width: "80%" }}
                        value={this.state.currentItem}
                        required={true}
                        onChange={this.handleItemChange}
                        placeholder="Title"
                    />
                    <TextField
                        variant="outlined"
                        size="small"
                        style={{ width: "80%" }}
                        value={this.state.currentDesc}
                        onChange={this.handleDescItemChange}
                        placeholder="Description"
                    />
                    <Button
                        style={{ height: "40px" }}
                        color="primary"
                        variant="outlined"
                        type="submit"
                    >
                        Add item
                    </Button>
                </form>
                <div>
                    {item.map((item) => (
                        <Paper
                            key={item._id}
                            className="flex task_container"
                        >
                            <Checkbox
                                checked={item.completed}
                                onClick={() => this.handleUpdate(item._id)}
                                color="primary"
                            />
                            <div
                                className={
                                    item.completed
                                        ? "task line_through"
                                        : "task"
                                }
                            >
                                <EditText
                                    readonly={item.completed ? true : false}
                                    name="textbox1"
                                    defaultValue={item.title}
                                />
                                -
                                <EditText
                                    readonly={item.completed ? true : false}
                                    name="textbox1"
                                    defaultValue={item.description ? item.description : "No description"}

                                />


                            </div>

                            <Button
                                onClick={() => this.handleItemDelete(item._id)}
                                color="secondary"
                            >
                                delete
                            </Button>
                        </Paper>
                    ))}
                </div>
            </Paper>
        )
    }
}

export default App;