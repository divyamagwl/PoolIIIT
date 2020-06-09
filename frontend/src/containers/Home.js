import React from 'react';
import { connect } from 'react-redux';
import {Row,Col,Button} from 'antd';
import {  withRouter } from 'react-router-dom';


import  pic from '../pic1.jpg';
import  pic2 from '../pic2.jpg';
import  pic3 from '../pic3.jpg';

import {LoginOutlined,QuestionCircleFilled,CheckCircleFilled,CarOutlined,UserAddOutlined,ScheduleOutlined} from '@ant-design/icons';
import  ScrollToTopBtn from './ScrollToTop';

const Home = withRouter((props) => {
  const { isAuthenticated} = props;
    return (
      <div> 
      <Row >
          <Col span={12} >
            <div style={{paddingLeft:"50%" ,paddingTop:'10%',paddingBottom:'10%',paddingRight:'10%',textAlign:"left",width:'90%',height:'auto'}}>
              <h1 style={{fontSize:"40px"}}>Pool With Us!</h1>
              <p style={{fontSize:"25px"}}>Now you can save <br/>your 
                Money and Time!
              </p>
              <br/>
              {isAuthenticated
              ?[
                <Button type="primary" href="./booking" size="large"><ScheduleOutlined />Bookings</Button>
              ]
              :[
                <div style={{display:'flex'}}>
                  <Button type="primary" href="./login" size="large"><LoginOutlined />Login </Button>
                  &nbsp;&nbsp;
                  <Button type="primary" href="./register" size="large"><UserAddOutlined />Register</Button>
                </div>
              ]}
        
           </div>
          </Col>

          <Col span={8}>
             <img alt='Pooling-image' style={{paddingBottom:'10%',paddingLeft:"10%",paddingRight:'10%' ,paddingTop:'10%',width:'100%',height:'auto',textAlign:"left"}} src={pic}/>
          </Col>
        
      </Row>
      <Row style={{paddingBottom:'1%',paddingLeft:"20%" ,paddingTop:'1%'}}>
        <Col span={4}>
        <img alt='Pooling-image' style={{paddingBottom:'10%',paddingLeft:"5%",paddingRight:'5%' ,paddingTop:'10%',width:'100%',height:'auto',textAlign:"center"}} src={pic3}/>

        </Col>
        <Col span={15} style={{borderRadius:"25px",backgroundColor:" #22247A",width:"100%",height:"160px"}}>
          
          <h1 style={{textAlign:'left',color:'white',paddingLeft:'1%',paddingTop:'1%'}}><CarOutlined/>  Why Pool?</h1>
          <p style={{textAlign:'left',color:'white',paddingLeft:'1%',paddingTop:'0.2%',paddingRight:'1%',paddingBottom:'1%',fontSize:'18px'}}>
            Car pooling allows you to share the cost of gas and parking,cutting your cost expenses by nearly 50%.
            Carpooling is also better for the environment.Having fewer cars on road 
            means reduced Greenhouse gases emission.Most importantly ,you make new friends.So let's pool! 
          </p>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
        </Col>
        <br></br>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }} style={{paddingTop:"5%"}}>
          <QuestionCircleFilled style={{color:'#220c63',fontSize:'20px'}}/>
           <h1>Who Are We?</h1>
           <p style={{paddingTop:'0.2%',fontSize:'20px',color:'black'}}>
             We are a group of young enthusiasts who are part of the coding club of 
             International Institute of Information Technology Bangalore,named Zense.
             We have made multiple successfull projects and continue to grow.
           </p>
        </Col>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }} style={{paddingTop:"5%"}}>
          <CheckCircleFilled style={{color:'#220c63',fontSize:'20px'}}/>
          <h1>What do we do?</h1>
          <p style={{paddingTop:'0.2%',fontSize:'20px',color:'black'}}>
              At Zense we have created multiple successful projects which address the
              real world problems.To know more about our projects please visit
              "https://github.com/zense".Feel free to contribute to any of our projects.
           </p>
        </Col>
     </Row>
      <Row>
        <Col span={5}>

        </Col>
        <Col span={15}>
        <img alt='Pooling-image' style={{paddingBottom:'10%',paddingLeft:"10%",paddingRight:'10%' ,paddingTop:'10%',width:'100%',height:'auto',textAlign:"center"}} src={pic2}/>
        </Col>
        
      </Row>
      <ScrollToTopBtn />
      </div>

    );
  });



const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
    username: state.username,
  };
};


export default connect(mapStateToProps, null)(Home);
