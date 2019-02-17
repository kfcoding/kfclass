import React, {Component} from 'react';
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import List from "antd/lib/list";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import Progress from "antd/lib/progress";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import ScenarioItem from "./ScenarioItem";
import {inject, observer} from 'mobx-react';
import {Steps} from 'antd';
import Icon from "antd/lib/icon";

const Step = Steps.Step;

class Course extends Component {

  state = {
    title: "",
    author: "",
    description: "",
    scenarios: [],
    course: {}
  }

  componentDidMount() {
    // this.props.store.fetchGit(decodeURIComponent(this.props.match.params.repo)).then(() => {
    //   this.props.store.fetchCourse();
    // }).then()
  }

  goto(scenario) {
    this.props.store.setCurrentScenario(scenario);
    this.props.store.setPage('scenario');
  }

  render() {
    let course = this.props.store.course;
    return (
      <div className="App">
        <div style={{height: 60, background: '#0096d1', flexShrink: 0}}>
          <img src='/logo-min.d61eb61d.png' style={{height: 50, marginTop: 5}}/>
        </div>
        <div className='banner'>
          <h1>{course.title}</h1>
          <h2>作者: {course.author}</h2>
          <h3>{course.description}</h3>
        </div>
        <div style={{padding: '80px'}}>
          <Row gutter={24}>
            <Col span={18}>
              <Steps direction="vertical" current={0} size={"small"}>
                {course.scenarios.map((scenario) => (
                  <Step key={scenario} status={scenario.isVisited() ? 'finish' : 'wait'} title={<a onClick={()=>{this.goto(scenario)}}>{scenario.title}</a>}
                        description={scenario.description}>
                  </Step>
                ))}
              </Steps>
            </Col>
            <Col span={6}>
              <Card
                title="课程信息"
              >
                <div>实训数量：{course.scenarios.length}</div>
                完成情况：
                <Progress type="circle" percent={course.getProgress()}/>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default inject('store')(observer(Course));
