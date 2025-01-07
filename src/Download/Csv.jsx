
export const  exportToCSV = (expenses)=>{
    const headers = ['Amount', 'Description', 'Category'];
  const rows = expenses.map((expense) => [
    expense.amount,
    expense.description,
    expense.category,
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'expenses.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}