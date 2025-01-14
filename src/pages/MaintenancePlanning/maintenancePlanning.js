import {
    CalendarOutlined,
    FileOutlined,
    HomeOutlined,
    ScheduleOutlined,
    TeamOutlined,
    SettingOutlined,
    FileProtectOutlined
} from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import {
    BackTop, Breadcrumb,
    Button,
    Col,
    Input,
    Layout,
    Menu,
    Row,
    Space,
    Spin,
    Table,
    Card,
    Modal
} from 'antd';

import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import maintenancePlanningApi from "../../apis/maintenancePlansApi";
import "./maintenancePlanning.css";
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const MaintenancePlanning = () => {

    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const location = useLocation();

    const [selectedMaintenance, setSelectedMaintenance] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (item) => {
        setSelectedMaintenance(item);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'ID',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tên thiết bị',
            dataIndex: 'asset_name',
            key: 'asset_name',
        },
        {
            title: 'Mô tả kế hoạch',
            dataIndex: 'plan_description',
            key: 'plan_description',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'start_date',
            key: 'start_date',
            render: (text) => moment(text).format('DD-MM-YYYY'),
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'end_date',
            key: 'end_date',
            render: (text) => moment(text).format('DD-MM-YYYY'),
        },
    ];

    const handleMenuClick = (key) => {
        switch (key) {
            case 'home':
                history.push('/');
                break;
            case 'maintenance':
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
                history.push('/change-password');
                break;
            default:
                break;
        }
    };

    const handleFilter = async (name) => {
        try {
            const res = await maintenancePlanningApi.searchMaintenancePlans(name);
            setCategory(res.data);
        } catch (error) {
            console.log('search to fetch category list:' + error);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                await maintenancePlanningApi.getAllMaintenancePlans().then((res) => {
                    console.log(res);
                    setCategory(res.data);
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
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>Kế hoạch bảo trì</Breadcrumb.Item>
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
                                            placeholder="Tìm kiếm theo tên thiết bị"
                                            allowClear
                                            onChange={handleFilter}
                                            style={{ width: 300 }}
                                        />
                                    </Col>
                                    <Col span="6">
                                        <Row justify="end">
                                            <Space>
                                            </Space>
                                        </Row>
                                    </Col>
                                </Row>

                            </PageHeader>
                        </div>
                    </div>
                        <div className="site-layout-content" >
                            <div>
                                <div className="maintenance-list">
                                    {category.map((item, index) => (
                                        <Card
                                            key={index}
                                            className="maintenance-card"
                                            hoverable
                                            onClick={() => showModal(item)}
                                        >
                                            <div className="maintenance-card-content">
                                                <div className="maintenance-card-header">
                                                    <h3>{item.asset_name}</h3>
                                                    <span className="maintenance-id">#{index + 1}</span>
                                                </div>
                                                <p className="maintenance-description">{item.plan_description}</p>
                                                <div className="maintenance-dates">
                                                    <div>
                                                        <span className="date-label">Ngày bắt đầu:</span>
                                                        <span className="date-value">{moment(item.start_date).format('DD-MM-YYYY')}</span>
                                                    </div>
                                                    <div>
                                                        <span className="date-label">Ngày kết thúc:</span>
                                                        <span className="date-value">{moment(item.end_date).format('DD-MM-YYYY')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Content>
                    <Modal
                        title="Chi tiết kế hoạch bảo trì"
                        open={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                        width={700}
                        className="maintenance-modal"
                    >
                        {selectedMaintenance && (
                            <div className="maintenance-modal-content">
                                <div className="modal-header">
                                    <h2>{selectedMaintenance.asset_name}</h2>
                                </div>
                                <div className="modal-body">
                                    <div className="modal-section">
                                        <h3>Mô tả kế hoạch</h3>
                                        <p>{selectedMaintenance.plan_description}</p>
                                    </div>
                                    <div className="modal-section">
                                        <h3>Thời gian</h3>
                                        <div className="modal-dates">
                                            <div className="date-item">
                                                <span className="modal-label">Ngày bắt đầu:</span>
                                                <span className="modal-value">{moment(selectedMaintenance.start_date).format('DD-MM-YYYY')}</span>
                                            </div>
                                            <div className="date-item">
                                                <span className="modal-label">Ngày kết thúc:</span>
                                                <span className="modal-value">{moment(selectedMaintenance.end_date).format('DD-MM-YYYY')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Modal>
                    {/* <Footer style={{ textAlign: 'center' }}>Copyright© 2024 Created by TrWind</Footer> */}
                </Layout>
                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div >
    )
}

export default MaintenancePlanning;