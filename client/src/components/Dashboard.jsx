import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ name: '', description: '', quantity: '' });
  const [updateItem, setUpdateItem] = useState({ id: '', name: '', description: '', quantity: '' });

  useEffect(() => {
    // Fetch inventory items from the API
    const fetchInventory = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/inventory');
        const data = await response.json();
        setInventory(data); 
      } catch (error) {
        console.error('Error fetching inventory:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/components', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        const addedItem = await response.json();
        setInventory([...inventory, addedItem]);
        setNewItem({ name: '', description: '', quantity: '' }); // Reset form
        alert('Item added successfully!');
      } else {
        alert('Failed to add item.');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/components/${updateItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: updateItem.name,
          description: updateItem.description,
          quantity: updateItem.quantity,
        }),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        setInventory(
          inventory.map((item) => (item.id === updateItem.id ? updatedItem : item))
        );
        setUpdateItem({ id: '', name: '', description: '', quantity: '' }); // Reset form
        alert('Item updated successfully!');
      } else {
        alert('Failed to update item.');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/components/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setInventory(inventory.filter((item) => item.id !== id));
        alert('Item deleted successfully!');
      } else {
        alert('Failed to delete item.');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="dashboard">
      <h1>Welcome {user} to Circuit-Surge!</h1>
      <p>You are successfully logged in!</p>

      <h2>Add New Inventory Item</h2>
      <form onSubmit={handleAddItem}>
        <label>
          Name:
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            required
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            required
          />
        </label>
        <button type="submit">Add Item</button>
      </form>

      <h2>Update Inventory Item</h2>
      <form onSubmit={handleUpdateItem}>
        <label>
          Item ID:
          <input
            type="text"
            value={updateItem.id}
            onChange={(e) => setUpdateItem({ ...updateItem, id: e.target.value })}
            required
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            value={updateItem.name}
            onChange={(e) => setUpdateItem({ ...updateItem, name: e.target.value })}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={updateItem.description}
            onChange={(e) => setUpdateItem({ ...updateItem, description: e.target.value })}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={updateItem.quantity}
            onChange={(e) => setUpdateItem({ ...updateItem, quantity: e.target.value })}
          />
        </label>
        <button type="submit">Update Item</button>
      </form>

      <h2>Inventory Items</h2>
      {loading ? (
        <p>Loading inventory...</p>
      ) : inventory.length > 0 ? (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>
                  <button onClick={() => setUpdateItem(item)}>Edit</button>
                  <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No inventory items found.</p>
      )}
    </div>
  );
};

export default Dashboard;