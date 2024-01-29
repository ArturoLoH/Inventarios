document.addEventListener('DOMContentLoaded', function () {
  const addItemForm = document.querySelector('.add-item form');
  const inventoryTable = document.querySelector('.inventory table tbody');

  addItemForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const action = addItemForm.querySelector('select[name="action"]').value;
    const name = addItemForm.querySelector('input[name="name"]').value;
    const code = addItemForm.querySelector('input[name="code"]').value;
    const quantity = parseInt(addItemForm.querySelector('input[name="quantity"]').value, 10);

    if (action === 'add') {
      addItem(name, code, quantity);
    } else if (action === 'remove') {
      removeItem(name, code, quantity);
    }
  });

  function addItem(name, code, quantity) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="name">${name}</td>
      <td class="code">${code}</td>
      <td class="quantity">${quantity}</td>
      <td>
        <button class="add">Add</button>
        <button class="remove">Remove</button>
      </td>
    `;

    row.querySelector('.add').addEventListener('click', function () {
      updateQuantity(row, 1);
    });

    row.querySelector('.remove').addEventListener('click', function () {
      updateQuantity(row, -1);
    });

    inventoryTable.appendChild(row);
    checkAlert(row);
  }

  function updateQuantity(row, change) {
    const quantityCell = row.querySelector('.quantity');
    const newQuantity = parseInt(quantityCell.textContent, 10) + change;
    if (newQuantity >= 0) {
      quantityCell.textContent = newQuantity;
      checkAlert(row);
    }
  }

  function checkAlert(row) {
    const quantityCell = row.querySelector('.quantity');
    const quantity = parseInt(quantityCell.textContent, 10);

    if (quantity === 1) {
      quantityCell.classList.add('alert');
    } else {
      quantityCell.classList.remove('alert');
    }
  }

  function removeItem(name, code, quantity) {
    const rows = inventoryTable.querySelectorAll('tr');
    let found = false;

    rows.forEach((row) => {
      const rowName = row.querySelector('.name').textContent;
      const rowCode = row.querySelector('.code').textContent;
      const rowQuantity = parseInt(row.querySelector('.quantity').textContent, 10);

      if (name === rowName && code === rowCode) {
        found = true;
        updateQuantity(row, -quantity);

        if (rowQuantity - quantity <= 0) {
          inventoryTable.removeChild(row);
        }
      }
    });

    if (!found) {
      alert('Item not found in the inventory.');
    }
  }
});
