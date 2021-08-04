import React from 'react';
import {Form, Input, Button, message } from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import axios from "axios";
import {BASE_URL} from "../constants";

function Login(props) {

	const {handleLoggedIn} = props;
	const onFinish = (values) => {
			//get userName and Password
			const {username, password} = values;
			//send login request to the server
			const opt = {
				method: "POST",
				url: `${BASE_URL}/signin`,
				data: {
					username: username,
					password: password
				},
				headers: { "Content-Type": "application/json" }
			}

			axios(opt).then(res => {
				if (res.status === 200) {
					const {data} = res;
					handleLoggedIn(data);
					message.success("Welcome");
				}
			}).catch(err => {
				console.log(err);
				message.error("Login failed!");

			});

			//get the login status
			// if success -> inform parent component isLoggedIn
		    //            -> switch to home page
		    // if failed  -> display error




	};

	return (
		<Form
			name="normal_login"
			className="login-form"
			initialValues={{ remember: true }}
			onFinish={onFinish}
		>
			<Form.Item
				name="username"
				rules={[{ required: true, message: 'Please input your Username!' }]}
			>
				<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
			</Form.Item>
			<Form.Item
				name="password"
				rules={[{ required: true, message: 'Please input your Password!' }]}
			>
				<Input
					prefix={<LockOutlined className="site-form-item-icon" />}
					type="password"
					placeholder="Password"
				/>
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" className="login-form-button">
					Log in
				</Button>
				Or <a href="">register now!</a>
			</Form.Item>
		</Form>
	);
}

export default Login;