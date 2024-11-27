import React, { useState, useEffect } from 'react';
// just basic crud stuff for adding an item lmk if anyone has any questions - Adam
// o side note I was not 100% sure what we needed so I just kinda added stuff it does not look to nice rn since I was not too sure what type of css we wanted so feel free to add any
// or let me know c:
function ManageComponents() {
  const [components, setComponents] = useState([]);
  const [formData, setFormData] = useState({ name: '', quantity: 0, description: '', location: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentComponentId, setCurrentComponentId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch components on load
  useEffect(() => {
    fetchComponents();
  }, []);

  const fetchComponents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/components');
      const data = await response.json();
      setComponents(data);
    } catch (error) {
      console.error('Error fetching components:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/components', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccessMessage('Component created successfully.');
        setFormData({ name: '', quantity: 0, description: '', location: '' });
        fetchComponents();
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Failed to create component.');
      }
    } catch (error) {
      console.error('Error creating component:', error);
    }
  };

  const handleEdit = (component) => {
    setFormData(component);
    setCurrentComponentId(component._id);
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await fetch(`http://localhost:5000/api/components/${currentComponentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccessMessage('Component updated successfully.');
        setFormData({ name: '', quantity: 0, description: '', location: '' });
        setIsEditing(false);
        fetchComponents();
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Failed to update component.');
      }
    } catch (error) {
      console.error('Error updating component:', error);
    }
  };
  const handleDelete = async (id) => {
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await fetch(`http://localhost:5000/api/components/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSuccessMessage('Component deleted successfully.');
        fetchComponents();
      } else {
        setErrorMessage('Failed to delete component.');
      }
    } catch (error) {
      console.error('Error deleting component:', error);
    }
  };



  return (
    <div>
      <h2>Manage Components</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={isEditing ? handleUpdate : handleCreate}>
        <label>
          Name: <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label><br />
        <label>
          Quantity: <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </label><br />
        <label>
          Description: <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </label><br />
        <label>
          Location: <input type="text" name="location" value={formData.location} onChange={handleChange} />
        </label><br />
        <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
        {isEditing && <button onClick={() => setIsEditing(false)}>Cancel</button>}
      </form>

      <h3>Component List</h3>
      <ul>
        {components.map((component) => (
          <li key={component._id}>
            {component.name} - {component.quantity} (Located at: {component.location})<br />
            <button onClick={() => handleEdit(component)}>Edit</button>
            <button onClick={() => handleDelete(component._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageComponents;
