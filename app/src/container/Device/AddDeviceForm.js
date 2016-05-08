/**
 * Created by YikaJ on 16/5/7.
 */

import React, {Component, PropTypes} from 'react'
import { Form, Input, Select, Button, InputNumber } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

const labelCol = {span: 6}
const wrapperCol = {span: 14, offset: 1}

class AddDeviceForm extends Component {

  getValidateStatus(field) {
    const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;

    if (isFieldValidating(field)) {
      return 'validating';
    } else if (!!getFieldError(field)) {
      return 'error';
    } else if (getFieldValue(field)) {
      return 'success';
    }
  }


    render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, message: '设备名不得为空' },
        { max: 10, message: '设备名不大于10个字符' }
      ]
    })

    return (
      <Form horizontal form={this.props.form}>
        <FormItem
          id="control-input" label="设备名：" hasFeedback
          labelCol={labelCol} wrapperCol={wrapperCol}
          help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
        >
          <Input {...nameProps} id="name" placeholder="设备名不大于10个字" />
        </FormItem>

        <FormItem
          id="control-textarea"
          label="设备描述："
          labelCol={labelCol}
          wrapperCol={wrapperCol}>
          <Input type="textarea" id="desc" rows="3" placeholder="对设备的描述"/>
        </FormItem>

        <FormItem
          id="select"
          label="图表类型："
          labelCol={labelCol}
          wrapperCol={wrapperCol}>
          <Select id="select" size="large" defaultValue="line" style={{ width: 200 }}>
            <Option value="line">折线图</Option>
            <Option value="bar">柱状图</Option>
          </Select>
        </FormItem>

        <FormItem
          label="数据项：" labelCol={labelCol}
          wrapperCol={wrapperCol}
          help={(getFieldError('dataItemList') || []).join(', ')}
        >
          {this.renderDataItem()}
        </FormItem>

        <FormItem
          label="时间间隔："
          labelCol={labelCol}
          wrapperCol={wrapperCol} >
          <InputNumber min={0} max={120}  defaultValue={0}/>分钟
        </FormItem>

        <FormItem wrapperCol={{...wrapperCol, offset: 7}}>
          <Button size="large" type="primary">完成创建</Button>
        </FormItem>

      </Form>
    )
  }

  renderDataItem() {
    return (
      <ul>
        <li className="data-item clearfix">
          <Input placeholder="数据项名称" className="pull-left data-item-name"/>
          <a href="javascript:" className="pull-left data-item-add">增加</a>
          <a href="javascript:" className="pull-left data-item-del">删除</a>
        </li>
      </ul>
    )
  }
}

AddDeviceForm = createForm()(AddDeviceForm)

export default AddDeviceForm
