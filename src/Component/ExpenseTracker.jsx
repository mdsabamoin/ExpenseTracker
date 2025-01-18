import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Table, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, deleteExpense, updateExpense, setExpenses } from "../Slices/ExpenseSlice";
import { toggleTheme } from '../Slices/themeSlice';
import { exportToCSV } from "../Download/Csv";

const ExpenseTracker = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.theme);
    const expenses = useSelector((state) => state.expenses.expenses);
    const [formData, setFormData] = useState({
        amount: "",
        description: "",
        category: "Food",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const[premium , SetPremium] = useState(false);

    const firebaseUrl = "https://expensetracker-e079e-default-rtdb.firebaseio.com/expenses.json";

    // Fetch Expenses on Mount
    useEffect(() => {
        const fetchExpenses = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(firebaseUrl);
                if (response.data) {
                    const loadedExpenses = Object.keys(response.data).map((key) => ({
                        id: key,
                        ...response.data[key],
                        amount: Number(response.data[key].amount), 
                    }));
                    dispatch(setExpenses(loadedExpenses));
                }
            } catch (error) {
                setError("Failed to load expenses. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchExpenses();
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!formData.amount || !formData.description || !formData.category) {
            alert("Please fill in all fields!");
            return;
        }

        if (formData.amount <= 0) {
            alert("Amount should be a positive number!");
            return;
        }

        try {
            setIsLoading(true);
            setSuccessMessage("");

            if (isEditing) {
                // Update Expense
                await axios.put(
                    `https://expensetracker-e079e-default-rtdb.firebaseio.com/expenses/${editId}.json`,
                    formData
                );
                dispatch(updateExpense({ id: editId, ...formData }));
                setSuccessMessage("Expense updated successfully!");
                setIsEditing(false);
                setEditId(null);
            } else {
                // Add Expense
                const response = await axios.post(firebaseUrl, formData);
                const newExpense = { id: response.data.name, ...formData };
                dispatch(addExpense(newExpense));
                setSuccessMessage("Expense added successfully!");
            }

            setFormData({ amount: "", description: "", category: "Food" });
        } catch (error) {
            console.error("Error saving expense:", error);
            setError("Failed to save expense. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (expense) => {
        setIsEditing(true);
        setEditId(expense.id);
        setFormData({
            amount: expense.amount,
            description: expense.description,
            category: expense.category,
        });
    };

    const handleDelete = async (expense) => {
        if (window.confirm("Are you sure you want to delete this expense?")) {
            
            try {
                
                await axios.delete(
                    `https://expensetracker-e079e-default-rtdb.firebaseio.com/expenses/${expense.id}.json`
                );
                dispatch(deleteExpense({id:expense.id,...expense}));
                
            } catch (error) {
                setError("Failed to delete expense. Please try again.");
            }
        }
    };

    const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);

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
                <Form.Group controlId="formDescription" style={{ marginBottom: "1rem" }}>
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
                <Button type="submit" disabled={isLoading} variant="primary">
                    {isEditing ? "Update" : "Add"} Expense
                </Button>
            </Form>

            {error && <Alert variant="danger" style={{ marginTop: "20px" }}>{error}</Alert>}
            {successMessage && <Alert variant="success" style={{ marginTop: "20px" }}>{successMessage}</Alert>}

            <div style={{ marginTop: "2rem" }}>
                <h4>Expenses List</h4>
                {isLoading && <Spinner animation="border" />}
                {!isLoading && expenses.length === 0 && <p>No expenses found.</p>}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense, index) => (
                            <tr key={expense.id}>
                                <td>{index + 1}</td>
                                <td>{expense.amount}</td>
                                <td>{expense.description}</td>
                                <td>{expense.category}</td>
                                <td>
                                    <Button size="sm" onClick={() => handleEdit(expense)}>Edit</Button>{" "}
                                    <Button size="sm" variant="danger" onClick={() => handleDelete(expense)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {totalExpense > 10000 && expenses.length > 0 && (
                    <Button variant="danger" style={{ marginTop: "20px" }} onClick={()=>SetPremium(true)}>
                        Activate Premium
                    </Button>
                    
                )}
                
            </div>
            {premium  && <div style={{marginTop:"2%"}}>
            <button style={{marginRight:"2%"}} onClick={() => exportToCSV(expenses)}>Download CSV</button>
            <button style={{marginLeft:"2%",marginRight:"2%"}}  onClick={() => dispatch(toggleTheme())}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      <button  style={{marginLeft:"2%"}} onClick={() => SetPremium(false)}>Close</button>
      </div>}
        </div>
    );
};

export default ExpenseTracker;
