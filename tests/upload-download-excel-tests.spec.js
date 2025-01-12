const ExcelJs = require('exceljs');
const {test, expect} = require('@playwright/test');


async function writeExcelTest(searchText, replaceValue,change, filePath) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");
  const result = await readExcelTest(worksheet, searchText);
  const cellValue = worksheet.getCell(result.row+change.rowChange, result.col+change.colChange);
  cellValue.value = replaceValue;
  await workbook.xlsx.writeFile(filePath);
}

async function readExcelTest(worksheet, searchText) {
  let result = {
    row: -1,
    col: -1,
  };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        result.row = rowNumber;
        result.col = colNumber;
      }
    });
  });
  return result;
}


test('upload-download-excel-validations', async ({page})=>{
  const searchText = 'Mango';
  const updateValue = '350'
  await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html')
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator("#downloadButton").click()
  ]);
  const filePath = '/Users/yakshit/Downloads/download.xlsx';
  await download.saveAs(filePath);
  writeExcelTest(searchText,updateValue,{rowChange:0,colChange:2},"/Users/yakshit/Downloads/download.xlsx");
  await page.locator("#fileinput").click();
  await page.locator("#fileinput").setInputFiles("/Users/yakshit/Downloads/download.xlsx");
  const textlocator = page.getByText(searchText);
  const desiredRow = await page.getByRole('row').filter({has :textlocator });
  await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
})