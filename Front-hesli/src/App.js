import React from "react";
import Tasks from "./Tasks";
import { Paper, TextField } from "@material-ui/core";
import { Checkbox, Button } from "@material-ui/core";
import "./App.css";

class App extends Tasks {
    state = { selected_task: "", tasks: [], item: [], task_id: "", currentTask: "", currentItem: "", currentDesc: "" };

    render() {




        const { tasks } = this.state;

        return (

            <div className="App flex">
                <Paper elevation={16} className="container">
                    <div className="heading">TO-DO liste</div>
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
                            placeholder="Nouvelle TODO liste"
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
                                    {task.task}
                                </div>
                                <Button
                                    onClick={() => this.handleDelete(task._id)}
                                    color="primary"
                                >
                                    update
                                </Button>
                                <Button
                                    onClick={() => this.handleDelete(task._id)}
                                    color="secondary"
                                >
                                    delete
                                </Button>
                            </Paper>
                        ))}
                    </div>
                </Paper>

                {this.renderTask()}
            </div>
        );

    }

    renderTask() {

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
                        placeholder="Nouvelle tache"
                    />
                    <TextField
                        variant="outlined"
                        size="small"
                        style={{ width: "80%" }}
                        value={this.state.currentDesc}
                        onChange={this.handleDescItemChange}
                        placeholder="description"
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
                    {item.map((item, id) => (
                        <Paper

                            key={id}
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
                                {item.title} -
                                {item.description ? item.description : "Aucune description"}
                            </div>
                            {!item.completed ? <Button
                                color="primary"
                            >
                                update
                            </Button> : null}
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
