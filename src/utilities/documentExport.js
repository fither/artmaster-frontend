import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import JsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportCSV = (csvData, fileName, onlyDictWords) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  if (!fileName) {
    fileName = 'data';
  }

  const clearedCsvData = csvData.map((csvD) => changeObjectKeyNames(csvD, onlyDictWords));

  const ws = XLSX.utils.json_to_sheet(clearedCsvData);
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, `${fileName}${fileExtension}`);
};

export const exportPDF = (datas, fileName, onlyDictWords) => {
  if (!datas.length) {
    return;
  }

  if (!fileName) {
    fileName = 'data';
  }

  const unit = 'pt';
  const size = 'A4'; // Use A1, A2, A3 or A4
  const orientation = 'portrait'; // portrait or landscape

  const doc = new JsPDF(orientation, unit, size);

  doc.setFontSize(15);

  const headers = [Object.keys(datas[0])];
  const datasLength = datas.length;
  const changedHeaders = [changeArrayKeyNames(headers[0])];

  const data = [];

  for (let i = 0; i < datasLength; i += 1) {
    const dataRow = [];
    const headersLength = headers[0].length;
    for (let j = 0; j < headersLength; j += 1) {
      dataRow.push(datas[i][headers[0][j]]);
    }
    data.push(dataRow);
  }

  const content = {
    startY: 50,
    head: changedHeaders,
    body: data,
  };

  doc.autoTable(content);
  doc.save(`${fileName}.pdf`);
};

export const printTable = (datas, fileName, onlyDictWords) => {
  if (!datas.length) {
    return;
  }

  if (!fileName) {
    fileName = 'data';
  }

  const unit = 'pt';
  const size = 'A4'; // Use A1, A2, A3 or A4
  const orientation = 'portrait'; // portrait or landscape

  const doc = new JsPDF(orientation, unit, size);

  doc.setFontSize(15);

  const headers = [Object.keys(datas[0])];
  const datasLength = datas.length;
  const changedHeaders = [changeArrayKeyNames(headers[0])];

  const data = [];

  for (let i = 0; i < datasLength; i += 1) {
    const dataRow = [];
    const headersLength = headers[0].length;
    for (let j = 0; j < headersLength; j += 1) {
      dataRow.push(datas[i][headers[0][j]]);
    }
    data.push(dataRow);
  }

  const content = {
    startY: 50,
    head: changedHeaders,
    body: data,
  };

  doc.autoTable(content);
  doc.fileName = fileName;
  const blob = doc.output('dataurlnewwindow');
  window.open(blob, 'PRINT', 'height=400,width=600');
};

const changeArrayKeyNames = (arr) => {
  const newArr = [];
  const arrLength = arr.length;
  for (let i = 0; i < arrLength; i += 1) {
    const findedWord = dict[arr[i]];
    if (findedWord) {
      newArr.push(findedWord);
    } else {
      newArr.push(arr[i]);
    }
  }

  return newArr;
};

const changeObjectKeyNames = (obj, onlyDictWords) => {
  const newObj = {};
  const objKeys = Object.keys(obj);
  const objKeysLength = objKeys.length;
  for (let i = 0; i < objKeysLength; i += 1) {
    const findedWord = dict[objKeys[i]];
    if (findedWord) {
      newObj[findedWord] = obj[objKeys[i]];
    } else if (!findedWord && !onlyDictWords) {
      newObj[objKeys[i]] = obj[objKeys[i]];
    }
  }

  return newObj;
};

const dict = {
  firstName: 'First Name',
  lastName: 'Last Name',
  username: 'Username',
  // role: 'Role',
  // country: 'Country',
  // active: 'Active',
};
