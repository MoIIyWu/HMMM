/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:49:44
 *
 * 题库有关的接口：自己写吧~~  已经被张老师删了 ^_^
 */

import { createAPI } from '@/utils/request'

// 基础题库列表
export const getBaseQuestionList = data => createAPI('/questions', 'get', data)

// 学科简单列表
export const getSubjectsList = data => createAPI('/subjects/simple', 'get', data)

// 通过id获取学科详情(目前没用到这个接口)
export const getSubjectsDetailById = id => createAPI(`/subjects/${id}`, 'get')

// 获取二级目录列表
// export const getTwoLevelDirectoryList = id => createAPI(`/directorys/simple?subjectID=${id}`, 'get')
export const getTwoLevelDirectoryList = data => createAPI('/directorys', 'get', data)

// 根据id获取标签详情
// export const getTagsById = id => createAPI(`/tags/simple?subjectID=${id}`, 'get')
export const getTagsById = data => createAPI('/tags/simple', 'get', data)

// 用户简单列表
export const getUsersList = data => createAPI('/users/simple', 'get', data)

// 通过id查看基础题库详情
export const getQuestionDetailById = id => createAPI(`/questions/${id}`, 'get')

// 加入或移出精选
export const setchoiceState = id => createAPI(`/questions/choice/${id}/:choiceState`, 'patch')
