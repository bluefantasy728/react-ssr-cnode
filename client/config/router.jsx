import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import TopicList from '../views/topic_list/index'
import TopicDetail from '../views/topic_detail/index'

export default () => [
	<Route path="/" render={() => <Redirect to="/list" />} exact />,
	<Route path="/list" component={TopicList} />,
	<Route path="/detail" component={TopicDetail} />,
]

