/**
 * Created by Yee on 2019/7/31.
 */
//把sellerDetail 全局注册为 api 的形式来调用
import Vue from 'vue';
import {createAPI} from "cube-ui";
import SellerDetail from './components/sellerDetail/sellerDetail'

createAPI(Vue,SellerDetail);








