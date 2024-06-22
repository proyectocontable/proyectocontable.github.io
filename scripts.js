document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    const storedUser = localStorage.getItem(username);
    
    if (storedUser && storedUser === password) {
        document.getElementById('loginContainer').classList.add('hidden');
        document.getElementById('contentContainer').classList.remove('hidden');
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    
    if (localStorage.getItem(username)) {
        alert('El nombre de usuario ya existe');
    } else {
        localStorage.setItem(username, password);
        alert('Registro exitoso');
        document.getElementById('registerContainer').classList.add('hidden');
        document.getElementById('loginContainer').classList.remove('hidden');
    }
});

document.getElementById('showRegisterBtn').addEventListener('click', function() {
    document.getElementById('loginContainer').classList.add('hidden');
    document.getElementById('registerContainer').classList.remove('hidden');
});

document.getElementById('showLoginBtn').addEventListener('click', function() {
    document.getElementById('registerContainer').classList.add('hidden');
    document.getElementById('loginContainer').classList.remove('hidden');
});

document.getElementById('entryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    
    const entryList = document.getElementById('entryList');
    const listItem = document.createElement('li');
    listItem.textContent = `${date} - ${description}: $${amount} (${category})`;
    
    entryList.appendChild(listItem);
    
    document.getElementById('entryForm').reset();
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    const entries = document.querySelectorAll('#entryList li');
    const compra = [];
    const venta = [];
    
    entries.forEach(entry => {
        const text = entry.textContent;
        const [dateDescription, categoryText] = text.split(' (');
        const [date, descriptionAmount] = dateDescription.split(' - ');
        const [description, amountText] = descriptionAmount.split(': $');
        const amount = parseFloat(amountText);
        const category = categoryText.replace(')', '');
        
        if (category === 'compra') {
            compra.push({ Fecha: date, Descripción: description, Monto: amount });
        } else {
            venta.push({ Fecha: date, Descripción: description, Monto: amount });
        }
    });
    
    const workbook = XLSX.utils.book_new();
    
    const compraSheet = XLSX.utils.json_to_sheet(compra);
    XLSX.utils.book_append_sheet(workbook, compraSheet, 'Compra');
    
    const ventaSheet = XLSX.utils.json_to_sheet(venta);
    XLSX.utils.book_append_sheet(workbook, ventaSheet, 'Venta');
    
    XLSX.writeFile(workbook, 'libro_contable.xlsx');
});
