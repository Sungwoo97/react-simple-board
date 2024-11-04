import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from "axios";

/*
const submitTest = ()=>{
  // react -> 서버 요청을 보내고, 그 결과를 출력
  Axios.get('http://localhost:8000/')
  .then(function (response) {
    alert('등록 완료');
    // 성공 핸들링
    console.log(response);
  })
  .catch(function (error) {
    // 에러 핸들링
    console.log(error);
  })
}*/
class Board extends Component {
  render() {
    return (
      <tr>
        <td>
          <Form.Check // prettier-ignore
            type="checkbox"
            id={`default-checkbox`}
            value={this.props.id}
            onChange={(e)=>{
              this.props.onCheckboxChange(e.target.checked, e.target.value)
            }}
          />
        </td>
        <td>{this.props.id}</td>
        <td>{this.props.title}</td>
        <td>{this.props.registerId}</td>
        <td>{this.props.date}</td>
      </tr>
    )
  }
}


export default class BoardList extends Component {
  state = {
    BoardList:[],
    checkList:[]
  }
  onCheckboxChange = (checked, id)=>{
    const list = [...this.state.checkList];
    if(checked){
      if(!list.includes(id)){
        list.push(id);
      }
    } else{
      let idx = list.indexOf(id);
      list.splice(idx , 1);
    }

    this.setState({
      checkList:list
    })
    console.log(this.state.checkList);
  }
  getList = ()=>{
    Axios.get('http://localhost:8000/list')
    .then( (res) => {
      const {data} = res;  //destructuring 비구조할당
      console.log(data);
      this.setState({
        BoardList:data
      })
      this.props.renderComplete(); //App.js에 목록 출력이 완료되었다고 전달
    })
    .catch( (err)=> {
    // 에러 핸들링
      console.log(err);
    });
  }
  componentDidMount(){
    this.getList();
  }
  render() {

    return (
      <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>선택</th>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.BoardList.map(
              item=> <Board 
              key={item.BOARD_ID} 
              title={item.BOARD_TITLE} 
              id={item.BOARD_ID} 
              registerId={item.REGISTER_ID} 
              date={item.REGISTER_DATE} 
              onCheckboxChange={this.onCheckboxChange}
              />
            )
          }
          
        </tbody>
      </Table>
      <div className="d-flex gap-1">
        <Button variant="primary" >글쓰기</Button>
        <Button variant="secondary" onClick={()=>{
          this.props.handelModify(this.state.checkList);
        }}>수정하기</Button>
        <Button variant="danger">삭제하기</Button>
      </div>
      </>
    )
  }
}
