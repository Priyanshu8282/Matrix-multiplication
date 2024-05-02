function getMatrixDimensions() {
    const matrix1Rows = parseInt(document.getElementById('matrix1Rows').value);
    const matrix1Cols = parseInt(document.getElementById('matrix1Cols').value);
    const matrix2Rows = parseInt(document.getElementById('matrix2Rows').value);
    const matrix2Cols = parseInt(document.getElementById('matrix2Cols').value);

    if (isNaN(matrix1Rows) || isNaN(matrix1Cols) || isNaN(matrix2Rows) || isNaN(matrix2Cols)) {
        alert('Please enter valid dimensions for both matrices.');
        return;
    }

    if (matrix1Cols !== matrix2Rows) {
        alert('Matrix multiplication requires number of columns of Matrix 1 to be equal to number of rows of Matrix 2.');
        return;
    }

    createMatrixInputs(matrix1Rows, matrix1Cols, 'matrix1');
    createMatrixInputs(matrix2Rows, matrix2Cols, 'matrix2');

    document.getElementById('matrixInput').style.display = 'none';
    document.getElementById('matrixValues').style.display = 'block';
}

function createMatrixInputs(rows, cols, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        for (let j = 0; j < cols; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.placeholder = 'Enter value';
            row.appendChild(input);
        }
        container.appendChild(row);
    }
}

function calculate() {
    const matrix1Values = getMatrixValues('matrix1');
    const matrix2Values = getMatrixValues('matrix2');

    const resultMatrix = multiplyMatrices(matrix1Values, matrix2Values);
    displayResult(resultMatrix);
}

function getMatrixValues(containerId) {
    const container = document.getElementById(containerId);
    const rows = container.children;

    const matrixValues = [];
    for (let i = 0; i < rows.length; i++) {
        const rowInputs = rows[i].querySelectorAll('input');
        const rowValues = [];
        rowInputs.forEach(input => rowValues.push(parseFloat(input.value)));
        matrixValues.push(rowValues);
    }

    return matrixValues;
}

function multiplyMatrices(matrix1, matrix2) {
    const result = [];
    const rows1 = matrix1.length;
    const cols1 = matrix1[0].length;
    const rows2 = matrix2.length;
    const cols2 = matrix2[0].length;

    for (let i = 0; i < rows1; i++) {
        result[i] = [];
        for (let j = 0; j < cols2; j++) {
            result[i][j] = 0;
            for (let k = 0; k < cols1; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    return result;
}

function displayResult(resultMatrix) {
    const resultContainer = document.getElementById('resultMatrix');
    resultContainer.innerHTML = '';

    const table = document.createElement('table');
    resultMatrix.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
           
        });
        table.appendChild(tr);
    });
    resultContainer.appendChild(table);

    document.getElementById('result').style.display = 'block';
}