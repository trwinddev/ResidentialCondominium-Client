import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import {
  HomeOutlined,
  UserOutlined,
  CalendarOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
  StarOutlined,
  HeartOutlined,
  SafetyOutlined,
  ContactsOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  PhoneOutlined,
  FileOutlined,
  ScheduleOutlined,
  FileProtectOutlined,
  TeamOutlined,
  SettingOutlined
} from '@ant-design/icons';
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
// import {
//     CalendarOutlined,
//     FileOutlined,
//     HomeOutlined,
//     ScheduleOutlined,
//     TeamOutlined,
//     SettingOutlined,
//     FileProtectOutlined
// } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import userApi from "../../apis/userApi";

const Home = () => {
    const history = useHistory();
    const [userData, setUserData] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdown = (value) => {
        setShowDropdown(value);
    }

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
                history.push('/change-password');
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await userApi.getProfile();
                if (response !== "Invalid Token") {
                    setUserData(response.user);
                }
            } catch (error) {
                console.log('Failed to fetch profile user:', error);
            }
        })();
    }, [])

    const handleClick = (link) => {
        history.push(link);
    };

    const handleLogout = () => {
        localStorage.clear();
        history.push("/");
    }

    console.log(userData);

    const featuredServices = [
        {
            icon: <CalendarOutlined />,
            title: "Kế hoạch bảo trì",
            description: "Quản lý và theo dõi các kế hoạch bảo trì chuyên nghiệp, đảm bảo chất lượng sống tối ưu cho từng căn hộ.",
            image: "https://image.luatvietnam.vn/uploaded/1200x675twebp/images/original/2024/01/15/mua-chung-cu-chi-co-hop-dong-mua-ban_1501082719.png",
            route: "/maintenance-planning"
        },
        {
            icon: <InfoCircleOutlined />,
            title: "Sự kiện cư dân",
            description: "Kết nối cộng đồng qua các sự kiện và hoạt động đa dạng, tạo môi trường sống thân thiện và gắn kết.",
            image: "https://anlandlakeview.com/wp-content/uploads/chung-cu-anland-lakeview-3.jpg",
            route: "/residence-event"
        },
        {
            icon: <SafetyOutlined />,
            title: "An Ninh Chung Cư",
            description: "Hệ thống an ninh hiện đại, giám sát 24/7, đảm bảo an toàn tối đa cho cư dân.",
            image: "https://image.plo.vn/Uploaded/2024/rohuosf/2023_10_27/chung-cu-tai-dinh-cu-thang-tam-h8-2574.jpg",
            route: "emergency"
        }
    ];

    const whyChooseUs = [
        {
            icon: <StarOutlined />,
            title: "Chất Lượng Vượt Trội",
            description: "Cam kết mang đến trải nghiệm sống đẳng cấp, với các tiện nghi và dịch vụ hàng đầu."
        },
        {
            icon: <HeartOutlined />,
            title: "Cộng Đồng Thân Thiện",
            description: "Môi trường sống gắn kết, nơi mỗi cư dân đều được chăm sóc và tôn trọng."
        },
        {
            icon: <ContactsOutlined />,
            title: "Hỗ Trợ Chuyên Nghiệp",
            description: "Đội ngũ hỗ trợ nhiệt tình, luôn sẵn sàng giải đáp mọi thắc mắc của cư dân."
        }
    ];

    return (
        <div className={styles.container}>
            {/* Navigation Bar */}
            {userData ? (
                <nav className={styles.navBar}>
                {/* <div className={styles.logo}>
                    <Link to="/">
                        <img
                            src="https://barehome.com/cdn/shop/files/bare-logo-PNG-type_c86142f5-6b4b-4c7c-8086-018c639cf0a5.png?v=1720802636"
                            alt="BareHome Logo"
                            className={styles.logoImage}
                        />
                    </Link>
                </div> */}
                    {/* <div className={styles.logo}>
                        <img
                            src="https://barehome.com/cdn/shop/files/bare-logo-PNG-type_c86142f5-6b4b-4c7c-8086-018c639cf0a5.png?v=1720802636"
                            alt="BareHome Logo"
                            className={styles.logoImage}
                        />
                    </div> */}
                {/* <div className={styles.navMenu}> */}
                    {/* <div
                        className={styles.navItem}
                        onClick={() => handleClick("/home")}
                    >
                        <HomeOutlined /> Trang chủ
                    </div> */}
                        <div>
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
                            {/* <Menu.Item key="profile" icon={<TeamOutlined />}>
                                Trang cá nhân
                            </Menu.Item> */}
                            {/* <Menu.Item key="change-password" icon={<SettingOutlined />}>
                                Thay đổi mật khẩu
                            </Menu.Item> */}
                        </Menu>

                        <div
                            className={styles.project}
                            onMouseEnter={() => handleDropdown(true)}
                            onMouseLeave={() => handleDropdown(false)}
                        >
                            <img
                                src={userData?.image}
                                alt="Ảnh đại diện"
                                className={styles.userAvatar}
                            />
                            {showDropdown && (
                                <div className={styles.dropdown}>
                                    <div onClick={() => handleClick("/profile")}>
                                        <UserOutlined /> Hồ sơ của tôi
                                    </div>
                                    <div onClick={handleLogout}>
                                        <LogoutOutlined /> Đăng xuất
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* </div> */}
                </div>
            </nav>
            )
            :
            (<nav className={styles.navBar}>
                <div className={styles.logo}>
                    <Link to="/">
                        <img
                            src="https://barehome.com/cdn/shop/files/bare-logo-PNG-type_c86142f5-6b4b-4c7c-8086-018c639cf0a5.png?v=1720802636"
                            alt="BareHome Logo"
                            className={styles.logoImage}
                        />
                    </Link>
                </div>
                    {/* <div className={styles.logo}>
                        <img
                            src="https://barehome.com/cdn/shop/files/bare-logo-PNG-type_c86142f5-6b4b-4c7c-8086-018c639cf0a5.png?v=1720802636"
                            alt="BareHome Logo"
                            className={styles.logoImage}
                        />
                    </div> */}
                <div className={styles.navMenu}>
                    {/* <div
                        className={styles.navItem}
                        onClick={() => handleClick("/home")}
                    >
                        <HomeOutlined /> Trang chủ
                    </div> */}
                    {userData ? (
                        <div>
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

                        <div
                            className={styles.project}
                            onMouseEnter={() => handleDropdown(true)}
                            onMouseLeave={() => handleDropdown(false)}
                        >
                            <img
                                src={userData?.image}
                                alt="Ảnh đại diện"
                                className={styles.userAvatar}
                            />
                            {showDropdown && (
                                <div className={styles.dropdown}>
                                    <div onClick={() => handleClick("/profile")}>
                                        <UserOutlined /> Hồ sơ của tôi
                                    </div>
                                    <div onClick={handleLogout}>
                                        <LogoutOutlined /> Đăng xuất
                                    </div>
                                </div>
                            )}
                        </div>
                        </div>

                    ) : (
                        <div
                            className={styles.navItem}
                            onClick={() => handleClick("/login")}
                        >
                            <UserOutlined /> Đăng nhập
                        </div>
                    )}
                </div>
            </nav>)
            }


            {/* Hero Section */}
            <header className={styles.heroSection}>
                <div className={styles.heroOverlay}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.mainTitle}>BareHome</h1>
                        <p className={styles.subTitle}>Nâng Tầm Trải Nghiệm Sống Đô Thị</p>
                        <p className={styles.heroDescription}>
                            Chúng tôi cam kết mang đến không gian sống hiện đại, tiện nghi và đẳng cấp.
                            Mỗi chi tiết đều được chăm chút để mang đến sự thoải mái và sang trọng cho cư dân.
                        </p>
                        <div className={styles.heroCta}>
                            <button
                                className={styles.ctaButton}
                            >
                                Liên Hệ Ngay
                            </button>
                            <button
                                className={styles.ctaButtonOutline}
                            >
                                Tìm Hiểu Thêm
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Featured Services Section */}
            <section className={styles.featuredServicesSection}>
                <div className={styles.sectionHeader}>
                    <h2>Dịch Vụ Nổi Bật</h2>
                    <p>Những giá trị dịch vụ độc đáo chỉ có tại BareHome</p>
                </div>
                <div className={styles.featuredServicesGrid}>
                    {featuredServices.map((service, index) => (
                        <div key={index} className={styles.serviceCard}>
                            <div
                                className={styles.serviceCardImage}
                                style={{backgroundImage: `url(${service.image})`}}
                            />
                            <div className={styles.serviceCardContent}>
                                <div className={styles.serviceIcon}>{service.icon}</div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <button
                                    className={styles.serviceCardButton}
                                    onClick={() => handleClick(`${service.route}`)}
                                >
                                    Xem Chi Tiết
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className={styles.whyChooseUsSection}>
                <div className={styles.sectionHeader}>
                    <h2>Tại Sao Chọn BareHome?</h2>
                    <p>Những giá trị khác biệt làm nên thương hiệu của chúng tôi</p>
                </div>
                <div className={styles.whyChooseUsGrid}>
                    {whyChooseUs.map((reason, index) => (
                        <div key={index} className={styles.whyChooseCard}>
                            <div className={styles.whyChooseIcon}>{reason.icon}</div>
                            <h3>{reason.title}</h3>
                            <p>{reason.description}</p>
                        </div>
                    ))}
                </div>
            </section>


            <footer className={styles.footer}>
                <div className={styles.footerContainer}>
                    <div className={styles.footerColumn}>
                        <div className={styles.footerLogo}>
                            <img
                                src="https://barehome.com/cdn/shop/files/bare-logo-PNG-type_c86142f5-6b4b-4c7c-8086-018c639cf0a5.png?v=1720802636"
                                alt="BareHome Logo"
                            />
                        </div>
                        <p className={styles.footerDescription}>
                            BareHome - Nâng Tầm Trải Nghiệm Sống Đô Thị. Chúng tôi cam kết mang đến không gian sống hiện đại, tiện nghi và đẳng cấp.
                        </p>
                    </div>

                    <div className={styles.footerColumn}>
                        <h4>Dịch Vụ</h4>
                        <ul>
                            <li onClick={() => handleClick("/service/ke-hoach-bao-tri")}>Kế Hoạch Bảo Trì</li>
                            <li onClick={() => handleClick("/service/su-kien-cu-dan")}>Sự Kiện Cư Dân</li>
                            <li onClick={() => handleClick("/service/an-ninh-chung-cu")}>An Ninh Chung Cư</li>
                        </ul>
                    </div>

                    <div className={styles.footerColumn}>
                        <h4>Về BareHome</h4>
                        <ul>
                            <li onClick={() => handleClick("/about")}>Giới Thiệu</li>
                            <li onClick={() => handleClick("/contact")}>Liên Hệ</li>
                            <li onClick={() => handleClick("/privacy")}>Chính Sách Quyền Riêng Tư</li>
                        </ul>
                    </div>

                    <div className={styles.footerColumn}>
                        <h4>Kết Nối</h4>
                        <div className={styles.socialIcons}>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FacebookOutlined /> Facebook</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><InstagramOutlined /> Instagram</a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><LinkedinOutlined /> LinkedIn</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><PhoneOutlined /> 0123456789</a>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p>&copy; 2024 BareHome. Bản quyền đã được bảo hộ.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;