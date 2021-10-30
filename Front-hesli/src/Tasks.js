import { Component } from "react";
import {
    addTask,
    addItem,
    getTasks,
    getItem,
    getItemFromTask,
    updateItem,
    deleteTask,
    updateTask,
    deleteItem,
} from "./services/taskServices";

class Tasks extends Component {
    state = { tasks: [], item: [], currentTask: "", currentItem:"", task_id: "", update_change:"", currentDesc: ""};
    
    async componentDidMount() {
        try {
            const { data } = await getTasks();
            this.setState({ tasks: data });
        } catch (error) {
            console.log(error);
        }
        try {
            const { dataItem } = await getItem();
            this.setState({ item: dataItem });
        } catch (error) {
            console.log(error);
        }
    }

    getItemTasks = async (id) =>  {
    try {
        const { data } = await getItemFromTask(id);
        this.setState({ item: data, task_id: id});
    } catch (error) {
        console.log(error);
    }
    }

    handleTaskChange = ({ currentTarget: input }) => {
        this.setState({ currentTask: input.value });
    };
    handleItemChange = ({ currentTarget: input }) => {
        this.setState({ currentItem: input.value });
    };
    handleTitleTasksChange = ({ currentTarget: input }) => {
        this.setState({ update_change: input.value });
    };
    handleDescItemChange = ({ currentTarget: input }) => {
        this.setState({ currentDesc: input.value });
    };

    handleTaskSubmit = async (e) => {
        e.preventDefault();
        const originalTasks = this.state.tasks;
        try {
            // eslint-disable-next-line no-undef
            const { data } = await addTask({ task: this.state.currentTask});
            const tasks = originalTasks;
            tasks.push(data);
            this.setState({ tasks, currentTask: ""});
        } catch (error) {
            console.log(error);
        }
    };
    handleItemSubmit = async (e) => {
        e.preventDefault();
        const originalItem = this.state.item;
        try {

            // eslint-disable-next-line no-undef
            const { data } = await addItem({title: this.state.currentItem, task_id: this.state.task_id, description: this.state.currentDesc});
            const item = originalItem;
            item.push(data);
            this.setState({ item, currentItem: "", currentDesc:"" });
        } catch (error) {
            console.log(error);
        }
    };

    onItemSubmit =  async (id)=>{
        console.log("voici currentItem : "+this.state.currentItem + "voici id" )
        const originalItem = this.state.item;
        const items = {title: this.state.currentItem, task_id:id}
        try {

            // eslint-disable-next-line no-undef
            const { data } = await addItem(items);
            const item = originalItem;
            item.push(data);
            this.setState({ item, currentItem: "" });
        } catch (error) {
            console.log(error);
        }
    }

    handleUpdate = async (currentTask) => {
        const originalItem = this.state.item;
        try {
            const item = [...originalItem];
            const index = item.findIndex((task) => task._id === currentTask);
            item[index] = { ...item[index] };
            item[index].completed = !item[index].completed;
            this.setState({ item });
            await updateItem(currentTask, {
                completed: item[index].completed,
            });
        } catch (error) {
            this.setState({ item: originalItem });
            console.log(error);
        }
    };
    handleTitleUpdate = async (currentTask) => {
        const originalItem = this.state.update_change;
        try {
            const item = [...originalItem];
            const index = item.findIndex((task) => task._id === currentTask);
            item[index] = { ...item[index] };
            item[index].task = !item[index].task;
            this.setState({ item });
            await updateTask(currentTask, {
                task: item[index].task,
            });
        } catch (error) {
            this.setState({ item: originalItem });
            console.log(error);
        }
    };

    handleDelete = async (currentTask) => {
        const originalTasks = this.state.tasks;
        const originalItem = this.state.item;
        try {
            const tasks = originalTasks.filter(
                (task) => task._id !== currentTask
            );
            const item = originalItem.filter(
                (task) => task._id !== currentTask
            );
            this.setState({ tasks });
            this.setState({ item });
            await deleteTask(currentTask);
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };
    handleItemDelete = async (currentItem) => {
        const originalItem = this.state.item;
        try {
            const item = originalItem.filter(
                (item) => item._id !== currentItem
            );
            this.setState({ item });
            await deleteItem(currentItem);
        } catch (error) {
            this.setState({ item: originalItem });
            console.log(error);
        }
    };

}

export default Tasks;
