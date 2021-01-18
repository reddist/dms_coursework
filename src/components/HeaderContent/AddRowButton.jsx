import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentTableData,
  selectIsLoadingActionButtons
} from "../../store/selectors";
import { PlusOutlined } from "@ant-design/icons";
import {Button, Form, Input, InputNumber, Popover, Select, DatePicker} from "antd";
import { useAction } from "../helpers/function/useAction";
import { ADD_A_ROW } from "../../store/actions";
const { Option } = Select;

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 20,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 20,
  },
};

const AddRowPopover = ({ closeForm }) => {
  const [form] = Form.useForm();
  const table_columns = useSelector(selectCurrentTableData)["columns"] || [];
  const table_keys = useSelector(selectCurrentTableData)["key"] || [];
  const submitNewRow = useAction(ADD_A_ROW);
  return (
    <Form
      {...layout}
      form={form}
      size="default"
      onFinish={(values) => {
        closeForm();
        table_columns.forEach((column) => {
          if (column["type"] === "date") {
            values[column["dataIndex"]] = values[column["dataIndex"]].format("YYYY-MM-DD");
          }
        });
        submitNewRow(values);
      }}
    >
      {table_columns.map((column_desc) => {
        let InputNode;
        switch(column_desc["type"]){
          case "date":
            InputNode = (
              <DatePicker />
            );
            break;
          case "integer":
            InputNode = (<InputNumber min={1} />);
            break;
          case "string":
            InputNode = (<Input />);
            break;
          case "array":
            let array_fields = [];
            for (let i = 0; i < column_desc["array_length"]; i++) {
              array_fields.push(`arf${i}`);
            }
            InputNode = (
              <Input.Group compact>
                {array_fields.map((field) =>
                  <Form.Item
                    name={[column_desc["dataIndex"], field]}
                  >
                    <InputNumber min={1} />
                  </Form.Item>
                )}
              </Input.Group>
            );
            break;
          case "enum":
            InputNode = (
              <Select placeholder="Please select status">
                {column_desc["available_values"].map((value) =>
                  <Option value={value}>{value}</Option>
                )}
              </Select>
            );
            break;
          default: break;
        }
        return (
          <Form.Item
            name={column_desc["dataIndex"]}
            label={column_desc["title"]}
            rules={[
              {
                required: !table_keys.includes(column_desc["dataIndex"]),
              },
            ]}
          >
            {InputNode}
          </Form.Item>
        );
      })}
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button type="link" htmlType="button" onClick={closeForm}>
          Close
        </Button>
      </Form.Item>
    </Form>
  );
};

const AddRowButton = () => {
  const table_loading = useSelector(selectIsLoadingActionButtons);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const handleVisibleChange = (visible) => setIsPopoverVisible(visible);
  return (
    <Popover
      placement="bottomLeft"
      title={null}
      content={
        <AddRowPopover
          closeForm={() => setIsPopoverVisible(false)}
        />
      }
      trigger="click"
      visible={isPopoverVisible}
      onVisibleChange={handleVisibleChange}
      overlayStyle={{minWidth: 350}}
    >
      <Button
        loading={table_loading}
      >
        <PlusOutlined />
        Добавить
      </Button>
    </Popover>
  );
};

export default AddRowButton;