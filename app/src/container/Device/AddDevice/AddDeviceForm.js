/**
 * Created by YikaJ on 16/5/7.
 */

import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import autobind from 'myUtil/autobind'
import {connect} from 'react-redux'

import {registerDevice} from 'action/device'
import selector from 'selector/addDevice'

import { Form, Input, Select, Button, InputNumber, Row, Col } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const InputGroup = Input.Group;

const labelCol = {span: 6}
const wrapperCol = {span: 14, offset: 1}

class AddDeviceForm extends Component {

  constructor(props){
  	super(props)

    this.state = {
      dataItemList: [{}]
    }
  }

  @autobind
  handlerSubmit(e) {
    const {dispatch, form} = this.props
    e.preventDefault();

    form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      dispatch(registerDevice({
        ...values,
        chartOption: {
          dataItemList: this.state.dataItemList,
          yAxisName: values.yAxisName,
          unit: values.unit,
          interval: values.interval
        }
      }))
    });
  }

  @autobind
  handleDataItemChange(value, i) {
    const {dataItemList} = this.state
    const newDataItemList = [...dataItemList]

    newDataItemList[i] = {...dataItemList[i], ...value}

    this.setState({dataItemList: newDataItemList})
  }

  @autobind
  addDataItem() {
    this.setState({dataItemList: this.state.dataItemList.concat({})})
  }

  @autobind
  removeDataItem(i) {
    const {dataItemList} = this.state

    if(dataItemList.length <= 1) return false

    const newDataItemList = [
      ...dataItemList.slice(0, i),
      ...dataItemList.slice(i + 1)
    ]
    this.setState({dataItemList: newDataItemList})
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, message: '设备名不得为空' },
        { max: 10, message: '设备名不大于10个字符' }
      ]
    })

    const descProps = getFieldProps('desc')

    return (
      <Form horizontal form={this.props.form}>
        <FormItem
          id="control-input" label="设备名：" hasFeedback
          labelCol={labelCol} wrapperCol={wrapperCol}
          help={(getFieldError('name') || []).join(', ')}
        >
          <Input {...nameProps} id="name" placeholder="设备名不大于10个字" />
        </FormItem>

        <FormItem
          id="control-textarea" label="设备描述："
          labelCol={labelCol} wrapperCol={wrapperCol}
        >
          <Input {...descProps} type="textarea" id="desc" rows="3" placeholder="对设备的描述"/>
        </FormItem>

        {this.renderChartOption()}

        <FormItem wrapperCol={{...wrapperCol, offset: 7}}>
          <Button size="large" type="primary" onClick={this.handlerSubmit}>完成创建</Button>
        </FormItem>

      </Form>
    )
  }

  renderDataItem() {
    const {dataItemList} = this.state

    const delClassName = classnames({
      'pull-left': true,
      'data-item-del': true,
      'disabled': dataItemList.length <= 1
    })

    return (
      <ul>
        {dataItemList.map((dataItem, i) => (
          <li className="data-item clearfix" key={i}>
            <div className="pull-left data-item-name">
              <Input placeholder="数据项名称" value={dataItem.name} onChange={(e)=>this.handleDataItemChange({name: e.target.value}, i)}/>
              <Input type="number" className="data-item-limit" value={dataItem.min} placeholder="异常最小值" onChange={(e)=>this.handleDataItemChange({min: e.target.value}, i)}/>&emsp;
              <Input type="number" className="data-item-limit" value={dataItem.max} placeholder="异常最大值" onChange={(e)=>this.handleDataItemChange({max: e.target.value}, i)}/>
            </div>
            <a onClick={this.addDataItem} href="javascript:" className="pull-left data-item-add">增加</a>
            <a onClick={()=>this.removeDataItem(i)} href="javascript:" className={delClassName}>删除</a>
          </li>
        ))}
      </ul>
    )
  }

  renderChartOption() {
    const { getFieldProps, getFieldError } = this.props.form;
    const yNameProps = getFieldProps('yAxisName', {rules: [{required: true, message: '不得为空'}]})
    const unitProps = getFieldProps('unit', {rules: [{required: true, message: '不得为空'}]})

    return (
      <div>
        <h3 className="text-center">图表选项</h3><br/>
        <FormItem
          label="数据描述：" labelCol={labelCol}
          help wrapperCol={wrapperCol}
        >
          <InputGroup>
            <Col span="12">
              <FormItem help={(getFieldError('yAxisName') || []).join(', ')}>
                <Input {...yNameProps} id="yAxisName" placeholder="描述"/>
              </FormItem>
            </Col>
            <Col span="2">
              <p className="ant-form-split"> / </p>
            </Col>
            <Col span="6">
              <FormItem help={(getFieldError('unit') || []).join(', ')}>
                <Input {...unitProps} id="unit" placeholder="单位"/>
              </FormItem>
            </Col>
          </InputGroup>
        </FormItem>

        <FormItem
          label="数据项：" labelCol={labelCol}
          wrapperCol={wrapperCol}
          help={(getFieldError('dataItemList') || []).join(', ')}
        >
          {this.renderDataItem()}
        </FormItem>
      </div>
    )
  }
}

AddDeviceForm = createForm()(AddDeviceForm)

export default AddDeviceForm
