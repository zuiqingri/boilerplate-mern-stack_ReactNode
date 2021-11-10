import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
 import SideVideo from './Sections/SideVideo';
 import Subscribe from './Sections/Subscribe';

// import Comments from './Sections/Comments'
// import LikeDislikes from './Sections/LikeDislikes';

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId
    const [VideoDetail, setVideoDetail] = useState([])
    // const [CommentLists, setCommentLists] = useState([])

    const videoVariable = {
        videoId: videoId
    }
    useEffect(() => {
        axios.post('/api/video/getVideoDetail', videoVariable)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data.video)
                    setVideoDetail(response.data.videoDetail)
                } else {
                    alert('Failed to get video Info')
                }
            })
        },[])
       
    // useEffect(() => {
    //     axios.post('/api/video/getVideo', videoVariable)
    //         .then(response => {
    //             if (response.data.success) {
    //                 console.log(response.data.video)
    //                 setVideo(response.data.video)
    //             } else {
    //                 alert('Failed to get video Info')
    //             }
    //         })

    //     axios.post('/api/comment/getComments', videoVariable)
    //         .then(response => {
    //             if (response.data.success) {
    //                 console.log('response.data.comments',response.data.comments)
    //                 setCommentLists(response.data.comments)
    //             } else {
    //                 alert('Failed to get video Info')
    //             }
    //         })


    // }, [])

    // const updateComment = (newComment) => {
    //     setCommentLists(CommentLists.concat(newComment))
    // }


     if (VideoDetail.writer) {
         const subscribeButton=VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls></video>

                        <List.Item
                            actions={[subscribeButton]}
                            // actions={[<LikeDislikes video videoId={videoId} userId={localStorage.getItem('userId')}  />, <Subscriber userTo={Video.writer._id} userFrom={localStorage.getItem('userId')} />]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer && VideoDetail.writer.image} />}
                                title={<a href="https://ant.design">{VideoDetail.title}</a>}
                                description={VideoDetail.description}
                            />
                            <div></div>
                        </List.Item>

                        {/* <Comments CommentLists={CommentLists} postId={Video._id} refreshFunction={updateComment} /> */}

                    </div>
                </Col>
                <Col lg={6} xs={24}>

                    <SideVideo />

                </Col>
            </Row>
        )
   }else {
        return (
            <div>Loading...</div>
        )
    }


}

export default VideoDetailPage