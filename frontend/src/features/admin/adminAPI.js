import {createApi} from "@reduxjs/toolkit/query/react";
import {getBaseQuery} from "../config.js";

export const adminAPI = createApi({
    reducerPath: 'adminApi',
    baseQuery: getBaseQuery(),
    endpoints: (builder) => ({
        // Users
        getUsers: builder.query({
            query: ({skip = 0, limit = 10, query = ''}) => {
                const params = new URLSearchParams();
                params.append('skip', skip);
                params.append('limit', limit);
                if (query.length > 0) {
                    params.append('query', query);
                }
                return `users/get_list?${params.toString()}`;
            },
            providesTags: ['adminUsers']
        }),
        getTeachers: builder.query({
            query: () => 'users/teachers/',
        }),
        editUser: builder.mutation({
            query: ({id, ...body}) => ({
                url: `users/${id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['adminUsers']
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `users/${userId}`,
                method: 'DELETE',
            })
        }),



        // Groups
        getGroups: builder.query({
            query: () => 'groups/',
        }),
        getGroupsUsers: builder.query({
            query: () => 'groups/with_users',
        }),
        createGroup: builder.mutation({
            query: (body) => ({
                url: 'groups/create',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Groups']
        }),
        addUserToGroup: builder.mutation({
            query: ({user_id, group_id}) => ({
                url: `groups/add/${group_id}/${user_id}`,
                method: 'POST'
            })
        }),
        deleteGroup: builder.mutation({
            query: (group_id) => ({
                url: `groups/${group_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Groups']
        }),
        editGroup: builder.mutation({
            query: ({id: group_id, ...body}) => ({
                url: `groups/${group_id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Groups']
        }),

        // Courses
        getCourses: builder.query({
            query: () => '../courses/',
        }),
        createCourse: builder.mutation({
            query: (body) => ({
                url: '../courses/create',
                method: 'POST',
                body
            }),
        }),
        uploadCourseImage: builder.mutation({
            query: ({file}) => ({
                url: `../files/upload`,
                method: 'POST',
                body: file,
            }),
        }),
        actionToCourse: builder.mutation({
            query: ({action, course_id, spec_type, spec_id}) => ({
                url: `../courses/${course_id}/${action}/${spec_type}/${spec_id}`,
                method: 'POST',
            }),
        }),


        // Tasks
        getTaskById: builder.query({
            query: (taskId) => `tasks/${taskId}`,
        }),
        getSolvedTasks: builder.query({
            query: (taskId) => `tasks/${taskId}/solved`,
            providesTags: ['SolvedTasks']
        }),
        createTask: builder.mutation({
            query: (body) => ({
                url: `tasks/`,
                method: 'POST',
                body
            }),
        }),
        deleteTask: builder.mutation({
            query: (taskId) => ({
                url: `tasks/${taskId}`,
                method: 'DELETE',
            }),
        }),
        editTask: builder.mutation({
            query: ({taskId, ...body}) => ({
                url: `tasks/${taskId}`,
                method: 'PUT',
                body
            }),
        }),
        setScore: builder.mutation({
            query: ({taskId, userId, ...body}) => ({
                url: `tasks/${taskId}/${userId}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['SolvedTasks']
        })

    }),
});

export const {
    useGetUsersQuery,
    useGetTeachersQuery,
    useEditUserMutation,
    useDeleteUserMutation,
    useGetGroupsQuery,
    useGetGroupsUsersQuery,
    useCreateGroupMutation,
    useAddUserToGroupMutation,
    useDeleteGroupMutation,
    useEditGroupMutation,
    useGetCoursesQuery,
    useCreateCourseMutation,
    useUploadCourseImageMutation,
    useActionToCourseMutation,
    useGetTaskByIdQuery,
    useGetSolvedTasksQuery,
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useEditTaskMutation,
    useSetScoreMutation
} = adminAPI;
