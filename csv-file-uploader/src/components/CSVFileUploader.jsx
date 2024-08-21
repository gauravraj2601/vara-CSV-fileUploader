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
    console.log(e.target.file)
      Papa.parse(e.target.files[0],{
        header: true,
        skipEmptyLines: true,
        complete: function(result){
          console.log(result)
          let columnArray= [];
          let valuesArray = [];
          result.data.map((el)=>{
            columnArray.push(Object.keys(el));
            valuesArray.push(Object.values(el));
          })
          setColumnKeys(columnArray[0]);
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
  

console.log(data)
  return (
    <div className=' w-[90%] m-auto p-1'>
        <div className=' bg-slate-200 bg-transparent opacity-50 rounded-md  w-[80%] md:w-[50%]  h-[100px] m-auto mt-[20px] mb-3 flex  justify-center items-center' >
            <input  type="file" accept='.csv' onChange={handleFileUpload} />
        </div>
        <TableComponent columnKeys={columnKeys} values={currentValues} />
        <Pagination 
          rowsPerPage={rowsPerPage}
          totalRows={values.length}
          paginate={paginate}
          currentPage={currentPage}
        />
    </div>
  )
}

export default CSVFileUploader