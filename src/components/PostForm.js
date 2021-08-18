import React from 'react';
import {Form,  Input, Upload} from 'antd'
import  {InboxOutlined} from '@ant-design/icons';
import {forwardRef} from "react";
export const PostForm = forwardRef((props, ref) => {


	const formItemLayout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 14 }
	};

	const normFile = (e) => {
		console.log("Upload event:", e);
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	};


	return (
		<Form name="validate_other" {...formItemLayout} ref={ref}>
			<Form.Item label="Message" name="description" rules={[
				{
					required: true,
					message: "Please Input Your Description!"
				}
			]}>
				<Input />
			</Form.Item>


				<Form.Item
					name="uploadPost"
					valuePropName="fileList"
					getValueFromEvent={normFile}
					noStyle
					rules={[
						{
							required: true,
							message: "Please select an image/video!"
						}
					]}
				>
					<Upload.Dragger name="files" beforeUpload={() => false}>
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">
							Click or drag file to this area to upload
						</p>
					</Upload.Dragger>
				</Form.Item>



		</Form>
	);
})

