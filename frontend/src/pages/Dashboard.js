import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get("/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");

    try {
      if (editId) {
        await API.put(
          `/tasks/${editId}`,
          { title, description: desc, status: "pending" },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditId(null);
      } else {
        await API.post(
          "/tasks",
          { title, description: desc },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setTitle("");
      setDesc("");
      const res = await API.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDesc(task.description);
    setEditId(task.id);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location = "/";
  };

  return (
    <div className="container container-custom">
      <div className="dashboard-header">
        <h2>Welcome, {username}!</h2>
        <button onClick={logout} className="btn btn-danger custom-button">
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <input
          className="form-control"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="form-control"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type="submit" className={`btn ${editId ? "btn-warning" : "btn-primary"}`}>
          {editId ? "Update Task" : "Add Task"}
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks yet!</p>
      ) : (
        <div className="task-list">
          {tasks.map((t) => (
            <div className="task-item" key={t.id}>
              <div>
                <h5>{t.title}</h5>
                <p>{t.description}</p>
              </div>
              <div className="task-actions">
                <button className="btn btn-sm btn-warning custom-button" onClick={() => handleEdit(t)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger custom-button" onClick={() => handleDelete(t.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
