import React from 'react';
import {Dimensions} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import DangXuat from "../../component/dungChung/DangXuat";
import StackQuanLyThongTin from "../StackQuanLyThongTin"
import StackHopDongDangVay from "../managers/StackHopDongDangVay";
import StackHopDongChoDuyet from "../managers/StackHopDongChoDuyet";
import {DoiMatKhauScreen} from "../../screens";

const Drawer = createDrawerNavigator();
const {width, height} = Dimensions.get('window');
export default function DrawerUsers() {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerStyle={{
                backgroundColor: '#efebed',
                width: width / 100 * 80,
            }}
                              hideStatusBar={true}
                              initialRouteName="Thông tin"
            >
                <Drawer.Screen name="Thông tin" component={StackQuanLyThongTin}/>
                <Drawer.Screen name="Hợp đồng đang vay" component={StackHopDongDangVay}/>
                <Drawer.Screen name="Hợp đồng chờ duyệt" component={StackHopDongChoDuyet}/>
                <Drawer.Screen name="Đổi mật khẩu" component={DoiMatKhauScreen}/>
                <Drawer.Screen name="Đăng xuất" component={DangXuat}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

