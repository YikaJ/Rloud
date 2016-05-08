/**
 * Created by YikaJ on 16/5/7.
 */

import React, {Component, PropTypes} from 'react'
import { Form, Input, Select, Checkbox, Radio, Button, Row } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const labelCol = {span: 6}
const wrapperCol = {span: 14, offset: 1}

class AddDeviceForm extends Component {
  render() {
    return (
      <Form horizontal>
        <FormItem
          id="control-input"
          label="设备名："
          labelCol={labelCol}
          wrapperCol={wrapperCol}>
          <Input id="control-input" placeholder="设备名不大于10个字" />
        </FormItem>

        <FormItem
          id="control-textarea"
          label="设备描述："
          labelCol={labelCol}
          wrapperCol={wrapperCol}>
          <Input type="textarea" id="control-textarea" rows="3" placeholder="对设备的描述"/>
        </FormItem>

        <FormItem
          id="select"
          label="Select 选择器："
          labelCol={labelCol}
          wrapperCol={wrapperCol}>
          <Select id="select" size="large" defaultValue="lucy" style={{ width: 200 }}>
            <Option value="jack">jack</Option>
            <Option value="lucy">lucy</Option>
            <Option value="disabled" disabled>disabled</Option>
            < Option value="yiminghe">yiminghe</Option>
          </Select>
        </FormItem>

        <FormItem
          label="Checkbox 多选框："
          labelCol={labelCol}
          wrapperCol={wrapperCol} >
          <label className="ant-checkbox-vertical">
            <Checkbox />选项一
          </label>
          <label className="ant-checkbox-vertical">
            <Checkbox />选项二
          </label>
          <label className="ant-checkbox-vertical">
            <Checkbox disabled />选项三（不可选）
          </label>
        </FormItem>

        <FormItem
          label="Checkbox 多选框："
          labelCol={labelCol}
          wrapperCol={wrapperCol} >
          <label className="ant-checkbox-inline">
            <Checkbox />选项一
          </label>
          <label className="ant-checkbox-inline">
            <Checkbox />选项二
          </label>
          <label className="ant-checkbox-inline">
            <Checkbox />选项三
          </label>
        </FormItem>

        <FormItem
          label="Radio 单选框："
          labelCol={labelCol}
          wrapperCol={wrapperCol} >
          <RadioGroup>
            <Radio value="a">A</Radio>
            <Radio value="b">B</Radio>
            <Radio value="c">C</Radio>
            <Radio value="d">D</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem wrapperCol={{...wrapperCol, offset: 7}}>
          <Button size="large" type="primary">完成创建</Button>
        </FormItem>

      </Form>
    )
  }
}

export default AddDeviceForm
