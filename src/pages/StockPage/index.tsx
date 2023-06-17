import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Divider, Row, Col, Space, Card, Typography, Button } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';

const StockPage = () => {

    const cardData = [
        { title: 'My First Stock', price: 50, positiveChange: false },
        { title: 'My First Stock', price: 50, positiveChange: false },
        { title: 'My First Stock', price: 50, positiveChange: false },
        { title: 'My First Stock', price: 50, positiveChange: false },
    ];
    return (
        <div >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between" align="top">
                <Col className="gutter-row" span={5}>
                    <div style={{ height: 500, width: '100%', overflow: 'hidden' }}>
                        {cardData.map((data, index) => (
                            <Card bordered={false}
                                style={{
                                    width: '100%',
                                    marginBottom: '10px',
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                                }}>

                                    <Typography style={{ fontWeight: 500 }}>AAAL</Typography>
                                    <Typography style={{ fontWeight: 400 }}>$50</Typography>
                                    {
                                        false ? (
                                            <CaretUpOutlined style={{ color: 'greenyellow' }} />
                                        ) :
                                            (
                                                <CaretDownOutlined style={{ color: 'red' }} />
                                            )
                                    }
                                </div>
                            </Card>
                        ))}
                    </div>
                </Col>
                <Col className="gutter-row" id="middle" span={12} >

                    <div style={{
                        width: '100%',
                        height: '100vh',
                    }}>
                        {cardData.map((data, index) => (
                            <Card
                                key={index}
                                bordered={false}
                                style={{
                                    width: '100%',
                                    marginBottom: '10px',
                                }}
                            >
                                <Typography style={{ fontWeight: 700 }}>{data.title}</Typography>
                                <Divider />
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography style={{ fontWeight: 500 }}>AAAL</Typography>
                                    <Typography style={{ fontWeight: 400 }}>${data.price}</Typography>
                                    {data.positiveChange ? (
                                        <CaretUpOutlined style={{ color: 'greenyellow' }} />
                                    ) : (
                                        <CaretDownOutlined style={{ color: 'red' }} />
                                    )}
                                </div>
                            </Card>
                        ))}

                        {
                            false ?? (
                                <Space wrap>
                                    <Button type="primary">Prev</Button>
                                    <Button>Next</Button>
                                </Space>
                            )
                        }
                    </div>
                </Col>
                <Col className="gutter-row" span={5}>
                    {/* <Card
                        style={{
                            width: '100%',
                            height: 500,
                            boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px',
                        }}
                    ></Card> */}
                </Col>
            </Row>
        </div>
    );
};

export default StockPage;
