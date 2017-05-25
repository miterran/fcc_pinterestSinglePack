import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';
import { Row, Col, Thumbnail, Image, Button } from 'react-bootstrap';
import { updatePictureState } from '../actions/picAction'

class AllPicsPage extends React.Component{
	constructor(){
		super();
		this.state = {
			isLoading: false
		}
	}
	updateLikeStatus(pic, like){
		this.setState({...this.state, isLoading: true})
		axios.post('/update-like-status', {pic: pic, like: like}).then(function(response){
			if(response.status === 200){
				this.props.updatePictureState();
				this.setState({...this.state, isLoading: false})
			}
		}.bind(this))
	}
	render(){
		const pic = this.props.pics.map(function(pic, idx){
			let like = pic.likes.includes(this.props.user.googleId)
			return (
				<Col className='item' key={pic._id} md={3} style={{padding: 8, marginTop: -20}}>
					<Thumbnail className='picBox' src={pic.url} alt='pic'>
					<div className='container' style={{marginTop: -10}}>
						<Row>
							<h5>{pic.title}</h5>
						</Row>
						<Row>
							<Image src={pic.owner.imageUrl} style={{height: 40}} rounded />
							<Button style={{marginTop: 3}} className='pull-right' disabled={this.state.isLoading} onClick={() => this.updateLikeStatus(pic, like)}>
								<span className={like ? 'fa fa-heart' : ' fa fa-heart-o '} aria-hidden="true"></span><span>&nbsp;&nbsp;{pic.likes.length}</span>
							</Button>
						</Row>
					</div>
					</Thumbnail>
				</Col>
			)
		}.bind(this))


		return(
			<div>
				<Masonry
					options={{itemSelector: '.item'}}
					style={{marginTop: 20}}>
					<Row>
						{pic}
					</Row>
				</Masonry>
			</div>
		)
	}
}

function mapStateToProps(state){
  return {
    user: state.authReducer.user,
    pics: state.picReducer
  }
}

export default connect(mapStateToProps, { updatePictureState } )(AllPicsPage);