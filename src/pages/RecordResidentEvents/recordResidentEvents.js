import {
    HomeOutlined,
    FileOutlined,
    ScheduleOutlined,
    TeamOutlined,
    CalendarOutlined,
    SettingOutlined,
    FileProtectOutlined
} from '@ant-design/icons';
import {
    BackTop, Breadcrumb,
    Spin,
    Table,
    Layout,
    Menu,
    Form,
    Button,
    notification,
    Modal,
    Row,
    Col,
    Input
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import meetingResidentsApi from "../../apis/meetingResidentsApi";
import "./recordResidentEvents.css";
import { PageHeader } from '@ant-design/pro-layout';
import { Link } from "react-router-dom";
import axiosClient from '../../apis/axiosClient';

const { Header, Content, Footer } = Layout;

const RecordResidentEvents = () => {

    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    const history = useHistory();
    const location = useLocation();
    const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
    const [passwordForm] = Form.useForm();

    const columns = [
        // {
        //     title: 'ID',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
        {
            title: 'Tên',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <span className='custom-title'>{text}</span>,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Ngày diễn ra',
            dataIndex: 'date',
            key: 'date',
            width: '15%',
            render: (text) => moment(text).format('DD-MM-YYYY HH:mm:ss'),
        },
    ];

    const handleMenuClick = (key) => {
        switch (key) {
            case 'home':
                history.push('/');
                break;
            case 'maintenance-planning':
                history.push('/maintenance-planning');
                break;
            case 'residence-event':
                history.push('/residence-event');
                break;
            case 'profile':
                history.push('/profile');
                break;
            case 'emergency':
                history.push('/emergency');
                break;
            case 'complaint-management':
                history.push('/complaint-management');
                break;
            case 'residence-rules':
                history.push('/residence-rules');
                break;
            case 'change-password':
                setPasswordModalVisible(true);
                break;
            default:
                break;
        }
    };


    const handleFilter = async (name) => {
        try {
            const res = await meetingResidentsApi.searchMeetingsByTitle(name);
            setCategory(res);
        } catch (error) {
            console.log('search to fetch category list:' + error);
        }
    }

    const handlePasswordChange = async (values) => {
        try {
            const resetPassWord = {
                currentPassword: values.currentPassword,
                newPassword: values.password
            }
            const currentUser = JSON.parse(localStorage.getItem("user"));
            const response = await axiosClient.put("/user/changePassword/" + currentUser.id, resetPassWord);

            if (response.message === "Current password is incorrect") {
                notification.error({
                    message: 'Thông báo',
                    description: 'Mật khẩu hiện tại không đúng!',
                });
                return;
            }

            notification.success({
                message: 'Thông báo',
                description: 'Thay đổi mật khẩu thành công',
            });
            setPasswordModalVisible(false);
            passwordForm.resetFields();
        } catch (error) {
            console.log("password error", error);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                await meetingResidentsApi.getAllMeetings().then((res) => {
                    console.log(res);
                    setCategory(res);
                    setLoading(false);
                });
                ;
            } catch (error) {
                console.log('Failed to fetch category list:' + error);
            }
        })();
    }, [])
    return (
        <div>
            <Spin spinning={loading}>
                <Layout className="layout" style={{ display: 'flex', justifyContent: 'center' }}>
                <Header>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            onClick={({ key }) => handleMenuClick(key)}
                            selectedKeys={[location.pathname.substring(1) || 'home']}
                        >
                            {/* <Menu.Item key="home" icon={<HomeOutlined />}> */}
                            <div className="logo">
                                <Link to="/">
                                    <img
                                        src="https://barehome.com/cdn/shop/files/bare-logo-PNG-type_c86142f5-6b4b-4c7c-8086-018c639cf0a5.png?v=1720802636"
                                        alt="BareHome Logo"
                                        className="logoImage"
                                    />
                                </Link>
                            </div>
                            {/* </Menu.Item> */}
                            <Menu.Item key="maintenance-planning" icon={<FileOutlined />}>
                                Kế hoạch bảo trì
                            </Menu.Item>
                            <Menu.Item key="residence-event" icon={<ScheduleOutlined />}>
                                Sự kiện cư dân
                            </Menu.Item>
                            <Menu.Item key="emergency" icon={<ScheduleOutlined />}>
                                Vấn đề khẩn cấp
                            </Menu.Item>
                            <Menu.Item key="complaint-management" icon={<CalendarOutlined />}>
                                Khiếu nại
                            </Menu.Item>
                            <Menu.Item key="residence-rules" icon={<FileProtectOutlined />}>
                                Nội quy tòa nhà
                            </Menu.Item>
                            <Menu.Item key="profile" icon={<TeamOutlined />}>
                                Trang cá nhân
                            </Menu.Item>
                            <Menu.Item key="change-password" icon={<SettingOutlined />}>
                                Thay đổi mật khẩu
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                            <Breadcrumb.Item>Sự kiện cư dân</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ marginTop: 20 }}>
                        <div id="my__event_container__list">
                            <PageHeader
                                subTitle=""
                                style={{ fontSize: 14 }}
                            >
                                <Row>
                                    <Col span="18">
                                        <Input
                                            placeholder="Tìm kiếm theo tên"
                                            allowClear
                                            onChange={handleFilter}
                                            style={{ width: 300 }}
                                        />
                                    </Col>
                                    <Col span="6">
                                        <Row justify="end">
                                        </Row>
                                    </Col>
                                </Row>

                            </PageHeader>
                        </div>
                    </div>
                        <div className="site-layout-content" >
                            <div style={{ marginTop: 30 }}>
                                <Table columns={columns} pagination={{ position: ['bottomCenter'] }} dataSource={category} />
                            </div>
                        </div>
                    </Content>
                    {/* <Footer style={{ textAlign: 'center' }}>Copyright© 2024 Created by TrWind</Footer> */}
                </Layout>

                <Modal
                    title="Thay đổi mật khẩu"
                    visible={isPasswordModalVisible}
                    onCancel={() => {
                        setPasswordModalVisible(false);
                        passwordForm.resetFields();
                    }}
                    footer={null}
                    className='ant-modal-body2'
                >
                    <Form
                        form={passwordForm}
                        onFinish={handlePasswordChange}
                        style={{ padding: '24px', maxWidth: '500px', margin: 'auto' }}
                    >
                        <Form.Item
                            name="currentPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập mật khẩu cũ!',
                                },
                            ]}
                            hasFeedback
                            style={{ marginBottom: 10 }}
                        >
                            <Input.Password placeholder="Mật khẩu cũ" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập mật khẩu!',
                                },
                                { max: 100, message: 'Tên tối đa 100 ký tự' },
                                { min: 5, message: 'Tên ít nhất 5 ký tự' },
                            ]}
                            hasFeedback
                            style={{ marginBottom: 10 }}
                        >
                            <Input.Password placeholder="Mật khẩu mới" />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            style={{ marginBottom: 10 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập lại mật khẩu!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Hai mật khẩu bạn nhập không khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Nhập lại mật khẩu mới" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Hoàn thành
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div >

    )
}

export default RecordResidentEvents;