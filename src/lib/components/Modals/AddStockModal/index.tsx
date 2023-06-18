import { Button, Col, DatePicker, Divider, Form, Input, Modal, Radio, Row, Typography } from 'antd';
import React from 'react';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const AddStockModal = ({ handleClose, open }: any) => {
	const [form] = Form.useForm();

	return (
		<>
			<Modal centered open={open} onOk={handleClose} onCancel={handleClose} width={700}>
				<Typography style={{ fontWeight: '600', fontSize: '20px' }}>Add Stock</Typography>
				<Divider />

				<Form
					form={form}
					// initialValues={{ layout: formLayout }}
					// onValuesChange={onFormLayoutChange}
					// style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
				>
					<Row gutter={[16, 16]}>
						<Col span={12}>
							<Form.Item>
								<Input placeholder="Input placeholder" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item>
								<Input placeholder="Input placeholder" />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={[16, 16]}>
						<Col span={12}>
							<Form.Item>
								<Input placeholder="Input placeholder" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item>
								<Input placeholder="Input placeholder" />
							</Form.Item>
						</Col>
					</Row>
					<Form.Item>
						<DatePicker style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item>
						<Input placeholder="Input placeholder" />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default AddStockModal;
