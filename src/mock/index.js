/*初始化*/

import Mock from 'mockjs'
import home from './bookHome' /*首页*/
import shelf from './bookShelf' /*书架*/
import list from './bookList' /*图书列表*/
import flatList from './bookFlatList' /*图书列表 查询用*/

Mock.mock(/\/book\/home/, 'get', home)/*book/home*/
Mock.mock(/\/book\/shelf/, 'get', shelf)
Mock.mock(/\/book\/list/, 'get', list)
Mock.mock(/\/book\/flatList/, 'get', flatList)
