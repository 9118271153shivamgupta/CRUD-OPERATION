import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Formtable from "./components/Formtable";

axios.defaults.baseURL = "http://localhost:8080/"

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] =useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: ""
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id :""
  });

  const [dataList, setDataList] =useState([])

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    const data = await axios.post("/create", formData)
    console.log(data);
    if (data.data.success) {
      setAddSection(false)
      alert(data.data.massage)
      getFetchData()
    }
  };
  const getFetchData = async()=>{
    const data = await axios.get("/")
    console.log(data)
    if (data.data.success) { 
      // alert(data.data.massage)
      setDataList(data.data.data)
    }
  }
  useEffect(()=>{
    getFetchData()
  },[])

 const handleDelete =async(id) => {
  const data = await axios.delete("/delete/"+id)
  // console.log(data)
  if (data.data.success) {
    getFetchData()
    alert(data.data.massage)
    
  }
  
 }
 const handleUpdate =async(e)=>{
  e.preventDefault()
  const data = await axios.put("/update/", formDataEdit)
  // console.log(data)
  if (data.data.success) {
    getFetchData()
    alert(data.data.massage)
    setEditSection(false)
    
  }
  
 }
 const handlEditOnChange =async(e)=>{
  const { value, name } = e.target;
  setFormDataEdit((prev) => {
    return {
      ...prev,
      [name]: value
    };
  });
 }
 const handleEdit =(el)=>{
  setFormDataEdit(el)
  setEditSection(true)
 }
  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>Add</button>
        {
          addSection && (
            <Formtable
            handleSubmit={handleSubmit}
             handleOnChange={handleOnChange}
             handleclose = {()=>setAddSection(false)} 
             rest={formData}
             />
          )
        }
        {editSection &&(
          <Formtable
            handleSubmit={handleUpdate}
             handleOnChange={handlEditOnChange}
             handleclose = {()=>setEditSection(false)} 
             rest={formDataEdit}
             />
        )
        
        }


        <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>
                
              </th>
            </tr>
          </thead>
          <tbody>
            {dataList[0] ? (
              dataList.map((el)=>{
                console.log(el)
                return (
                <tr>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.mobile}</td>
                  <td>
                  <button className="btn btn-edit"onClick={()=>handleEdit(el)} > Edit </button>
                  <button className="btn btn-delete" onClick={()=>handleDelete(el._id)}>Delete</button>
                  </td>
                </tr>
                )
            }))
            : (
              <p>Nodata</p>
            )
            }
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
}

export default App;
