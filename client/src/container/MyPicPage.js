import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import { Row, Form, FormGroup, FormControl, Col, Button, Alert, Thumbnail } from 'react-bootstrap';
import { updatePictureState } from '../actions/picAction'
import Masonry from 'react-masonry-component';

class MyPicture extends React.Component{
	constructor(){
		super();
		this.state = {
			picInfo: {
				imageTitle: '',
				imageUrl: ''
			},
			error: '',
			success: '',
			isLoading: false,
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
	handleInputFocus(){
		this.setState({...this.state, error: '', success: ''})
	}
	handleChange(e){
		this.setState({...this.state, error: '', success: '', picInfo: { ...this.state.picInfo, [e.target.name]: e.target.value} })
	}
	handleSubmit(e){
		e.preventDefault();
		if(this.state.picInfo.imageTitle !== '' && this.state.picInfo.imageUrl !== ''){
			this.setState({...this.state, isLoading: true})

			var axiosIns = axios.create({
				timeout: 1000
			})

			axiosIns.post('/add-a-pic', this.state.picInfo).then(function(response){
				console.log('hi')
				this.props.updatePictureState();
				this.setState({...this.state, success: 'Picture Saved', isLoading: false, picInfo: {imageTitle: '', imageUrl: ''}})
			}.bind(this)).catch(function(err){
				console.log(err)
				this.setState({...this.state, error: 'Image URL Error', isLoading: false})
			}.bind(this))

		}
	}
	removePicture(pic){
		axios.post('/remove-a-pic', {picId: pic._id}).then(function(response){
			if(response.status === 200){
				this.props.updatePictureState();
				this.setState({...this.state, isLoading: false})
			}
		}.bind(this))
	}
	render(){
		const mypic = this.props.pics.map(function(pic, idx){
			if(pic.owner.googleId === this.props.user.googleId){
				let like = pic.likes.includes(this.props.user.googleId)
				return (
					<Col className='item' key={pic._id} md={3} style={{padding: 8, marginTop: -20}}>
						<Thumbnail className='picBox' src={pic.url} alt='pic'>
						<div className='container' style={{marginTop: -10}}>
							<Row>
								<h5>{pic.title}</h5>
							</Row>
							<Row>
								<Button bsStyle="danger" disabled={this.state.isLoading} onClick={() => this.removePicture(pic)}>Delete</Button>
								<Button className='pull-right' disabled={this.state.isLoading} onClick={() => this.updateLikeStatus(pic, like)}>
									<span className={like ? 'fa fa-heart' : ' fa fa-heart-o '} aria-hidden="true"></span><span>&nbsp;&nbsp;{pic.likes.length}</span>
								</Button>
							</Row>
						</div>
						</Thumbnail>
					</Col>
				)
			}
		}.bind(this))


		return(
			<div>
				<Row>
					<h3>Add a picture</h3>
					{this.state.error && <Alert bsStyle="danger">{this.state.error}</Alert>}
					{this.state.success && <Alert bsStyle="success">{this.state.success}</Alert>}
				</Row>
				<br/>
				<Row>
				  <Form horizontal>
				    <FormGroup>
				      <Col componentClass={'h5'} sm={2}>Image Title: </Col>
				      <Col sm={10}>
				      	<FormControl 
					      		type="text" 
					      		placeholder="Image Title" 
					      		name='imageTitle'
					      		maxLength={24}
					      		onFocus={this.handleInputFocus.bind(this)}
					      		value={this.state.picInfo.imageTitle}
					      		onChange={this.handleChange.bind(this)}
					      		/>
				      </Col>
				    </FormGroup>

				    <FormGroup>
				      <Col componentClass={'h5'} sm={2}>Image URL: </Col>
				      <Col sm={10}>
				      	<FormControl 
					      	type="text" 
					      	placeholder="Image URL" 
					      	name='imageUrl'
					      	onFocus={this.handleInputFocus.bind(this)}
					      	value={this.state.picInfo.imageUrl}
					      	onChange={this.handleChange.bind(this)}
					      	/>
				      </Col>
				    </FormGroup>

				    <FormGroup>
				      <Col smOffset={2} sm={10}>
				        <Button bsStyle="primary" type="submit" onClick={this.handleSubmit.bind(this)} disabled={this.state.isLoading}>
				          Submit
				        </Button>
				      </Col>
				    </FormGroup>
				  </Form>
				</Row>
				<hr/>
				<Row>
					<h3>My Pictures</h3>
				</Row>
				<br/>



				<Row>
					<Masonry
						options={{itemSelector: '.item'}}
						style={{marginTop: 20}}>
						<Row>
							{mypic}
						</Row>
					</Masonry>
				</Row>





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

export default connect(mapStateToProps, { updatePictureState })(MyPicture);
