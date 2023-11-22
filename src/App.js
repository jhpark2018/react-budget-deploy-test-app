//const { Component } = require("react");
import { useState } from "react";
import "./App.css";
import Alert from "./Components/Alert"
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseList from "./Components/ExpenseList";
const App = ()=>{

  const [charge,setCharge]= useState("")
  const [amount, setAmount] = useState(0)
  //Alert을 위한 State 생성
  const [alert,setAlert]=useState({show:false})
  const [id, setId] = useState('')
  const [edit, setEdit] = useState(false)
  

const [expenses, setExpenses] = useState([
  {id:1,charge:"렌트비",amount:1600},
  {id:2,charge:"교통비",amount:400},
  {id:3,charge:"식비",amount:1200}
])

const clearItems = ()=>{
  setExpenses([])
}
const handleCharge = (e)=>{
  console.log(e.target.value)
  setCharge(e.target.value)
}
const handleAmount=(e)=>{
  // console.log(e.target.valueAsNumber)
  // console.log(typeof e.target.valueAsNumber)
  setAmount(e.target.valueAsNumber)
}
const handleAlert=({type,text})=>{
  setAlert({show:true,type,text})
  setTimeout(()=>{
    setAlert({show:false})
  },7000)
}
const handleEdit = id => {
  const expense = expenses.find(item=>item.id===id)
  const { charge, amount } = expense
  setCharge(charge)
  setAmount(amount)
  setEdit(true)
  setId(id)
}
const handleSubmit = (e) => {
  e.preventDefault()
  if(charge!=="" && amount > 0){

    if(edit){
      const newExpenses = expenses.map(item=>{
        return item.id===id ? {...item,charge,amount } : item
      })
      setExpenses(newExpenses)
      setEdit(false)
      handleAlert({type:"success",text:"아이템이 생성되었습니다."})

    }else{
      const newExpense = {id:crypto.randomUUID(),charge,amount}
    // 프로퍼티:스테이트
    //불변성을 지키기 위해서 새로운 expenses를 생성
    const newExpenses =[...expenses,newExpense]
    setExpenses(newExpenses)
    handleAlert({type:"success",text:"아이템이 생성되었습니다."})

    }
    setCharge("")
    setAmount(0)
    
  }else{
    console.log('error')
    handleAlert({
      type:'danger',
      text:'charge는 빈 값일 수 없으며 amount는 0보다 커야 합니다.'})
  }
}


  const handleDelete=(id)=>{
    // console.log(id);
    const newExpenses = expenses.filter(expense=>
      expense.id!==id)
    console.log(newExpenses);
    setExpenses(newExpenses)  //state를 바로 업데이트 할 수 있습니다.
    handleAlert({type:'danger',text:'아이템이 삭제되었습니다.'})
  }
  
    return(
      <main className="main-container">
        {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
        <h1>예산 계산기</h1>
        <div style={{width:'100%',backgroundColor:'white',padding:'1rem'}}>
        {/* Expense Form */}
        <ExpenseForm 
        handleCharge={handleCharge} 
        charge={charge}
        handleAmount={handleAmount}
        amount={amount}
        handleSubmit={handleSubmit}
        edit={edit}
        />
        </div>
        <div style={{width:'100%',backgroundColor:'white',padding:'1rem'}}>
        {/* Expense List */}
        <ExpenseList 
        // initialExpenses={this.initialExpenses}
        // initialExpenses={expenses}
        expenses={expenses}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        clearItems={clearItems}
        />
        </div>
        <div style={{display:'flex',justifyContent:'end',marginTop:'1rem'}}>
          <p style={{fontSize:'2rem'}}>
            총지출 : 
            <span>
              {expenses.reduce((acc,curr)=>{
                return (acc += curr.amount)
              },0)}
              원</span>
          </p>
        </div>
      </main>
    )
}

export default App;