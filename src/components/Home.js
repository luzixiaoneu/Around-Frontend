import React from 'react';
import SearchBar from "./SearchBar";
import { Tabs, message, Row, Col } from 'antd';

import {SEARCH_KEY, BASE_URL, TOKEN_KEY} from "../constants";
import axios from "axios";
import PhotoGallery from "./PhotoGallery";
import CreatePostButton from "./CreatePostButton";


const { TabPane } = Tabs;

function Home(props) {

	const [activeTab, setActiveTab] = React.useState("image");

	const [searchOption, setSearchOption] = React.useState({
		type: SEARCH_KEY.all,
		keyword: ""
	})

	const [posts, setPost] = React.useState([]);

	React.useEffect(()=> {

		fetchPost(searchOption);
		//do search the first time => didMount -> search: {type: all, keyword : null}

		//after first time => didUpdate -> search: { tupe: keyword/user, keyword: keyword}

		//how to get the posts from server
		// didmount + didupdate
	}, [searchOption]);


	const fetchPost = option => {
		// get search option
		// make request to server to fetch posts.
		const {type, keyword} = searchOption;
		let url = "";
		//all
		//keyword
		//user
		if (type === SEARCH_KEY.all) {
			url = `${BASE_URL}/search`;

		}
		else if (type === SEARCH_KEY.user){
			url = `${BASE_URL}/search?user=${keyword}`;
			console.log("search user", keyword)
		}
		else {
			url = `${BASE_URL}/search?keywords=${keyword}`;
			console.log("serch keyword", keyword)
		}

		//config opt for axios

		const opt = {
			method: "GET",
			url: url,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
			}
		}

		axios(opt).then((res => {
			if (res.status === 200) {
				console.log("success", res)
				//res -> posts
				const {data} = res;
				setPost(data);
			}
		})).catch(err => {
			message.error("Fetch posts failed!");
			console.log(err.message);
		})

	}

	const renderPost = type => {
		//case1: type === image
		//case2: type === video
		if (!posts || posts.length === 0) {
			return <div> No Data!</div>
		}
		if (type === "image") {

			const imageArray = posts.filter(item => item.type === "image").map(image => {
				return {
					postId: image.id,
					src: image.url,
					thumbnail: image.url,
					thumbnailWidth: 300,
					thumbnailHeight: 200,
					user: image.user,
					caption: image.message

				}
			})

			console.log(imageArray);

			return <PhotoGallery image={imageArray}/>

		} else if (type === "video") {
			return (
				<Row gutter={32}>
					{posts
						.filter((post) => post.type === "video")
						.map((post) => (
							<Col span={8} key={post.url}>
								<video src={post.url} controls={true} className="video-block"/>
								<p>
									{post.user}: {post.message}
								</p>
							</Col>
						))}
				</Row>
			);

		}
	}

	const handleSearch = (option) => {
		setSearchOption(option);
	}


	const showPost = type => {
		//case 1: type == image
		console.log("type -> ", type);
		setActiveTab(type);
		//case 2: type == video
		setTimeout(() => {
			setSearchOption({type: SEARCH_KEY.all, keyword: ""})
		})
	}
	const operations = <CreatePostButton onShowPost={showPost}/>
	return (
		<div className="home">
			<SearchBar handleSearch={handleSearch}/>

			<div className="display">
				<Tabs onChange={(key) => setActiveTab(key)}
				      defaultActiveKey="image"
				      activeKey={activeTab}
				      tabBarExtraContent={operations}>
					<TabPane tab="Images" key="image">
						{renderPost("image")}
					</TabPane>
					<TabPane tab="Videos" key="video">
						{renderPost("video")}
					</TabPane>
				</Tabs>
			</div>
		</div>
	)
};

export default Home;