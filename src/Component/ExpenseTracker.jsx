
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../Store/ContextProvider";
import { Form, Button, Table } from "react-bootstrap";

const ExpenseTracker = () => {
    const { idToken } = useContext(Context);
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "Food",
  });

  const [isLoading, setIsLoading] = useState(false);

  const firebaseUrl = "https://expensetracker-e079e-default-rtdb.firebaseio.com/expenses.json";

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(firebaseUrl);
        if (response.data) {
          const loadedExpenses = Object.keys(response.data).map((key) => ({
            id: key,
            ...response.data[key],
          }));
          setExpenses(loadedExpenses);
        }
      } catch (error) {
        alert("Error fetching expenses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.amount || !formData.description || !formData.category) {
      alert("Please fill all fields!");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(firebaseUrl, formData);
      if (response.status === 200) {
        const newExpense = { id: response.data.name, ...formData };
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
        setFormData({ amount: "", description: "", category: "Food" });
      }
    } catch (error) {
      console.error("Error saving expense:", error);
      alert("Failed to save expense. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Add Expense"}
        </button>
      </Form>

      <div style={{ marginTop: "2rem" }}>
        <h4>Expenses List</h4>
        {isLoading && <p>Loading...</p>}
      {expenses.length === 0 && !isLoading && <p>No expenses found.</p>}
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
