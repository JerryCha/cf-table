import { IRowFormProps, IRowFormRef } from "../../types/row";
import { forwardRef, useImperativeHandle } from "react";
import { Form as AntForm } from "antd";

export const DefaultRowForm = forwardRef<IRowFormRef, IRowFormProps>((props, ref) => {
  const { children, row } = props;

  useImperativeHandle(ref, () => ({
    resetFieldsValue: () => form.resetFields(),
    getFieldsValue: () => form.getFieldsValue(),
    validate: () => form.validateFields(),
  }));

  const [form] = AntForm.useForm();

  return (
    <AntForm initialValues={row} form={form} component={false}>
      {children}
    </AntForm>
  );
});
