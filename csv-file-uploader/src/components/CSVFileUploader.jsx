import React, { useState } from 'react'

import Papa from "papaparse"
import TableComponent from './Table';
import Pagination from './Pagination';
const CSVFileUploader = () => {
  const [data, setData] = useState([]);
  const [columnKeys, setColumnKeys] = useState([]);
  const [values, setValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [rowsPerPage] = useState(8); 



  const handleFileUpload = (e) =>{
    const file = e.target.files[0];

    // Check if a file was selected
  if (!file) {
    alert("No file selected. Please choose a CSV file.");
    return;
  }
    // Check if the uploaded file is a CSV
    if (file && file.type !== "text/csv") {
      alert("Please upload a valid CSV file.");
      return;
    }
      Papa.parse(e.target.files[0],{
        header: true,
        skipEmptyLines: true,
        complete: function(result){
          console.log(result.data.length > 0? "Con-CSV":"No-CSV")
          let columnArray= [];
          let valuesArray = [];

          result.data.forEach((el, index) => {
            //  unique ID 
            const uniqueId = `${Date.now()}-${index}`;
            // Add the unique ID along with the row data
            valuesArray.push({ id: uniqueId, data: Object.values(el) });
            columnArray = Object.keys(el);
          });
          setColumnKeys(columnArray); 
          setValues(valuesArray);
          setData(result.data);
        }
      })
  }

    // Calculate current rows to display
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentValues = values.slice(indexOfFirstRow, indexOfLastRow);
  
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  

// console.log(data)
  return (
    <div className=' w-[90%] m-auto p-1'>
        <div className=' bg-slate-200 opacity-60 rounded-md  w-[80%] md:w-[50%]  h-[85px] m-auto mt-[15px] mb-3 flex  justify-center items-center' >
            <input  type="file" accept='.csv' onChange={handleFileUpload} />
        </div>
        <TableComponent columnKeys={columnKeys} values={currentValues} />
        {data.length > 0 && (
          <Pagination 
          rowsPerPage={rowsPerPage}
          totalRows={values.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        )}
    </div>
  )
}

export default CSVFileUploader