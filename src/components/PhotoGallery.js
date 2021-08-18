import React from 'react';
import Gallery from 'react-grid-gallery'
import {Button} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {BASE_URL, TOKEN_KEY} from "../constants";
import axios from "axios";
import PropTypes from "prop-types";

const captionStyle = {
	backgroundColor: "rgba(0, 0, 0, 0.6)",
	maxHeight: "240px",
	overflow: "hidden",
	position: "absolute",
	bottom: "0",
	width: "100%",
	color: "white",
	padding: "2px",
	fontSize: "90%"
};

const wrapperStyle = {
	display: "block",
	minHeight: "1px",
	width: "100%",
	border: "1px solid #ddd",
	overflow: "auto"
};


function PhotoGallery(props) {
	const [images, setImages] = React.useState(props.image);
	const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
	const imageArr = props.image.map((i) => {
		return {
			...i,
			customOverlay: (
				<div style={captionStyle}>
					<div>{`${i.user}:${i.caption}`}</div>
				</div>
			)
		}
	})

	const onCurrentImageChange = (index) => {
		setCurrentImageIndex(index);
	}

	const deleteImage = () => {
		//step1 confirm to delete
		if (window.confirm("Are you sure you want to delete this image?")) {
			//step2: find the currentSelectedImage
			const currentImage = images[currentImageIndex];
			const newImageArray = images.filter((img, index) => index !== currentImageIndex);
			console.log(currentImage);
			//send to backend
			const opt = {
				method: "DELETE",
				url: `${BASE_URL}/post/${currentImage.postId}`,
				headers: {

					Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
				}
			}

			axios(opt).then(res => {
				console.log(res.status)
			}).catch(err => {

			})



		}

	}
	return (
		<div>
			<Gallery images={imageArr}
			         enableImageSelection={false}
			         backdropClosesModal={true}
			         currentImageWillChange={onCurrentImageChange}
			         customControls={[
			         	<Button
				                style={{marginTop: 10, marginLeft:5}}
				                key="deleteImage"
			                    type="primary"
			                    size="small"
				                onClick={deleteImage}
								icon={<DeleteOutlined/>}
			            > Delete</Button>
			         ]}
			         >
			</Gallery>


		</div>
	);
}


// PhotoGallery.propTypes = {
// 	image: PropTypes.arrayOf(
// 		PropTypes.shape({
// 			postID:PropTypes.string.isRequired,
// 			user: PropTypes.string.isRequired,
// 			caption: PropTypes.string.isRequired,
// 			src: PropTypes.string.isRequired,
// 			thumbnail: PropTypes.string.isRequired,
// 			thumbnailWidth: PropTypes.number.isRequired,
// 			thumbnailHeight: PropTypes.number.isRequired
// 		})
// 	).isRequired
// };
export default PhotoGallery;