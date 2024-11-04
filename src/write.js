import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from "axios";


export default class Write extends Component {
  state = {
    isModifyMode : true,
    title:'',
    content:'',
  }
  write = (e)=>{
    e.preventDefault();
    Axios.post('http://localhost:8000/insert',{
      title : this.state.title,
      content : this.state.content
    })
    .then((res) => {
      console.log(res);
      
    })
    .catch( (err)=> {
    // 에러 핸들링
      console.log(err);
    });
  }
  update = (e)=>{
    e.preventDefault();
    Axios.post('http://localhost:8000/update',{
      title : this.state.title,
      content : this.state.content,
      id : this.props.boardId,  //수정할 글 번호
    })
    .then((res) => {
      console.log(res);
      this.setState({
        title : '',
        contetn : ''
      })
      this.props.handleCancel();

    })
    .catch( (err)=> {
    // 에러 핸들링
      console.log(err);
    });
  }
  detail = ()=>{
    //글 번호에 맞는 데이터 조회, 글 결과를 title과 content 에 반영, 수정모드 true
  }
  //this.props.isModifyMode의 값이 변동 사항이 생기면 detail 함수 실행, componentDidUpdate 함수로
  handleChange = (e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
    console.log(this.state);
  }
  render() {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" name="title" placeholder="제목을 입력하세요" onChange={this.handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" name="content" rows={3} onChange={this.handleChange} />
        </Form.Group>
        <div className="d-flex gap-1">
          <Button variant="primary" type='submit' onClick={this.state.isModifyMode ? this.update : this.write }>{this.state.isModifyMode ? '수정완료' : '입력완료' }</Button>
          <Button variant="secondary" type='reset'>취소하기</Button>
        </div>
      </Form>
    )
  }
}
