const { Command } = require("commander");
const { error } = require("console");
const fs = require("fs");
const path = require("path");

const program = new Command();
const DATA_FILE = "task.json";

// Ensure task.json exists, if not we will create one
const initializeTasksFile = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
};

// Read tasks from JSON file
const readTasks = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading tasks:", error.message);
    return [];
  }
};

// Write tasks to JSON file
const writeTasks = (tasks) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.log("Error writing tasks:", error.message);
  }
};

// generate unique ID
const generateId = (tasks) => {
  const ids = tasks.map((task) => task.id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
};

//Add new task
program
  .command("add <description>")
  .description("Add a new task")
  .action((description) => {
    initializeTasksFile();
    const tasks = readTasks();
    const newTask = {
      id: generateId(tasks),
      description,
      status: "todo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    writeTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
  });

//update task
program
  .command("update <id> <description>")
  .description("Update a task description")
  .action((id, description) => {
    const tasks = readTasks();
    const task = tasks.find((t) => t.id === parseInt(id));
    if (task) {
      task.description = description;
      task.updatedAt = new Date().toISOString();
      writeTasks(tasks);
      console.log(`Task ${id} updated successfully`);
    } else {
      console.log(`Task ${id} not found`);
    }
  });

//  Delete Task
program
  .command("delete <id>")
  .description("Delete a task")
  .action((id) => {
    const tasks = readTasks();
    const filteredTasks = tasks.filter((t) => t.id !== parseInt(id));
    if (tasks.length !== filteredTasks.length) {
      writeTasks(filteredTasks);
      console.log(`Task ${id} deleted successfully`);
    } else {
      console.log(`Task ${id} not found`);
    }
  });

// Mark task Status
const markTask = (id, status) => {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === parseInt(id));
  if (task) {
    task.status = status;
    task.updatedAt = new Date().toISOString();
    writeTasks(tasks); // Add this line to save the changes
    console.log(`Task ${id} marked as ${status}`);
  } else {
    console.log(`Task ${id} not found`);
  }
};

program
  .command("mark-in-progress <id>")
  .description("Mark a task as in progress")
  .action((id) => markTask(id, "in-progress"));

program
  .command("mark-done <id>")
  .description("Mark a task as in done")
  .action((id) => markTask(id, "done"));

//List tasks
program
  .command("list [status]")
  .description("List all tasks or filter by status")
  .action((status) => {
    const tasks = readTasks();
    const filteredTasks = status
      ? tasks.filter((t) => t.status === status)
      : tasks;

    if (filteredTasks.length === 0) {
      console.log("No tasks found");
      return;
    }

    console.log("\nTask List:");
    console.log("-".repeat(50));
    filteredTasks.forEach((task) => {
      console.log(`ID: ${task.id}`);
      console.log(`Description: ${task.description}`);
      console.log(`Status: ${task.status}`);
      console.log(`Created: ${new Date(task.createdAt).toLocaleString()}`);
      console.log(`Updated: ${new Date(task.updatedAt).toLocaleString()}`);
      console.log("-".repeat(50));
    });
  });

program.parse(process.argv);
