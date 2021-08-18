import React, { useState } from "react";
import { Input, Radio } from "antd";

import { SEARCH_KEY } from "../constants";

const { Search } = Input;

function SearchBar(props) {

	const [searchType, setSearchType] = useState(SEARCH_KEY.all);
	const [error, setError] = useState("");


	const handleSearch = (value) => {
		if (value === "" && value !== SEARCH_KEY.all){
			setError("Please enter your search keyword");
			return;
		}
		setError("");
		props.handleSearch({type: searchType, keyword: value})
	};

	const changeSearchTpye = (e) => {
		setSearchType(e.target.value);
		setError("");
	};

	return (
		<div className="search-bar">
			<Search
				placeholder="input search text"
				allowClear
				enterButton="Search"
				size="large"
				onSearch={handleSearch}
				disabled={searchType === 0 ? true : false}
			/>
			<p className="error-msg">{error}</p>
			<Radio.Group value={searchType} onChange={changeSearchTpye}>
				<Radio value={SEARCH_KEY.all}>All</Radio>
				<Radio value={SEARCH_KEY.keyword}>Keyword</Radio>
				<Radio value={SEARCH_KEY.user}>User</Radio>
			</Radio.Group>
		</div>
	)
};

export default SearchBar;