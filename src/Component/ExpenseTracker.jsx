

import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "Food",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) {
      alert("Please fill out all fields!");
      return;
    }

    setExpenses((prevExpenses) => [...prevExpenses, formData]);
    setFormData({ amount: "", description: "", category: "Food" });
  };

  return (
    <div style={{ margin: "2rem auto", maxWidth: "600px" }}>
      <h3>Daily Expense Tracker</h3>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="formAmount" style={{ marginBottom: "1rem" }}>
          <Form.Label>Amount Spent</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="Enter amount"
          />
        </Form.Group>
        <Form.Group
          controlId="formDescription"
          style={{ marginBottom: "1rem" }}
        >
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter description"
          />
        </Form.Group>
        <Form.Group controlId="formCategory" style={{ marginBottom: "1rem" }}>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Others">Others</option>
          </Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" style={{ width: "100%" }}>
          Add Expense
        </Button>
      </Form>

      <div style={{ marginTop: "2rem" }}>
        <h4>Expenses List</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
                <td>{expense.category}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ExpenseTracker;
